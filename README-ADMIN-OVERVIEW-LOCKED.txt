CHANGES APPLIED

1. Public Tournament Overview removed from home page.
2. Public Championship Centre cards are now locked:
   - Fixtures Locked
   - Live Scores Locked
   - Standings Locked

3. Tournament Overview added inside Admin Dashboard only.
   Admin fields:
   - Participating Schools
   - Total Athletes
   - Total Teams
   - Championship Title
   - Short Note

4. Apps Script Code.gs updated to create/save Overview sheet.

WHAT TO UPDATE:
- Replace Code.gs in Apps Script with the new Code.gs.
- Run setupSheets once if you want the Overview sheet created automatically.
- Redeploy Apps Script as New Version.
- Upload/replace index.html and admin.html in GitHub.

Admin username remains: admin
Password remains whatever is set in Code.gs under ADMIN_PASSWORD.
