const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

function setupSheets(){
  makeSheet("Teams",["Category","Team","Emirate","Last Updated"]);
  makeSheet("Matches",["Match ID","Category","Round","Status","Date","Time","Court","Team A","Sets Won A","Team B","Sets Won B","Set 1","Set 2","Set 3","Set 4","Set 5","Current Set","Winner","Timer Start"]);
  makeSheet("Notices",["Notice ID","Title","Message","Last Updated"]);
  makeSheet("Gallery",["Gallery ID","Image URL","Caption","Last Updated"]);
  SpreadsheetApp.getActive().getSheetByName("Notices").appendRow(["N001","Welcome","Official championship updates will be published here.",new Date()]);
}
function makeSheet(n,h){let ss=SpreadsheetApp.getActive(),sh=ss.getSheetByName(n)||ss.insertSheet(n);sh.clear();sh.getRange(1,1,1,h.length).setValues([h]);sh.autoResizeColumns(1,h.length)}
function doGet(e){let a=e.parameter.action;if(a=="all")return json({notices:getNotices()});if(a=="fixtures")return json({fixtures:getMatches().filter(m=>String(m.status).toLowerCase()!="completed")});if(a=="live")return json({live:getMatches().filter(m=>String(m.status).toLowerCase()=="live")});if(a=="autoStandings")return json({standings:standings()});if(a=="gallery")return json({gallery:getGallery()});return json({message:"API running"})}
function doPost(e){try{let d=JSON.parse(e.postData.contents||"{}");if(d.password!==ADMIN_PASSWORD)return json({success:false,message:"Invalid admin password."});if(d.action=="saveTeamsBulk"){
  const sh=SpreadsheetApp.getActive().getSheetByName("Teams");
  sh.clear();
  sh.getRange(1,1,1,4).setValues([["Category","Team","Emirate","Last Updated"]]);
  (d.teams||[]).forEach(t=>sh.appendRow([t.category,t.school,t.emirate,new Date()]));
  sh.autoResizeColumns(1,4);
  return json({success:true,message:"Teams saved successfully."});
}
if(d.action=="saveTeam"){upsertComposite("Teams",[d.category,d.team],[d.category,d.team,d.emirate||"",new Date()]);return json({success:true,message:"Team saved."})}if(d.action=="generateFixtures"){generateFixtures(d.category);return json({success:true,message:"League fixtures generated."})}if(d.action=="saveMatch"){upsert("Matches",d.matchId,[d.matchId,d.category,d.round||"",d.status,d.date,d.time,d.court,d.teamA,d.scoreA,d.teamB,d.scoreB,d.set1,d.set2,d.set3,d.set4,d.set5,d.currentSet,d.winner,d.timerStart]);return json({success:true,message:"Match saved."})}if(d.action=="saveNotice"){upsert("Notices",d.id,[d.id,d.title,d.message,new Date()]);return json({success:true,message:"News saved."})}if(d.action=="saveGallery"){upsert("Gallery",d.id,[d.id,d.url,d.caption,new Date()]);return json({success:true,message:"Gallery saved."})}return json({success:false,message:"Unknown action."})}catch(err){return json({success:false,message:String(err)})}}
function generateFixtures(c){let teams=rows("Teams").filter(r=>r[0]==c).map(r=>r[1]).filter(String),sh=SpreadsheetApp.getActive().getSheetByName("Matches"),count=sh.getLastRow();for(let i=0;i<teams.length;i++)for(let j=i+1;j<teams.length;j++){count++;sh.appendRow([c.replace(/[^A-Za-z0-9]/g,"")+"-L"+count,c,"Scheduled","","","Court 1",teams[i],"0",teams[j],"0","","","","","","","",""])}}
function getMatches(){return rows("Matches").map(r=>({matchId:r[0],category:r[1],round:r[2],status:r[3],date:r[4],time:r[5],court:r[6],teamA:r[7],scoreA:r[8],teamB:r[9],scoreB:r[10],set1:r[11],set2:r[12],set3:r[13],set4:r[14],set5:r[15],currentSet:r[16],winner:r[17],timerStart:r[18]}))}
function standings(){let done=getMatches().filter(m=>String(m.status).toLowerCase()=="completed"),tab={};done.forEach(m=>{let c=m.category||"General";tab[c]=tab[c]||{};[m.teamA,m.teamB].forEach(t=>{if(t&&!tab[c][t])tab[c][t]={category:c,team:t,played:0,won:0,lost:0,setsFor:0,setsAgainst:0,points:0}});if(!m.teamA||!m.teamB)return;let a=tab[c][m.teamA],b=tab[c][m.teamB],sa=Number(m.scoreA||0),sb=Number(m.scoreB||0);a.played++;b.played++;a.setsFor+=sa;a.setsAgainst+=sb;b.setsFor+=sb;b.setsAgainst+=sa;if(sa>sb){a.won++;b.lost++;a.points+=3}else if(sb>sa){b.won++;a.lost++;b.points+=3}});let out=[];Object.keys(tab).forEach(c=>out=out.concat(Object.values(tab[c]).sort((x,y)=>y.points-x.points||y.won-x.won||(y.setsFor-y.setsAgainst)-(x.setsFor-x.setsAgainst))));return out}
function getNotices(){return rows("Notices").map(r=>({id:r[0],title:r[1],message:r[2]}))}function getGallery(){return rows("Gallery").map(r=>({id:r[0],url:r[1],caption:r[2]}))}
function rows(n){let sh=SpreadsheetApp.getActive().getSheetByName(n);if(!sh||sh.getLastRow()<2)return[];return sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues().filter(r=>r[0])}
function upsert(n,id,row){let sh=SpreadsheetApp.getActive().getSheetByName(n),v=sh.getDataRange().getValues(),rn=-1;for(let i=1;i<v.length;i++)if(v[i][0]===id)rn=i+1;if(rn<0)sh.appendRow(row);else sh.getRange(rn,1,1,row.length).setValues([row])}
function upsertComposite(n,k,row){let sh=SpreadsheetApp.getActive().getSheetByName(n),v=sh.getDataRange().getValues(),rn=-1;for(let i=1;i<v.length;i++)if(v[i][0]===k[0]&&v[i][1]===k[1])rn=i+1;if(rn<0)sh.appendRow(row);else sh.getRange(rn,1,1,row.length).setValues([row])}
function json(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
