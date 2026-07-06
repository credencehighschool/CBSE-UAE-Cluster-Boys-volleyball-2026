const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

function setupSheets(){
  const ss=SpreadsheetApp.getActive();
  const sheets={
    Matches:["Match ID","Category","Status","Date","Time","Court","Team A","Score A","Team B","Score B","Set Scores","Winner","Last Updated"],
    Standings:["Category","Team","Played","Won","Lost","Sets","Points","Last Updated"],
    Notices:["Notice ID","Title","Message","Last Updated"],
    Downloads:["Download ID","Icon","Title","URL","Note","Last Updated"],
    Gallery:["Gallery ID","Image URL","Caption","Last Updated"],
    Venue:["Title","Details","Map URL","Last Updated"]
  };
  Object.keys(sheets).forEach(name=>{
    let sh=ss.getSheetByName(name)||ss.insertSheet(name);
    sh.clear(); sh.getRange(1,1,1,sheets[name].length).setValues([sheets[name]]); sh.autoResizeColumns(1,sheets[name].length);
  });
  ss.getSheetByName("Matches").getRange(2,1,3,13).setValues([
    ["M001","Boys U-14","Scheduled","Saturday, 19 September 2026","8:30 AM","Court 1","School A","0","School B","0","To be updated","To be updated",new Date()],
    ["M002","Boys U-17","Scheduled","Saturday, 19 September 2026","9:30 AM","Court 2","School C","0","School D","0","To be updated","To be updated",new Date()],
    ["M003","Boys U-19","Scheduled","Sunday, 20 September 2026","10:30 AM","Court 1","School E","0","School F","0","To be updated","To be updated",new Date()]
  ]);
  ss.getSheetByName("Notices").appendRow(["N001","Welcome","Official championship updates will be published here.",new Date()]);
  ss.getSheetByName("Downloads").getRange(2,1,6,6).setValues([
    ["D001","📩","Invitation","#","PDF link can be added later",new Date()],
    ["D002","📝","Step by Step Guideline to Team Registration Portal","REPLACE_WITH_REGISTRATION_URL","Open registration portal",new Date()],
    ["D003","📘","Instructions and Guidelines of the Competition","#","PDF link can be added later",new Date()],
    ["D004","🌐","FIVB Website","https://www.fivb.com/","Official international volleyball website",new Date()],
    ["D005","🇮🇳","VFI Website","https://volleyballindia.com/","Volleyball Federation of India",new Date()],
    ["D006","📖","FIVB Rules","https://www.fivb.com/volleyball/the-game/rules-of-the-game/","Official rules of the game",new Date()]
  ]);
  ss.getSheetByName("Venue").appendRow(["Championship Venue","Indoor stadiums in Dubai Emirate. Final venue details will be updated soon.","",new Date()]);
}

function doGet(e){
  const a=e.parameter.action;
  if(a==="all") return json({matches:getMatches(),notices:getRows("Notices").map(n=>({id:n[0],title:n[1],message:n[2]})),downloads:getRows("Downloads").map(d=>({id:d[0],icon:d[1],title:d[2],url:d[3],note:d[4]})),venue:getVenue(),gallery:getGallery(),standings:getStandings()});
  if(a==="fixtures") return json({fixtures:getMatches()});
  if(a==="live") return json({live:getMatches().filter(m=>String(m.status).toLowerCase()==="live")});
  if(a==="results") return json({results:getMatches().filter(m=>String(m.status).toLowerCase()==="completed")});
  if(a==="standings") return json({standings:getStandings()});
  if(a==="gallery") return json({gallery:getGallery()});
  return json({message:"Championship API running"});
}

function doPost(e){
  try{
    const d=JSON.parse(e.postData.contents||"{}");
    if(d.password!==ADMIN_PASSWORD) return json({success:false,message:"Invalid admin password."});
    if(d.action==="saveMatch") upsert("Matches",d.matchId,[d.matchId,d.category,d.status,d.date,d.time,d.court,d.teamA,d.scoreA,d.teamB,d.scoreB,d.sets,d.winner,new Date()]);
    if(d.action==="saveStanding") upsertComposite("Standings",[d.category,d.team],[d.category,d.team,d.played,d.won,d.lost,d.sets,d.points,new Date()]);
    if(d.action==="saveNotice") upsert("Notices",d.id,[d.id,d.title,d.message,new Date()]);
    if(d.action==="saveDownload") upsert("Downloads",d.id,[d.id,d.icon,d.title,d.url,d.note,new Date()]);
    if(d.action==="saveGallery") upsert("Gallery",d.id,[d.id,d.url,d.caption,new Date()]);
    if(d.action==="saveVenue"){ const sh=SpreadsheetApp.getActive().getSheetByName("Venue"); sh.getRange(2,1,1,4).setValues([[d.title,d.details,d.mapUrl,new Date()]]); }
    return json({success:true,message:"Saved successfully."});
  }catch(err){return json({success:false,message:String(err)})}
}

function getRows(name){const sh=SpreadsheetApp.getActive().getSheetByName(name); if(!sh || sh.getLastRow()<2)return []; return sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues().filter(r=>r[0]);}
function getMatches(){return getRows("Matches").map(r=>({matchId:r[0],category:r[1],status:r[2],date:r[3],time:r[4],court:r[5],teamA:r[6],scoreA:r[7],teamB:r[8],scoreB:r[9],sets:r[10],winner:r[11]}));}
function getStandings(){return getRows("Standings").map(r=>({category:r[0],team:r[1],played:r[2],won:r[3],lost:r[4],sets:r[5],points:r[6]}));}
function getGallery(){return getRows("Gallery").map(r=>({id:r[0],url:r[1],caption:r[2]}));}
function getVenue(){const r=getRows("Venue")[0]; return r?{title:r[0],details:r[1],mapUrl:r[2]}:null;}
function upsert(sheetName,id,row){const sh=SpreadsheetApp.getActive().getSheetByName(sheetName); const vals=sh.getDataRange().getValues(); let rowNum=-1; for(let i=1;i<vals.length;i++) if(vals[i][0]===id) rowNum=i+1; if(rowNum<0) sh.appendRow(row); else sh.getRange(rowNum,1,1,row.length).setValues([row]);}
function upsertComposite(sheetName,keys,row){const sh=SpreadsheetApp.getActive().getSheetByName(sheetName); const vals=sh.getDataRange().getValues(); let rowNum=-1; for(let i=1;i<vals.length;i++) if(vals[i][0]===keys[0]&&vals[i][1]===keys[1]) rowNum=i+1; if(rowNum<0) sh.appendRow(row); else sh.getRange(rowNum,1,1,row.length).setValues([row]);}
function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
