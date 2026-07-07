const SITE_CONFIG = {
  eventTitle: "CBSE UAE Cluster Boys Volleyball Championship",
  eventYear: "2026–27",
  hostedBy: "Credence High School, Dubai",
  categories: "Boys U-14 | U-17 | U-19",
  championshipStart: "2026-09-19T07:00:00+04:00",
  championshipDates: "19 & 20 September 2026 (Saturday & Sunday)",
  acceptanceDeadline: "Monday, 8 June 2026",
  entryDeadline: "Friday, 12 June 2026",

  // Paste your deployed Google Apps Script Web App URL here after deployment.
  apiUrl: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE",

  // Registration portal link is the most important public button.
  registrationUrl: "https://script.google.com/macros/s/AKfycbwqyephi8z4lTx7Mr8FFcMBNz51mfXaVvYl95WeR1pwyDpkr2rOtvI6-WifODrU_kX5cA/exec",

  // Keep true until the championship starts. Public sections will show locked cards.
  lockPublicMatchSectionsUntilStart: true,

  adminUsername: "admin",

  fixtures: {
    u14: "downloads/u14-boys-fixture.pdf",
    u17: "downloads/u17-boys-fixture.pdf",
    u19: "downloads/u19-boys-fixture.pdf"
  },

  downloads: [
    { icon: "📄", title: "Invitation", subtitle: "Download PDF", url: "downloads/invitation.pdf" },
    { icon: "📗", title: "Team Registration Guideline", subtitle: "Download PDF", url: "downloads/team-registration-guideline.pdf" },
    { icon: "📘", title: "Instructions & Guidelines", subtitle: "Download PDF", url: "downloads/instructions-guidelines.pdf" },
    { icon: "🌐", title: "FIVB Rules", subtitle: "Website Link", url: "https://www.fivb.com/volleyball/the-game/rules-of-the-game/" }
  ],

  venue: {
    title: "Championship Venue",
    details: "Indoor Stadiums, Dubai Emirate",
    mapUrl: "PASTE_GOOGLE_MAP_LOCATION_LINK_HERE"
  },

  contact: {
    name: "Mr. Vijesh V",
    role: "Head of Department – Physical Education",
    email: "physicaleducation@credencehighschool.com",
    mobile: "+971 56 369 2429",
    phoneLink: "+971563692429"
  }
};
