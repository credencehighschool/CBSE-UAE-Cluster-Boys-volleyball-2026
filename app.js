const API = SITE_CONFIG.apiUrl;

function toggleMenu(){
  document.getElementById("mainNav").classList.toggle("open");
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
  document.getElementById("mainNav").classList.remove("open");
  if(id==="live") loadLive();
  if(id==="standings") loadStandings();
  if(id==="results") loadResults();
  if(id==="bracket") loadBracket();
  if(id==="medals") loadMedals();
  if(id==="awards") loadAwards();
  if(id==="gallery") loadGallery();
}

function initConfig(){
  document.getElementById("brandSubtitle").textContent = SITE_CONFIG.eventTitle + " " + SITE_CONFIG.eventYear;
  hostedBy.textContent = SITE_CONFIG.hostedBy;
  categoriesText.textContent = SITE_CONFIG.categoriesText;
  countdownTitle.textContent = SITE_CONFIG.championshipDatesText;
  registrationBtn.href = SITE_CONFIG.registrationUrl;

  u14Fixture.href = SITE_CONFIG.fixtures.u14;
  u17Fixture.href = SITE_CONFIG.fixtures.u17;
  u19Fixture.href = SITE_CONFIG.fixtures.u19;

  downloadsGrid.innerHTML = SITE_CONFIG.downloads.map(d=>`
    <a class="card tile" href="${d.url}" target="_blank">
      <span>${d.icon}</span><strong>${d.title}</strong><small>${d.note}</small>
    </a>`).join("");

  venueBox.innerHTML = `<h2>${SITE_CONFIG.venue.title}</h2><p class="muted">${SITE_CONFIG.venue.details}</p><br><a class="btn" href="${SITE_CONFIG.venue.mapUrl}" target="_blank">Open Location Map</a>`;

  contactName.textContent = SITE_CONFIG.contact.name;
  contactRole.textContent = SITE_CONFIG.contact.role;
  contactEmail.textContent = SITE_CONFIG.contact.email;
  contactEmail.href = "mailto:" + SITE_CONFIG.contact.email;
  contactMobile.textContent = SITE_CONFIG.contact.mobile;
  contactMobile.href = "tel:" + SITE_CONFIG.contact.mobileLink;

  loadNotices();
}

function startCountdown(){
  const targetDate = new Date(SITE_CONFIG.championshipStart).getTime();
  function tick(){
    const d = targetDate - Date.now();
    if(d <= 0) return;
    days.textContent = String(Math.floor(d/(1000*60*60*24))).padStart(2,"0");
    hours.textContent = String(Math.floor((d%(1000*60*60*24))/(1000*60*60))).padStart(2,"0");
    minutes.textContent = String(Math.floor((d%(1000*60*60))/(1000*60))).padStart(2,"0");
    seconds.textContent = String(Math.floor((d%(1000*60))/1000)).padStart(2,"0");
  }
  tick();
  setInterval(tick,1000);
}

async function fetchData(action){
  const r = await fetch(API + "?action=" + action + "&cache=" + Date.now());
  return await r.json();
}

async function loadNotices(){
  try{
    const data = await fetchData("all");
    ticker.innerHTML = (data.notices || []).map(n=>`📢 <strong>${n.title}</strong>: ${n.message}`).join(" &nbsp; | &nbsp; ") || `🏆 Important Deadlines | Acceptance Form: <strong>${SITE_CONFIG.acceptanceDeadline}</strong> | Entry Form: <strong>${SITE_CONFIG.entryDeadline}</strong> | Championship: <strong>${SITE_CONFIG.championshipDatesText}</strong>`;
  }catch(e){
    ticker.innerHTML = `🏆 Important Deadlines | Acceptance Form: <strong>${SITE_CONFIG.acceptanceDeadline}</strong> | Entry Form: <strong>${SITE_CONFIG.entryDeadline}</strong> | Championship: <strong>${SITE_CONFIG.championshipDatesText}</strong>`;
  }
}

