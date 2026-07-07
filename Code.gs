const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

function setupSheets(){
  const ss=SpreadsheetApp.getActive();

  let sh=ss.getSheetByName("Matches")||ss.insertSheet("Matches");
  sh.clear();
  sh.getRange(1,1,1,17).setValues([[
    "Match ID","Category","Status","Date","Time","Court",
    "Team A","Sets Won A","Team B","Sets Won B",
    "Set 1","Set 2","Set 3","Set 4","Set 5",
    "Current Set","Winner"
  ]]);
  sh.getRange(2,1,3,17).setValues([
    ["M001","Boys U-14","Scheduled","Saturday, 19 September 2026","8:30 AM","Court 1","School A","0","School B","0","","","","","","",""],
    ["M002","Boys U-17","Scheduled","Saturday, 19 September 2026","9:30 AM","Court 2","School C","0","School D","0","","","","","","",""],
    ["M003","Boys U-19","Scheduled","Sunday, 20 September 2026","10:30 AM","Court 1","School E","0","School F","0","","","","","","",""]
  ]);

  let n=ss.getSheetByName("Notices")||ss.insertSheet("Notices");
  n.clear(); n.getRange(1,1,1,4).setValues([["Notice ID","Title","Message","Last Updated"]]);
  n.appendRow(["N001","Welcome","Official championship updates will be published here.",new Date()]);

  let g=ss.getSheetByName("Gallery")||ss.insertSheet("Gallery");
  g.clear(); g.getRange(1,1,1,4).setValues([["Gallery ID","Image URL","Caption","Last Updated"]]);

  let b=ss.getSheetByName("Bracket")||ss.insertSheet("Bracket");
  b.clear(); b.getRange(1,1,1,9).setValues([["Bracket ID","Category","Stage","Team A","Score A","Team B","Score B","Winner","Last Updated"]]);

  let med=ss.getSheetByName("Medals")||ss.insertSheet("Medals");
  med.clear(); med.getRange(1,1,1,5).setValues([["Medal ID","Category","Position","School","Last Updated"]]);

  let aw=ss.getSheetByName("Awards")||ss.insertSheet("Awards");
  aw.clear(); aw.getRange(1,1,1,7).setValues([["Award ID","Icon","Award","Student","School","Category","Last Updated"]]);

  [sh,n,g,b,med,aw].forEach(s=>s.autoResizeColumns(1,s.getLastColumn()));
}

function doGet(e){
  const a=e.parameter.action;
  if(a==="fixtures") return json({fixtures:getMatches().filter(m=>m.status!=="Completed")});
  if(a==="live") return json({live:getMatches().filter(m=>String(m.status).toLowerCase()==="live")});
  if(a==="results") return json({results:getMatches().filter(m=>String(m.status).toLowerCase()==="completed")});
  if(a==="autoStandings") return json({standings:calculateStandings()});
  if(a==="gallery") return json({gallery:getGallery()});
  if(a==="bracket") return json({bracket:getBracket()});
  if(a==="medals") return json({medals:getMedals()});
  if(a==="awards") return json({awards:getAwards()});
  if(a==="all") return json({notices:getNotices(),gallery:getGallery(),matches:getMatches()});
  return json({message:"Phase 4 SPA API running"});
}

function doPost(e){
  try{
    const d=JSON.parse(e.postData.contents||"{}");
    if(d.password!==ADMIN_PASSWORD) return json({success:false,message:"Invalid admin password."});

    if(d.action==="saveMatchPhase1" || d.action==="saveMatch"){ saveMatch(d); return json({success:true,message:"Match saved successfully."}); }
    if(d.action==="saveNotice"){ upsert("Notices",d.id,[d.id,d.title,d.message,new Date()]); return json({success:true,message:"Notice saved successfully."}); }
    if(d.action==="saveGallery"){ upsert("Gallery",d.id,[d.id,d.url,d.caption,new Date()]); return json({success:true,message:"Gallery item saved successfully."}); }
    if(d.action==="saveBracket"){ upsert("Bracket",d.id,[d.id,d.category,d.stage,d.teamA,d.scoreA,d.teamB,d.scoreB,d.winner,new Date()]); return json({success:true,message:"Bracket match saved successfully."}); }
    if(d.action==="saveMedal"){ upsert("Medals",d.id,[d.id,d.category,d.position,d.school,new Date()]); return json({success:true,message:"Medal tally saved successfully."}); }
    if(d.action==="saveAward"){ upsert("Awards",d.id,[d.id,d.icon,d.award,d.student,d.school,d.category,new Date()]); return json({success:true,message:"Award saved successfully."}); }

    return json({success:false,message:"Unknown action."});
  }catch(err){ return json({success:false,message:String(err)}); }
}

