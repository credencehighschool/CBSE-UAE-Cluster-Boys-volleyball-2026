<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Knockout Bracket | CBSE UAE Cluster Boys Volleyball Championship</title>
<link rel="stylesheet" href="styles.css">
<script src="config.js"></script>
</head>
<body>
<header class="header" id="site-header"></header>

<section class="section">
  <div class="title"><small>Straight Knockout</small><h2>Knockout Bracket</h2><p class="muted">Every round, from the round of many down to the Final — scroll sideways to follow the draw.</p></div>
  <div class="tabs" id="categoryTabs"></div>
  <div id="bracketPanels"></div>
</section>

<footer class="footer" id="site-footer"></footer>
<script src="components.js"></script>
<script>
renderLayout('bracket');
const API=getApiUrl();

function matchCard(m){
  const aWin = m.winner && m.winner.trim() && m.winner.trim()===m.teamA;
  const bWin = m.winner && m.winner.trim() && m.winner.trim()===m.teamB;
  return `<div class="bracket-match">
    <small>${m.id||''}</small>
    <div class="bracket-team ${aWin?'winner':''}"><span>${m.teamA||'TBD'}</span><span class="bracket-score">${m.scoreA===undefined||m.scoreA===''?'-':m.scoreA}</span></div>
    <div class="bracket-team ${bWin?'winner':''}"><span>${m.teamB||'TBD'}</span><span class="bracket-score">${m.scoreB===undefined||m.scoreB===''?'-':m.scoreB}</span></div>
  </div>`;
}

function renderCategory(matches){
  const rounds = [...new Set(matches.map(m=>m.stage))]
    .map(stage => ({ stage, order: Number((matches.find(m=>m.stage===stage)||{}).roundOrder) || 999 }))
    .sort((a,b)=>a.order-b.order);

  const cols = rounds.map(r=>{
    const items = matches.filter(m=>m.stage===r.stage);
    return `<div class="bracket-column">
      <h3>${r.stage}</h3>
      ${items.map(matchCard).join('') || '<p class="muted" style="text-align:center">To be updated</p>'}
    </div>`;
  }).join('');
  return `<div class="bracket-grid">${cols}</div>`;
}

async function load(){
  const panels = document.getElementById("bracketPanels");
  const tabs = document.getElementById("categoryTabs");
  try{
    const r = await fetch(API+"?action=bracket&cache="+Date.now());
    const d = await r.json();
    const rows = d.bracket || [];
    if(!rows.length){ panels.innerHTML = '<div class="card">Bracket will be published once the draw is finalized.</div>'; return; }

    const categories = [...new Set(rows.map(m=>m.category))];
    tabs.innerHTML = categories.map((c,i)=>`<button class="tab ${i===0?'active':''}" data-cat="${c}" onclick="showCat('${c}',this)">${c}</button>`).join('');
    panels.innerHTML = categories.map((c,i)=>`<div class="panel ${i===0?'active':''}" id="cat-${c.replace(/\s+/g,'-')}">${renderCategory(rows.filter(m=>m.category===c))}</div>`).join('');
  }catch(e){
    panels.innerHTML = '<div class="card">Unable to load bracket.</div>';
  }
}
function showCat(cat, btn){
  document.querySelectorAll('#categoryTabs .tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('#bracketPanels .panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('cat-'+cat.replace(/\s+/g,'-')).classList.add('active');
}
load();
</script>
</body>
</html>
