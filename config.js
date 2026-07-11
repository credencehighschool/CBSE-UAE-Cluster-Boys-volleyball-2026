/*
CBSE UAE Cluster Boys Volleyball Championship Portal
CENTRAL CONFIGURATION FILE

Every year, change ONLY this file for:
- event title, year, dates
- registration URL / Apps Script URL
- fixture PDF links, downloads, venue/map link, contact details
- which sections are open to the public (phase toggles)
*/

const SITE_CONFIG = {
  eventTitle: "CBSE UAE Cluster Boys Volleyball Championship",
  eventYear: "2026–27",
  hostedBy: "Credence High School, Dubai",
  categoriesText: "Boys U-14 | U-17 | U-19",
  heroImage: "images/cover.png",

  championshipStart: "September 19, 2026 07:00:00",
  championshipDatesText: "Saturday, September 19th & Sunday, September 20th 2026",
  acceptanceDeadline: "Monday, June 8th 2026",
  entryDeadline: "Friday, June 12th 2026",

  // IMPORTANT: paste your deployed Google Apps Script Web App URL here (see Code.gs)
  apiUrl: "https://script.google.com/macros/s/AKfycbzXg6BorI-Nvfsno0Il7rD9XITVWAnEWnvmsyEEFhmbtMovv-KwJTg-LAnULVRNocru/exec",
  registrationUrl: "https://script.google.com/macros/s/AKfycbwqyephi8z4lTx7Mr8FFcMBNz51mfXaVvYl95WeR1pwyDpkr2rOtvI6-WifODrU_kX5cA/exec",

  // Turn each section on once it's ready — controls the Home page tiles
  phase: {
    fixturesOpen: true,
    liveOpen: true,
    standingsOpen: true
  },

  // Edited here directly for instant loading — no Google Sheet lookup needed.
  // Update these numbers any time; the homepage picks them up immediately.
  overview: {
    participatingSchools: "00",
    totalTeams: "00",
    totalAthletes: "00",
    overviewNote: "Join schools from across the UAE cluster in this year's championship — full results, live action and standings all in one place."
  },

  fixtures: {
    u14: "PASTE_U14_BOYS_FIXTURE_PDF_DRIVE_LINK_HERE",
    u17: "PASTE_U17_BOYS_FIXTURE_PDF_DRIVE_LINK_HERE",
    u19: "PASTE_U19_BOYS_FIXTURE_PDF_DRIVE_LINK_HERE"
  },

  downloads: [
    { icon: "📩", title: "Invitation", note: "Click to download invitation", url: "PASTE_INVITATION_PDF_DRIVE_LINK_HERE" },
    { icon: "📝", title: "Step by Step Guideline to Team Registration Portal", note: "Open registration portal", url: "https://script.google.com/macros/s/AKfycbwqyephi8z4lTx7Mr8FFcMBNz51mfXaVvYl95WeR1pwyDpkr2rOtvI6-WifODrU_kX5cA/exec" },
    { icon: "📘", title: "Instructions and Guidelines of the Competition", note: "Click to download guidelines", url: "PASTE_INSTRUCTIONS_GUIDELINES_PDF_DRIVE_LINK_HERE" },
    { icon: "🌐", title: "FIVB Website", note: "Official international volleyball website", url: "https://www.fivb.com/" },
    { icon: "🇮🇳", title: "VFI Website", note: "Volleyball Federation of India", url: "https://volleyballindia.com/" },
    { icon: "📖", title: "FIVB Rules", note: "Official rules of the game", url: "https://www.fivb.com/volleyball/the-game/rules-of-the-game/" }
  ],

  venue: {
    title: "Championship Venue",
    details: "Indoor stadiums in Dubai Emirate. Final venue details and Google Map location will be updated soon.",
    mapUrl: "PASTE_GOOGLE_MAP_LOCATION_LINK_HERE"
  },

  contact: {
    name: "Mr. Vijesh V",
    role: "Head of Department – Physical Education",
    email: "physicaleducation@credencehighschool.com",
    mobile: "+971 56 369 2429",
    mobileLink: "+971563692429"
  }
};

function getApiUrl() {
  return SITE_CONFIG.apiUrl;
}

function applyCommonConfig() {
  document.querySelectorAll("[data-event-title]").forEach(el => el.textContent = SITE_CONFIG.eventTitle);
  document.querySelectorAll("[data-event-year]").forEach(el => el.textContent = SITE_CONFIG.eventYear);
  document.querySelectorAll("[data-hosted-by]").forEach(el => el.textContent = SITE_CONFIG.hostedBy);
  document.querySelectorAll("[data-categories]").forEach(el => el.textContent = SITE_CONFIG.categoriesText);
}