function saveMatch(d){
  upsert("Matches",d.matchId,[
    d.matchId,d.category,d.status,d.date,d.time,d.court,
    d.teamA,d.scoreA,d.teamB,d.scoreB,
    d.set1,d.set2,d.set3,d.set4,d.set5,
    d.currentSet,d.winner
  ]);
}

function getMatches(){
  return getRows("Matches").map(r=>({
    matchId:r[0],category:r[1],status:r[2],date:r[3],time:r[4],court:r[5],
    teamA:r[6],scoreA:r[7],teamB:r[8],scoreB:r[9],
    set1:r[10],set2:r[11],set3:r[12],set4:r[13],set5:r[14],
    currentSet:r[15],winner:r[16]
  }));
}

function calculateStandings(){
  const completed=getMatches().filter(m=>String(m.status).toLowerCase()==="completed");
  const table={};

  completed.forEach(m=>{
    const cat=m.category || "General";
    if(!table[cat]) table[cat]={};

    [m.teamA,m.teamB].forEach(team=>{
      if(team && !table[cat][team]) table[cat][team]={category:cat,team,played:0,won:0,lost:0,setsFor:0,setsAgainst:0,points:0};
    });

    if(!m.teamA || !m.teamB) return;

    const a=table[cat][m.teamA];
    const b=table[cat][m.teamB];
    const scoreA=Number(m.scoreA||0);
    const scoreB=Number(m.scoreB||0);

    a.played++; b.played++;
    a.setsFor+=scoreA; a.setsAgainst+=scoreB;
    b.setsFor+=scoreB; b.setsAgainst+=scoreA;

    if(scoreA>scoreB){ a.won++; b.lost++; a.points+=3; }
    else if(scoreB>scoreA){ b.won++; a.lost++; b.points+=3; }
  });

  let out=[];
  Object.keys(table).forEach(cat=>{
    out=out.concat(Object.values(table[cat]).sort((x,y)=>
      y.points-x.points || y.won-x.won || (y.setsFor-y.setsAgainst)-(x.setsFor-x.setsAgainst)
    ));
  });
  return out;
}

function getNotices(){ return getRows("Notices").map(r=>({id:r[0],title:r[1],message:r[2]})); }
function getGallery(){ return getRows("Gallery").map(r=>({id:r[0],url:r[1],caption:r[2]})); }
function getBracket(){ return getRows("Bracket").map(r=>({id:r[0],category:r[1],stage:r[2],teamA:r[3],scoreA:r[4],teamB:r[5],scoreB:r[6],winner:r[7]})); }
function getMedals(){ return getRows("Medals").map(r=>({id:r[0],category:r[1],position:r[2],school:r[3]})); }
function getAwards(){ return getRows("Awards").map(r=>({id:r[0],icon:r[1],award:r[2],student:r[3],school:r[4],category:r[5]})); }

function getRows(name){
  const sh=SpreadsheetApp.getActive().getSheetByName(name);
  if(!sh || sh.getLastRow()<2) return [];
  return sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues().filter(r=>r[0]);
}

function upsert(sheetName,id,row){
  const sh=SpreadsheetApp.getActive().getSheetByName(sheetName);
  const vals=sh.getDataRange().getValues();
  let rowNum=-1;
  for(let i=1;i<vals.length;i++){
    if(vals[i][0]===id){ rowNum=i+1; break; }
  }
  if(rowNum<0) sh.appendRow(row);
  else sh.getRange(rowNum,1,1,row.length).setValues([row]);
}

function json(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
