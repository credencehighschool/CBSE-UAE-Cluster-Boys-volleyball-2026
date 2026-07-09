/* Shared header + footer, injected on every page.
   To add/rename a nav link, edit NAV_LINKS below ONCE — every page updates. */

const NAV_LINKS = [
  { id: "home",     label: "Home",      href: "index.html" },
  { id: "fixtures", label: "Fixtures",  href: "fixtures.html" },
  { id: "live",     label: "Live",      href: "live-scores.html" },
  { id: "standings",label: "Standings", href: "standings.html" },
  { id: "results",  label: "Results",   href: "results.html" },
  { id: "medals",   label: "Medals",    href: "medal-tally.html" },
  { id: "awards",   label: "Awards",    href: "awards.html" },
  { id: "gallery",  label: "Gallery",   href: "gallery.html" },
];

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
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="${l.id === activePage ? "active" : ""}">${l.label}</a>`).join("")}
        <a href="admin.html" class="admin-link ${activePage === "admin" ? "active" : ""}">Admin</a>
      </nav>`;
  }
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `© <span data-event-year>${SITE_CONFIG.eventYear}</span> ${SITE_CONFIG.hostedBy} · <span data-event-title>${SITE_CONFIG.eventTitle}</span>`;
  }
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
