/* Shared header + footer, injected on every page.
   To add/rename a nav link, edit NAV_LINKS below ONCE — every page updates.
   phaseKey ties a link to SITE_CONFIG.phase.<phaseKey>Open — when that's
   false the link shows locked (🔒) both here AND on the homepage tile, and
   the destination page itself refuses to load its data (see phaseGuard()
   at the top of fixtures.html / live-scores.html / standings.html). One
   flag in config.js controls the lock everywhere it appears. */
const NAV_LINKS = [
  { id: "home",     label: "Home",      href: "index.html" },
  { id: "fixtures", label: "Fixtures",  href: "fixtures.html",    phaseKey: "fixtures" },
  { id: "upcoming", label: "Upcoming",  href: "upcoming.html" },
  { id: "live",     label: "Live",      href: "live-scores.html", phaseKey: "live" },
  { id: "standings",label: "Standings", href: "standings.html",   phaseKey: "standings" },
  { id: "results",  label: "Results",   href: "results.html" },
  { id: "medals",   label: "Medals",    href: "medal-tally.html" },
  { id: "awards",   label: "Awards",    href: "awards.html" },
  { id: "gallery",  label: "Gallery",   href: "gallery.html" },
];

function isPhaseOpen(phaseKey){
  if(!phaseKey) return true;
  return !!(SITE_CONFIG.phase && SITE_CONFIG.phase[phaseKey+"Open"]);
}

function navLinkHTML(l, activePage){
  const locked = l.phaseKey && !isPhaseOpen(l.phaseKey);
  if(locked){
    return `<span class="nav-locked" title="Not open yet">🔒 ${l.label}</span>`;
  }
  return `<a href="${l.href}" class="${l.id === activePage ? "active" : ""}">${l.label}</a>`;
}

