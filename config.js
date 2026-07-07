const API=SITE_CONFIG.apiUrl;
function toggleMenu(){nav.classList.toggle("open")}
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById(id).classList.add("active");scrollTo(0,0);nav.classList.remove("open");if(id==="fixtures")loadFixtures();if(id==="live")loadLive();if(id==="standings")loadStandings();if(id==="gallery")loadGallery()}
function isPlaceholderUrl(u){return !u || String(u).includes("PASTE_") || String(u).trim()==="#"}
function pdfButton(id,url){const a=document.getElementById(id);a.href=isPlaceholderUrl(url)?"#":url;if(isPlaceholderUrl(url)){a.textContent="PDF will be uploaded soon";a.classList.add("pending");a.removeAttribute("target");}else{a.textContent="Click here to download fixture";a.classList.remove("pending");a.target="_blank";}}
function init(){subtitle.textContent=SITE_CONFIG.eventTitle+" "+SITE_CONFIG.eventYear;hostedBy.textContent=SITE_CONFIG.hostedBy;categories.textContent=SITE_CONFIG.categories;dates.textContent=SITE_CONFIG.championshipDates;registerBtn.href=SITE_CONFIG.registrationUrl;pdfButton("fix14",SITE_CONFIG.fixtures.u14);pdfButton("fix17",SITE_CONFIG.fixtures.u17);pdfButton("fix19",SITE_CONFIG.fixtures.u19);contactName.textContent=SITE_CONFIG.contact.name;contactRole.textContent=SITE_CONFIG.contact.role;contactEmail.textContent=SITE_CONFIG.contact.email;contactEmail.href="mailto:"+SITE_CONFIG.contact.email;contactMobile.textContent=SITE_CONFIG.contact.mobile;contactMobile.href="tel:"+SITE_CONFIG.contact.phoneLink;downloads.innerHTML=SITE_CONFIG.downloads.map(d=>{const pending=isPlaceholderUrl(d.url);return `<div class="card"><h2>${d.icon}</h2><h3>${d.title}</h3><br><a class="btn ${pending?'pending':''}" href="${pending?'#':d.url}" ${pending?'':'target="_blank"'}>${pending?'PDF will be uploaded soon':'Open / Download'}</a>${pending?'':`<br><img style="width:90px;margin-top:12px" src="${qr(d.url)}">`}</div>`}).join("");venue.innerHTML=`<h2>${SITE_CONFIG.venue.title}</h2><p class="muted">${SITE_CONFIG.venue.details}</p><br><a class="btn ${isPlaceholderUrl(SITE_CONFIG.venue.mapUrl)?'pending':''}" href="${isPlaceholderUrl(SITE_CONFIG.venue.mapUrl)?'#':SITE_CONFIG.venue.mapUrl}" target="_blank">${isPlaceholderUrl(SITE_CONFIG.venue.mapUrl)?'Location will be updated soon':'Open Location'}</a>${isPlaceholderUrl(SITE_CONFIG.venue.mapUrl)?'':`<br><img style="width:90px;margin-top:12px" src="${qr(SITE_CONFIG.venue.mapUrl)}">`}`;countdown();loadNews()}
function qr(u){return"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+encodeURIComponent(u||"#")}
function countdown(){let t=new Date(SITE_CONFIG.championshipStart).getTime();setInterval(()=>{let d=t-Date.now();if(d<0)return;days.textContent=String(Math.floor(d/86400000)).padStart(2,"0");hours.textContent=String(Math.floor(d%86400000/3600000)).padStart(2,"0");minutes.textContent=String(Math.floor(d%3600000/60000)).padStart(2,"0");seconds.textContent=String(Math.floor(d%60000/1000)).padStart(2,"0")},1000)}
async function get(a){let r=await fetch(API+"?action="+a+"&cache="+Date.now());return await r.json()}
async function loadNews(){try{let d=await get("all");tickerText.innerHTML=(d.notices||[]).map(n=>`📢 <strong>${n.title}</strong>: ${n.message}`).join(" | ")||`🏆 Acceptance: <strong>${SITE_CONFIG.acceptanceDeadline}</strong> | Entry: <strong>${SITE_CONFIG.entryDeadline}</strong> | Championship: <strong>${SITE_CONFIG.championshipDates}</strong>`}catch(e){tickerText.innerHTML=`🏆 Acceptance: <strong>${SITE_CONFIG.acceptanceDeadline}</strong> | Entry: <strong>${SITE_CONFIG.entryDeadline}</strong>`}}
function renderMatch(m){let status=(m.status||"Scheduled").toLowerCase();let live=status==="live";let completed=status==="completed";let scheduled=status==="scheduled";let sets=[m.set1,m.set2,m.set3,m.set4,m.set5].filter(Boolean).map((s,i)=>`<span class="set">Set ${i+1}: ${s}</span>`).join("");return`<article class="match ${live?'live':completed?'completed':'scheduled'}"><div class="mh"><span class="pill">${m.category||""}</span><span class="pill ${live?'live':completed?'completed':'scheduled'}">${live?'● ':''}${m.status||"Scheduled"}</span></div><p class="muted">${m.round?m.round+" · ":""}${m.date||""} · ${m.time||""} · ${m.court||""}</p><div class="score"><div class="team"><h3>${m.teamA||""}</h3><b>${m.scoreA||"0"}</b></div><div class="vs">VS</div><div class="team"><h3>${m.teamB||""}</h3><b>${m.scoreB||"0"}</b></div></div>${live&&m.timerStart?`<p class="timer" data-start="${m.timerStart}">Timer</p>`:""}<div class="sets">${sets||'<span class="set">Set scores to be updated</span>'}</div><p class="timer">${m.currentSet?'Current Set: '+m.currentSet:''}</p><p class="timer">Winner: ${m.winner||'To be updated'}</p></article>`}
function groupMatches(rows){const order=["Live","Scheduled","Completed"];const groups={Live:[],Scheduled:[],Completed:[]};(rows||[]).forEach(m=>{let s=String(m.status||"Scheduled").toLowerCase();if(s==="live")groups.Live.push(m);else if(s==="completed")groups.Completed.push(m);else groups.Scheduled.push(m);});return order.map(k=>groups[k].length?`<div class="matchGroup"><h3>${k==="Live"?'🔴 Live Scores':k==="Scheduled"?'📅 Upcoming / Scheduled Matches':'✅ Completed Matches'}</h3><div class="grid2">${groups[k].map(renderMatch).join("")}</div></div>`:"").join("")}
async function loadFixtures(){try{let d=await get("fixtures");fixtureGrid.innerHTML=(d.fixtures||[]).map(renderMatch).join("")||'<div class="card">Fixtures will appear here.</div>';timers()}catch(e){fixtureGrid.innerHTML='<div class="card">Unable to load fixtures.</div>'}}
async function loadLive(){try{let d=await get("matches");liveGrid.innerHTML=groupMatches(d.matches||[])||'<div class="card">No matches updated yet.</div>';timers()}catch(e){liveGrid.innerHTML='<div class="card">Unable to load live scores and match status.</div>'}}
async function loadStandings(){try{let d=await get("autoStandings"),rows=d.standings||[],g={};rows.forEach(r=>(g[r.category]=g[r.category]||[]).push(r));standingsBox.innerHTML=Object.keys(g).map(c=>`<h2>${c}</h2><table class="table"><tr><th>Rank</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>Sets</th><th>Pts</th><th>Status</th></tr>${g[c].map((s,i)=>`<tr><td>${i+1}</td><td>${s.team}</td><td>${s.played}</td><td>${s.won}</td><td>${s.lost}</td><td>${s.setsFor}-${s.setsAgainst}</td><td>${s.points}</td><td>${i<2?'<span class="qual">Qualification Zone</span>':'-'}</td></tr>`).join("")}</table>`).join("")||'<div class="card">Standings will appear after completed matches.</div>'}catch(e){standingsBox.innerHTML='<div class="card">Unable to load standings.</div>'}}
async function loadGallery(){try{let d=await get("gallery");galleryGrid.innerHTML=(d.gallery||[]).map(g=>`<div class="galleryBox">${g.url?`<img src="${g.url}">`:"📸"}<p class="muted">${g.caption||""}</p></div>`).join("")||'<div class="galleryBox">Gallery will be updated soon.</div>'}catch(e){galleryGrid.innerHTML='<div class="galleryBox">Unable to load gallery.</div>'}}
function timers(){document.querySelectorAll("[data-start]").forEach(el=>{let st=new Date(el.dataset.start).getTime();if(!isNaN(st))el.textContent="Match Timer: "+Math.max(0,Math.floor((Date.now()-st)/60000))+" min"})}
function loginAdmin(){if(loginUser.value.trim()!==SITE_CONFIG.adminUsername){loginMsg.textContent="Invalid username";return}password.value=loginPass.value.trim();loginBox.style.display="none";dashboard.style.display="block";sessionStorage.setItem("logged","yes");sessionStorage.setItem("pass",password.value)}
function showTab(id,e){document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));document.getElementById(id).classList.add("active");e.target.classList.add("active")}
function v(id){return document.getElementById(id).value.trim()}
async function save(action){let data={action,password:v("password")};if(action==="saveTeam")Object.assign(data,{category:v("teamCategory"),team:v("teamName")});if(action==="generateFixtures")Object.assign(data,{category:v("teamCategory")});if(action==="saveMatch")Object.assign(data,{matchId:v("matchId"),category:v("category"),status:v("status"),timerStart:v("timerStart"),currentSet:v("currentSet"),date:v("date"),time:v("time"),court:v("court"),teamA:v("teamA"),teamB:v("teamB"),scoreA:v("scoreA"),scoreB:v("scoreB"),set1:v("set1"),set2:v("set2"),set3:v("set3"),set4:v("set4"),set5:v("set5"),winner:v("winner")});if(action==="saveNotice")Object.assign(data,{id:v("newsId"),title:v("newsTitle"),message:v("newsMessage")});if(action==="saveGallery")Object.assign(data,{id:v("galleryId"),url:v("galleryUrl"),caption:v("galleryCaption")});msg.textContent="Saving...";try{let r=await fetch(API,{method:"POST",body:JSON.stringify(data)}),res=await r.json();msg.textContent=res.message||"Saved"}catch(e){msg.textContent="Unable to save. Check Apps Script deployment."}}

