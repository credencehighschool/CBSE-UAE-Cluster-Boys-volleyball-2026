# CBSE UAE Cluster Boys Volleyball Championship 2026-27 Website

## Upload these files to GitHub root
- index.html
- style.css
- app.js
- config.js
- images folder
- downloads folder

## Very important
The registration portal link is in `config.js`:
```js
registrationUrl: "https://script.google.com/macros/s/AKfycbwqyephi8z4lTx7Mr8FFcMBNz51mfXaVvYl95WeR1pwyDpkr2rOtvI6-WifODrU_kX5cA/exec"
```

## Public locked sections
Live Match Centre, Today's Fixtures, Team Standings, Recently Completed Matches, and Latest Gallery are locked for public until 19 September 2026.
To unlock earlier, open `config.js` and set:
```js
lockPublicMatchSectionsUntilStart: false
```

## Google Apps Script
1. Open your Google Sheet.
2. Extensions > Apps Script.
3. Replace the code with `Code.gs`.
4. Change `ADMIN_PASSWORD`.
5. Save.
6. Deploy > New deployment > Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Copy the Web App URL.
10. Paste it in `config.js` under `apiUrl`.

## Admin Login
Username is set in `config.js`:
```js
adminUsername: "admin"
```
Password is set in Apps Script `Code.gs`:
```js
const ADMIN_PASSWORD = 'change-this-password';
```

## PDF files
Replace the placeholder PDF files inside `/downloads` with your real files using the same names:
- invitation.pdf
- team-registration-guideline.pdf
- instructions-guidelines.pdf
- u14-boys-fixture.pdf
- u17-boys-fixture.pdf
- u19-boys-fixture.pdf