function renderLayout(activePage) {
  injectModal();
  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="brand">
        <div class="brand-icon">🏐</div>
        <div>
          <strong data-event-title>${SITE_CONFIG.eventTitle}</strong>
          <span>Boys Volleyball Championship <span data-event-year>${SITE_CONFIG.eventYear}</span></span>
        </div>
      </div>
      <nav class="nav">
        ${NAV_LINKS.map(l => navLinkHTML(l, activePage)).join("")}
        <a href="admin.html" class="admin-link ${activePage === "admin" ? "active" : ""}">Admin</a>
      </nav>`;
  }
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `© <span data-event-year>${SITE_CONFIG.eventYear}</span> ${SITE_CONFIG.hostedBy} · <span data-event-title>${SITE_CONFIG.eventTitle}</span>`;
  }
}

/* Call this at the top of fixtures.html / live-scores.html / standings.html,
   right after renderLayout(). If the page's own phase flag is off, it hides
   the real content and shows a simple "locked" message instead, and returns
   true (the caller should skip its data-loading calls). */
function phaseGuard(phaseKey, label){
  if(isPhaseOpen(phaseKey)) return false;
  Array.from(document.body.children).forEach(el=>{
    if(el.id!=="site-header" && el.id!=="site-footer" && el.tagName!=="SCRIPT"){
      el.style.display="none";
    }
  });
  const lockScreen = document.createElement("section");
  lockScreen.className = "section";
  lockScreen.innerHTML = `
    <div class="card" style="text-align:center;max-width:560px;margin:40px auto">
      <span style="font-size:40px;display:block;margin-bottom:14px">🔒</span>
      <h2 style="font-family:var(--display);text-transform:uppercase;font-size:22px;margin-bottom:10px">${label} isn't open yet</h2>
      <p class="muted">Check back once the owner opens this section.</p>
    </div>`;
  const footer = document.getElementById("site-footer");
  if(footer && footer.parentNode) footer.parentNode.insertBefore(lockScreen, footer);
  else document.body.appendChild(lockScreen);
  return true;
}

/* ---------------------------------------------------------------------
   Universal centered modal — replaces every native browser confirm()/alert()
   site-wide so messages look the same (and are just as usable on mobile)
   everywhere instead of the ugly default browser popup.
   --------------------------------------------------------------------- */
function injectModal(){
  if (document.getElementById("modalOverlay")) return;
  const div = document.createElement("div");
  div.id = "modalOverlay";
  div.className = "modal-overlay";
  div.innerHTML = `
    <div class="modal-box">
      <p id="modalMessage"></p>
      <div class="modal-actions" id="modalActions"></div>
    </div>`;
  document.body.appendChild(div);
  div.addEventListener("click", (e)=>{ if(e.target===div) closeModal(); });
}
/* Shared everywhere a match's set scores are shown (admin court panel, public
   Live Scores, Results, homepage mini-cards) — shows which side won each set,
   not just the score, using the school code when available. */
// Shared everywhere a school's emirate needs to show as a short code next
// to its name (live scoring, results, standings).
const EMIRATE_SHORT = {
  "Dubai": "DXB", "Abu Dhabi": "AUH", "Sharjah": "SHJ", "Ajman": "AJM",
  "Fujairah": "FJR", "Ras Al Khaimah": "RAK", "Umm Al Quwain": "UAQ"
};
function emirateShort(name){
  return EMIRATE_SHORT[name] || "";
}

// Safety net for the live scoring display — a match should only ever show
// as won if the sets actually justify it (2 set wins for Best of 2/3, 3 for
// Best of 5), regardless of what status/winner happen to be stored. This
// stops any data inconsistency from ever displaying a premature "Winner".
function setsNeededToWin(format){
  return String(format || "").includes("5") ? 3 : 2;
}
function isMatchGenuinelyOver(c){
  const need = setsNeededToWin(c.format);
  return (Number(c.setsWonA) || 0) >= need || (Number(c.setsWonB) || 0) >= need;
}
// Builds "School Name (CODE, EMR)" — used consistently across admin and public pages.
function teamLabelHTML(name, code, emirate){
  if(!name) return "";
  const bits = [code, emirateShort(emirate)].filter(Boolean).join(", ");
  return name + (bits ? ` (${bits})` : "");
}

function setPillsHTML(obj, codeAField, codeBField){
  const sets = [obj.set1, obj.set2, obj.set3, obj.set4, obj.set5];
  const codeA = obj[codeAField] || obj.teamA || "A";
  const codeB = obj[codeBField] || obj.teamB || "B";
  return sets.filter(Boolean).map((s,i)=>{
    const parts = String(s).split("-").map(Number);
    let winTag = "";
    if(parts.length===2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0]!==parts[1]){
      winTag = ` — <b>${parts[0]>parts[1] ? codeA : codeB} won</b>`;
    }
    return `<span class="set-pill">Set ${i+1}: ${s}${winTag}</span>`;
  }).join("");
}
/* ----------------------------- SHARED CAROUSEL INFRASTRUCTURE -----------------------------
   Used by the homepage's six carousels and any other page that wants the
   same fits-or-scrolls auto-scroll behaviour (e.g. fixtures.html). */

function carouselCardClick(e, target){
  if(e.target.closest('a')) return; // don't hijack an actual link if one's ever added inside a card
  window.location.href = target;
}

// Stores each carousel's real (un-duplicated) content so the fits-or-not
// decision can be redone anytime — e.g. when a hidden tab becomes visible,
// or the window gets resized — without needing the original data again.
const carouselRawHTML = {};

function renderCarousel(id, dotsId, itemCount, cardsHTML, emptyHTML){
  const el = document.getElementById(id);
  if(!el) return;
  const dotsEl = document.getElementById(dotsId);
  if(!cardsHTML){ el.innerHTML = emptyHTML; el.dataset.loopWidth = ""; carouselRawHTML[id] = ""; if(dotsEl) dotsEl.innerHTML = ""; return; }
  carouselRawHTML[id] = cardsHTML;
  el.dataset.itemCount = String(itemCount);
  applyCarouselLayout(id, dotsId);
}

// The actual decision: render the real content once (not duplicated) and
// measure it. If it already fits within the visible width, leave it exactly
// like that — plain, static, nothing to scroll. Only if it genuinely
// overflows do we duplicate it once, for a seamless auto-scroll loop.
function applyCarouselLayout(id, dotsId){
  const el = document.getElementById(id);
  const cardsHTML = carouselRawHTML[id];
  if(!el || !cardsHTML) return;
  el.innerHTML = cardsHTML;
  requestAnimationFrame(()=>{
    const singleWidth = el.scrollWidth;
    if(singleWidth <= el.clientWidth + 2){
      el.dataset.loopWidth = "";
      const dotsEl = document.getElementById(dotsId);
      if(dotsEl) dotsEl.innerHTML = "";
      return;
    }
    el.innerHTML = cardsHTML + cardsHTML;
    requestAnimationFrame(()=>{
      el.dataset.loopWidth = String(singleWidth);
      setupCarouselDots(id, dotsId);
    });
  });
}

// One dot per "page" (a screenful of cards), not one per single card —
// keeps this sane even with 30+ completed matches. Clicking a dot jumps the
// carousel straight to that page; auto-scroll just continues from there.
function setupCarouselDots(boxId, dotsId){
  const el = document.getElementById(boxId);
  const dotsEl = document.getElementById(dotsId);
  if(!el || !dotsEl) return;
  const itemCount = Number(el.dataset.itemCount) || 0;
  const loopWidth = Number(el.dataset.loopWidth) || 0;
  if(!itemCount || !loopWidth || !el.clientWidth){ dotsEl.innerHTML = ""; return; }
  const itemsPerView = Math.max(1, Math.round(el.clientWidth / (loopWidth / itemCount)));
  const pageCount = Math.max(1, Math.ceil(itemCount / itemsPerView));
  if(pageCount <= 1){ dotsEl.innerHTML = ""; return; }
  dotsEl.innerHTML = Array.from({length: pageCount}, (_,i)=>
    `<button class="carousel-dot ${i===0?'active':''}" aria-label="Go to page ${i+1}" onclick="jumpCarouselToPage('${boxId}', ${i})"></button>`
  ).join("");
}

function jumpCarouselToPage(boxId, page){
  const el = document.getElementById(boxId);
  if(!el) return;
  const itemCount = Number(el.dataset.itemCount) || 1;
  const loopWidth = Number(el.dataset.loopWidth) || 0;
  if(!loopWidth) return;
  const itemStep = loopWidth / itemCount;
  const itemsPerView = Math.max(1, Math.round(el.clientWidth / itemStep));
  el.scrollLeft = Math.min(loopWidth - 1, page * itemsPerView * itemStep);
}

function updateActiveDot(boxId, dotsId){
  const el = document.getElementById(boxId);
  const dotsEl = document.getElementById(dotsId);
  if(!el || !dotsEl || !dotsEl.children.length) return;
  const itemCount = Number(el.dataset.itemCount) || 1;
  const loopWidth = Number(el.dataset.loopWidth) || 0;
  if(!loopWidth) return;
  const itemStep = loopWidth / itemCount;
  const itemsPerView = Math.max(1, Math.round(el.clientWidth / itemStep));
  const pageCount = dotsEl.children.length;
  const currentPage = Math.min(pageCount-1, Math.floor((el.scrollLeft % loopWidth) / (itemsPerView*itemStep)));
  Array.from(dotsEl.children).forEach((dot,i)=>dot.classList.toggle('active', i===currentPage));
}

function remeasureCarousel(id, dotsId){
  applyCarouselLayout(id, dotsId); // redo the whole fits-or-not decision now that the tab is actually visible
}

function autoScrollCarousel(id, dotsId, speed){
  const el = document.getElementById(id);
  if(!el) return;
  (function step(){
    const loopWidth = Number(el.dataset.loopWidth) || 0;
    if(loopWidth > el.clientWidth + 2){
      el.scrollLeft += speed;
      if(el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth; // seamless — lands on the identical duplicate frame
      if(dotsId) updateActiveDot(id, dotsId);
    }
    requestAnimationFrame(step);
  })();
}

function closeModal(){
  const overlay = document.getElementById("modalOverlay");
  if(overlay) overlay.classList.remove("open");
}
function showAlert(message, onOk){
  injectModal();
  document.getElementById("modalMessage").innerText = message;
  document.getElementById("modalActions").innerHTML = '<button class="btn" id="modalOkBtn">OK</button>';
  document.getElementById("modalOverlay").classList.add("open");
  document.getElementById("modalOkBtn").onclick = ()=>{ closeModal(); if(onOk) onOk(); };
}
function showConfirm(message, onYes, onNo){
  injectModal();
  document.getElementById("modalMessage").innerText = message;
  document.getElementById("modalActions").innerHTML = '<button class="btn" id="modalYesBtn">Yes</button><button class="btn btn-quiet-dark" id="modalNoBtn">No</button>';
  document.getElementById("modalOverlay").classList.add("open");
  document.getElementById("modalYesBtn").onclick = ()=>{ closeModal(); if(onYes) onYes(); };
  document.getElementById("modalNoBtn").onclick = ()=>{ closeModal(); if(onNo) onNo(); };
}