function renderMatch(m){
  const isLive = String(m.status || "").toLowerCase() === "live";
  const sets = [m.set1,m.set2,m.set3,m.set4,m.set5].filter(Boolean).map((s,i)=>`<span class="set-pill">Set ${i+1}: ${s}</span>`).join("");
  return `<article class="match-card-pro ${isLive?'live':''}">
    <div class="match-head-pro">
      <span class="match-label">${m.category || ''}</span>
      <span class="match-status ${isLive?'live':''}">${isLive?'<span class="live-dot"></span>':''}${m.status || 'Scheduled'}</span>
    </div>
    <div class="match-meta-pro">${m.date || ''} · ${m.time || ''} · ${m.court || ''}</div>
    <div class="score-board">
      <div class="score-team"><h3>${m.teamA || ''}</h3><strong>${m.scoreA || '0'}</strong></div>
      <div class="score-vs">VS</div>
      <div class="score-team"><h3>${m.teamB || ''}</h3><strong>${m.scoreB || '0'}</strong></div>
    </div>
    <div class="set-strip">${sets || '<span class="set-pill">Set scores to be updated</span>'}</div>
    ${m.currentSet ? `<div class="current-set">Current Set: ${m.currentSet}</div>` : ''}
    <div class="match-winner">Winner: ${m.winner || 'To be updated'}</div>
  </article>`;
}

async function loadLive(){
  try{
    const data = await fetchData("live");
    liveGrid.innerHTML = (data.live || []).map(renderMatch).join("") || '<div class="card">No live matches now.</div>';
  }catch(e){ liveGrid.innerHTML = '<div class="card">Unable to load live scores.</div>'; }
}

async function loadResults(){
  try{
    const data = await fetchData("results");
    resultsGrid.innerHTML = (data.results || []).map(renderMatch).join("") || '<div class="card">Results will be published soon.</div>';
  }catch(e){ resultsGrid.innerHTML = '<div class="card">Unable to load results.</div>'; }
}

async function loadStandings(){
  try{
    const data = await fetchData("autoStandings");
    const rows = data.standings || [];
    const groups = {};
    rows.forEach(r=>{ if(!groups[r.category]) groups[r.category]=[]; groups[r.category].push(r); });
    standingsBox.innerHTML = Object.keys(groups).map(cat=>`
      <h2 style="margin:25px 0 12px">${cat}</h2>
      <table class="table">
      <tr><th>Rank</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>Sets</th><th>Points</th><th>Status</th></tr>
      ${groups[cat].map((s,i)=>`<tr><td>${i+1}</td><td>${s.team}</td><td>${s.played}</td><td>${s.won}</td><td>${s.lost}</td><td>${s.setsFor}-${s.setsAgainst}</td><td>${s.points}</td><td>${i<2?'<span class="qualify">Qualification Zone</span>':'-'}</td></tr>`).join("")}
      </table>`).join("") || '<div class="card">Standings will appear after completed matches.</div>';
  }catch(e){ standingsBox.innerHTML = '<div class="card">Unable to load standings.</div>'; }
}

function bracketCard(m){
  return `<div class="bracket-match"><small>${m.category||''} · ${m.stage||''}</small>
  <div class="bracket-team"><span>${m.teamA||'TBD'}</span><b class="bracket-score">${m.scoreA||'0'}</b></div>
  <div class="bracket-team"><span>${m.teamB||'TBD'}</span><b class="bracket-score">${m.scoreB||'0'}</b></div>
  <p class="muted">Winner: <b>${m.winner||'To be updated'}</b></p></div>`;
}

async function loadBracket(){
  try{
    const data = await fetchData("bracket");
    const rows = data.bracket || [];
    const semi = rows.filter(x=>String(x.stage).toLowerCase().includes("semi"));
    const final = rows.filter(x=>String(x.stage).toLowerCase()==="final");
    const third = rows.filter(x=>String(x.stage).toLowerCase().includes("third"));
    bracketGrid.innerHTML = `
      <div class="bracket-column"><h3>Semi-finals</h3>${semi.map(bracketCard).join("") || '<div class="card">Semi-finals TBD</div>'}</div>
      <div class="bracket-column"><h3>Final</h3>${final.map(bracketCard).join("") || '<div class="card">Final TBD</div>'}</div>
      <div class="bracket-column"><h3>Third Place</h3>${third.map(bracketCard).join("") || '<div class="card">Third Place TBD</div>'}</div>`;
  }catch(e){ bracketGrid.innerHTML = '<div class="card">Unable to load bracket.</div>'; }
}

