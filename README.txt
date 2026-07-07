CBSE UAE VOLLEYBALL SIMPLE PROFESSIONAL WEBSITE

UPLOAD TO GITHUB ROOT:
1. index.html
2. style.css
3. app.js
4. config.js
5. images folder
6. downloads folder

DO NOT UPLOAD apps-script/Code.gs TO GITHUB.
Code.gs is only for Google Apps Script.

APPS SCRIPT SETUP:
1. Open your tournament Google Sheet.
2. Extensions > Apps Script.
3. Delete old code.
4. Paste apps-script/Code.gs.
5. Change ADMIN_PASSWORD.
6. Save.
7. Run setupSheet once.
8. Deploy > New deployment > Web app.
9. Execute as: Me.
10. Who has access: Anyone.
11. Copy Web App URL.
12. Paste it in config.js under apiUrl.
13. Upload updated config.js to GitHub.

ADMIN LOGIN:
Username: admin
Password: whatever you set in Code.gs.

FEATURES:
- Moving welcome/deadline/venue banner
- Registration portal button
- Hosted by and categories
- Tournament overview
- Countdown
- Fixture PDF download buttons only
- Venue
- Contact
- Simple admin dashboard for banner and overview numbers

REMOVED:
- Live scores
- Standings
- Generated fixtures
- Complex match controls
