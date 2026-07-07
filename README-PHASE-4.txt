PHASE 4 SINGLE PAGE APPLICATION

This version uses only one main public page:
index.html

Supporting files:
config.js
style.css
app.js
images/cover.png

What changed:
- All public pages are now tabs inside one website.
- No more separate fixtures/live/results/standings/bracket/medal/awards HTML files.
- One config.js controls all event settings and links.
- Admin dashboard is inside the same website.
- Mobile-friendly navigation.

UPLOAD TO GITHUB:
index.html
config.js
style.css
app.js
images folder
downloads folder

APPS SCRIPT:
Replace Code.gs with the included Code.gs only if your current Apps Script does not already support:
Matches, Notices, Gallery, Bracket, Medals, Awards.

Then:
1. Save Code.gs
2. Run setupSheets only if creating fresh sheets
3. Deploy > Manage deployments > Edit > New version > Deploy

ADMIN LOGIN:
Username is set in config.js:
adminUsername: "admin"

Password is set in Code.gs:
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

NEXT YEAR:
Edit only config.js for title, dates, registration link, API URL, fixture PDF links, downloads, venue and contact.