async function loadMedals(){
  try{
    const data = await fetchData("medals");
    medalGrid.innerHTML = (data.medals || []).map(m=>{
      const icon = m.position === "Champion" ? "🥇" : (m.position === "Runner-up" ? "🥈" : "🥉");
      return `<div class="medal-card"><span class="medal">${icon}</span><h3>${m.position||''}</h3><p class="muted"><b>${m.category||''}</b></p><p class="muted">${m.school||'To be updated'}</p></div>`;
    }).join("") || '<div class="card">Medal tally will be updated after finals.</div>';
  }catch(e){ medalGrid.innerHTML = '<div class="card">Unable to load medal tally.</div>'; }
}

async function loadAwards(){
  try{
    const data = await fetchData("awards");
    awardsGrid.innerHTML = (data.awards || []).map(a=>`
      <div class="award-card"><span>${a.icon||'⭐'}</span><h3>${a.award||''}</h3><p class="muted"><b>${a.student||'To be updated'}</b></p><p class="muted">${a.school||''}</p><p class="muted">${a.category||''}</p></div>
    `).join("") || '<div class="card">Awards will be updated later.</div>';
  }catch(e){ awardsGrid.innerHTML = '<div class="card">Unable to load awards.</div>'; }
}

async function loadGallery(){
  try{
    const data = await fetchData("gallery");
    galleryGrid.innerHTML = (data.gallery || []).map(g=>`
      <div class="gallery-img">${g.url ? `<img src="${g.url}">` : '📸'}<p class="muted">${g.caption||''}</p></div>
    `).join("") || '<div class="gallery-img">Gallery will be updated soon.</div>';
  }catch(e){ galleryGrid.innerHTML = '<div class="gallery-img">Unable to load gallery.</div>'; }
}

function login(){
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();
  if(user !== SITE_CONFIG.adminUsername){ loginMsg.textContent = "Invalid username."; return; }
  if(!pass){ loginMsg.textContent = "Please enter password."; return; }
  password.value = pass;
  sessionStorage.setItem("cbseAdminLoggedIn","yes");
  sessionStorage.setItem("cbseAdminPass",pass);
  loginScreen.style.display = "none";
  dashboard.style.display = "block";
}

function logout(){
  sessionStorage.removeItem("cbseAdminLoggedIn");
  sessionStorage.removeItem("cbseAdminPass");
  location.reload();
}

function showAdminPanel(id,event){
  document.querySelectorAll(".admin-panel").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

function v(id){ return document.getElementById(id).value.trim(); }

async function save(action){
  let data = { action, password:v("password") };
  if(action==="saveMatchPhase1") Object.assign(data,{matchId:v("matchId"),category:v("category"),status:v("status"),currentSet:v("currentSet"),date:v("date"),time:v("time"),court:v("court"),teamA:v("teamA"),teamB:v("teamB"),scoreA:v("scoreA"),scoreB:v("scoreB"),set1:v("set1"),set2:v("set2"),set3:v("set3"),set4:v("set4"),set5:v("set5"),winner:v("winner")});
  if(action==="saveNotice") Object.assign(data,{id:v("nId"),title:v("nTitle"),message:v("nMessage")});
  if(action==="saveGallery") Object.assign(data,{id:v("gId"),url:v("gUrl"),caption:v("gCaption")});
  if(action==="saveBracket") Object.assign(data,{id:v("bId"),category:v("bCategory"),stage:v("bStage"),teamA:v("bTeamA"),scoreA:v("bScoreA"),teamB:v("bTeamB"),scoreB:v("bScoreB"),winner:v("bWinner")});
  if(action==="saveMedal") Object.assign(data,{id:v("mId"),category:v("mCategory"),position:v("mPosition"),school:v("mSchool")});
  if(action==="saveAward") Object.assign(data,{id:v("aId"),icon:v("aIcon"),award:v("aAward"),student:v("aStudent"),school:v("aSchool"),category:v("aCategory")});
  msg.textContent = "Saving...";
  try{
    const r = await fetch(API,{method:"POST",body:JSON.stringify(data)});
    const res = await r.json();
    msg.textContent = res.message || "Saved.";
  }catch(e){ msg.textContent = "Unable to save. Please check Apps Script deployment."; }
}

window.addEventListener("load",()=>{
  initConfig();
  startCountdown();
  if(sessionStorage.getItem("cbseAdminLoggedIn")==="yes"){
    password.value = sessionStorage.getItem("cbseAdminPass") || "";
    loginScreen.style.display = "none";
    dashboard.style.display = "block";
  }
  setInterval(loadLive,10000);
  setInterval(loadNotices,30000);
});
