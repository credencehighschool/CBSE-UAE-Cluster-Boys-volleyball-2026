CBSE UAE CLUSTER BOYS VOLLEYBALL CHAMPIONSHIP
TOURNAMENT MANAGEMENT SYSTEM

This package creates a public website + live score system using a NEW separate Google Sheet.
Your existing registration portal and Google Sheet will NOT be touched.

FILES:
1. index.html              Public home page
2. live-scores.html        Public live scores page
3. admin.html              Owner update panel
4. fixtures.html           Locked fixtures page
5. results.html            Locked results page
6. Code.gs                 Google Apps Script backend
7. images/cover.png        Website cover image
8. downloads/              Folder for PDF files

STEP 1: CREATE NEW GOOGLE SHEET
Create a new Google Sheet named:
CBSE Volleyball Tournament Live Scores 2026

STEP 2: ADD APPS SCRIPT
Open the sheet > Extensions > Apps Script.
Delete existing code and paste Code.gs from this package.

STEP 3: CHANGE PASSWORD
In Code.gs change:
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";
Example:
const ADMIN_PASSWORD = "Vijesh@2026";

STEP 4: RUN SETUP
In Apps Script, select function setupSheets and click Run.
Accept permissions.

STEP 5: DEPLOY WEB APP
Click Deploy > New Deployment.
Select type: Web app.
Execute as: Me.
Who has access: Anyone.
Click Deploy.
Copy the Web App URL.

STEP 6: PASTE WEB APP URL
Open these two files before uploading to GitHub:
- admin.html
- live-scores.html

Replace:
PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE

with your Apps Script Web App URL.

STEP 7: UPLOAD TO GITHUB
Upload these to your GitHub repository:
- index.html
- live-scores.html
- admin.html
- fixtures.html
- results.html
- images folder
- downloads folder

STEP 8: HOW TO UPDATE LIVE SCORES
Open:
https://YOUR-GITHUB-URL/admin.html

Enter your password and update:
Match ID, category, status, teams, scores, set scores, winner.
Click Save / Update Match.

The public live score page:
https://YOUR-GITHUB-URL/live-scores.html

updates automatically every 15 seconds.

REGISTRATION LINK USED:
https://script.google.com/macros/s/AKfycbwqyephi8z4lTx7Mr8FFcMBNz51mfXaVvYl95WeR1pwyDpkr2rOtvI6-WifODrU_kX5cA/exec
