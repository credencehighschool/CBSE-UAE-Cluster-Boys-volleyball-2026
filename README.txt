ADVANCED CHAMPIONSHIP PORTAL

This is a complete public website + owner admin dashboard using a NEW separate Google Sheet.
Your existing registration system is not touched.

FILES TO UPLOAD TO GITHUB:
index.html
fixtures.html
live-scores.html
results.html
standings.html
gallery.html
admin.html
images folder
downloads folder

APPS SCRIPT:
Use Code.gs in a NEW Google Sheet.

SETUP:
1. Create a NEW Google Sheet named: CBSE Volleyball Championship Portal Data.
2. Extensions > Apps Script.
3. Paste Code.gs.
4. Change ADMIN_PASSWORD.
5. Run setupSheets once.
6. Deploy > New deployment > Web app.
7. Execute as: Me.
8. Access: Anyone.
9. Copy the Web App URL.
10. Replace PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE in all HTML files.
11. Upload HTML files to GitHub.

ADMIN:
Open your GitHub URL /admin.html.
Use your password and update matches, scores, standings, notices, downloads, gallery, venue.

Registration portal linked:
https://script.google.com/macros/s/AKfycbwqyephi8z4lTx7Mr8FFcMBNz51mfXaVvYl95WeR1pwyDpkr2rOtvI6-WifODrU_kX5cA/exec


CONNECTED WEB APP URL:
https://script.google.com/macros/s/AKfycbzopk8FtUzxLSngOjRvkJE4FLAX0hWRGddRSmaqLzQpFFvfGGTMP5wwPcmuS7qqtKMgmA/exec

These files are now connected to your Apps Script Web App.
Upload/replace the HTML files in GitHub.


LOGIN FIX APPLIED:
- Fixtures page no longer opens admin dashboard.
- Admin dashboard opens only through admin.html / Admin tab.
- Admin page now shows Username and Password login first.
- Default username is: admin
- Password is the password set in Code.gs under ADMIN_PASSWORD.


DIRECT LINKS UPDATE APPLIED:
1. Fixtures page now has 3 category fixture download buttons:
   - U-14 Boys
   - U-17 Boys
   - U-19 Boys

2. Fixture PDF links are pasted directly in fixtures.html:
   PASTE_U14_BOYS_FIXTURE_PDF_DRIVE_LINK_HERE
   PASTE_U17_BOYS_FIXTURE_PDF_DRIVE_LINK_HERE
   PASTE_U19_BOYS_FIXTURE_PDF_DRIVE_LINK_HERE

3. Downloads are pasted directly in index.html:
   PASTE_INVITATION_PDF_DRIVE_LINK_HERE
   PASTE_INSTRUCTIONS_GUIDELINES_PDF_DRIVE_LINK_HERE

4. Venue/location link is pasted directly in index.html:
   PASTE_GOOGLE_MAP_LOCATION_LINK_HERE

5. Championship stats are pasted directly in index.html:
   PARTICIPATING_SCHOOLS
   TOTAL_ATHLETES
   TOTAL_TEAMS

6. Admin dashboard no longer manages Downloads or Venue.
   Admin still manages Matches, Live Scores, Standings, Notices and Gallery.