async function saveTeamsList(){
  const teams=[];
  document.querySelectorAll(".team-row").forEach(row=>{
    const category=row.dataset.category;
    const school=row.querySelector(".team-school").value.trim();
    const emirate=row.querySelector(".team-emirate").value.trim();
    if(school){teams.push({category,school,emirate});}
  });
  if(teams.length===0){msg.textContent="Please enter at least one school name.";return;}
  msg.textContent="Saving teams...";
  try{
    let r=await fetch(API,{method:"POST",body:JSON.stringify({action:"saveTeamsBulk",password:v("password"),teams})});
    let res=await r.json();
    msg.textContent=res.message||"Teams saved.";
  }catch(e){msg.textContent="Unable to save teams. Check Apps Script deployment.";}
}


function calculateSetsWon(setValues){
  let a=0,b=0;
  setValues.forEach(s=>{
    if(!s) return;
    const parts=s.replace(/\s/g,"").split("-");
    if(parts.length!==2) return;
    const x=Number(parts[0]), y=Number(parts[1]);
    if(isNaN(x)||isNaN(y)) return;
    if(x>y) a++;
    else if(y>x) b++;
  });
  return {a,b};
}

async function saveCourtMatch(courtNo){
  const p="c"+courtNo;
  const setValues=[
    document.getElementById(p+"Set1").value.trim(),
    document.getElementById(p+"Set2").value.trim(),
    document.getElementById(p+"Set3").value.trim(),
    document.getElementById(p+"Set4").value.trim(),
    document.getElementById(p+"Set5").value.trim()
  ];

  const setsWon=calculateSetsWon(setValues);

  const data={
    action:"saveMatch",
    password:v("password"),
    matchId:document.getElementById(p+"MatchId").value.trim(),
    category:document.getElementById(p+"Category").value.trim(),
    round:document.getElementById(p+"Round").value.trim(),
    status:document.getElementById(p+"Status").value.trim(),
    date:document.getElementById(p+"Date").value.trim(),
    time:document.getElementById(p+"Time").value.trim(),
    court:"Court "+courtNo,
    teamA:document.getElementById(p+"TeamA").value.trim(),
    teamB:document.getElementById(p+"TeamB").value.trim(),
    scoreA:String(setsWon.a),
    scoreB:String(setsWon.b),
    set1:setValues[0],
    set2:setValues[1],
    set3:setValues[2],
    set4:setValues[3],
    set5:setValues[4],
    currentSet:document.getElementById(p+"CurrentSet").value.trim(),
    winner:document.getElementById(p+"Winner").value.trim(),
    timerStart:""
  };

  if(!data.matchId){
    msg.textContent="Please enter Match ID for Court "+courtNo+".";
    return;
  }

  msg.textContent="Saving Court "+courtNo+" match...";

  try{
    let r=await fetch(API,{method:"POST",body:JSON.stringify(data)});
    let res=await r.json();
    msg.textContent=res.message||"Court "+courtNo+" match saved.";
  }catch(e){
    msg.textContent="Unable to save Court "+courtNo+" match. Check Apps Script deployment.";
  }
}

window.onload=()=>{init();if(sessionStorage.getItem("logged")==="yes"){password.value=sessionStorage.getItem("pass")||"";loginBox.style.display="none";dashboard.style.display="block"}setInterval(loadLive,10000);setInterval(loadNews,30000)}
