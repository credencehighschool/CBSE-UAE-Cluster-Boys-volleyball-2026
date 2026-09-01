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

  championshipStart: "September 28, 2026 08:00:00",
  championshipDatesText: "Monday, September 28th – Wednesday, September 30th 2026",
  championshipDatesShort: "Sep 28–30, 2026",
  acceptanceDeadline: "Monday, June 8th 2026",
  entryDeadline: "Friday, June 12th 2026",

  // IMPORTANT: paste your deployed Google Apps Script Web App URL here (see Code.gs)
  apiUrl: "https://script.google.com/macros/s/AKfycbzR0-gaRmeL9iJs9p3XbG06atHiqFN_xHHbmVY43Uk_pNnLLIv222Sg3L-gkPpqONxAGg/exec",
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
    { icon: "📘", title: "Instructions and Guidelines of the Competition", note: "Click to download guidelines", url: "PASTE_INSTRUCTIONS_GUIDELINES_PDF_DRIVE_LINK_HERE" }
  ],

  quickLinks: [
    { icon: "🌐", title: "FIVB Website", note: "Official international volleyball website", url: "https://www.fivb.com/" },
    { icon: "<svg viewBox=\"0 0 36 24\" width=\"30\" height=\"20\" aria-hidden=\"true\"><rect width=\"36\" height=\"24\" fill=\"#FFFFFF\" stroke=\"#D7DEE8\" stroke-width=\"0.5\"/><rect width=\"36\" height=\"8\" fill=\"#FF9933\"/><rect y=\"16\" width=\"36\" height=\"8\" fill=\"#138808\"/><circle cx=\"18\" cy=\"12\" r=\"3.2\" fill=\"none\" stroke=\"#000088\" stroke-width=\"0.5\"/><circle cx=\"18\" cy=\"12\" r=\"0.6\" fill=\"#000088\"/></svg>", title: "VFI Website", note: "Volleyball Federation of India", url: "https://volleyballindia.com/" },
    { icon: "📖", title: "FIVB Rules", note: "Official rules of the game", url: "https://www.fivb.com/volleyball/the-game/official-volleyball-rules/" }
  ],

  venue: {
    title: "Championship Venue",
    short: "Al Wasl Sports Club, Dubai",
    details: "Al Wasl Sports Club, Al Jadaf, Dubai.",
    mapUrl: "https://maps.app.goo.gl/7urGd8eNmkWbZhgAA"
  },

  // Paste your WhatsApp group invite link here (from WhatsApp: Group → Invite via link → Copy link)
  whatsappGroupUrl: "PASTE_WHATSAPP_GROUP_INVITE_LINK_HERE",

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
  document.querySelectorAll("[data-championship-dates-short]").forEach(el => el.textContent = SITE_CONFIG.championshipDatesShort);
  document.querySelectorAll("[data-championship-dates-full]").forEach(el => el.textContent = SITE_CONFIG.championshipDatesText);
  document.querySelectorAll("[data-venue-short]").forEach(el => el.textContent = SITE_CONFIG.venue.short);
}
