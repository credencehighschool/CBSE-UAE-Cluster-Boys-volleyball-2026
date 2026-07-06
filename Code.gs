/*
CBSE UAE Cluster Boys Volleyball Championship - Tournament Management Backend

SETUP:
1. Create a NEW Google Sheet only for tournament updates.
2. Open Extensions > Apps Script.
3. Paste this Code.gs.
4. Change ADMIN_PASSWORD below.
5. Save.
6. Run setupSheets once.
7. Deploy > New deployment > Web app.
8. Execute as: Me
9. Who has access: Anyone
10. Copy Web App URL.
11. Paste that URL in admin.html and live-scores.html replacing:
   PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE
*/

const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("Scores");
  if (!sh) sh = ss.insertSheet("Scores");
  sh.clear();

  sh.getRange(1, 1, 1, 13).setValues([[
    "Match ID",
    "Category",
    "Status",
    "Date",
    "Time",
    "Court",
    "Team A",
    "Score A",
    "Team B",
    "Score B",
    "Set Scores",
    "Winner",
    "Last Updated"
  ]]);

  sh.getRange(2, 1, 3, 13).setValues([
    ["M001","Boys U-14","Scheduled","Saturday, 19 September 2026","8:30 AM","Court 1","School A","0","School B","0","To be updated","To be updated",new Date()],
    ["M002","Boys U-17","Scheduled","Saturday, 19 September 2026","9:30 AM","Court 2","School C","0","School D","0","To be updated","To be updated",new Date()],
    ["M003","Boys U-19 Final","Scheduled","Sunday, 20 September 2026","To be updated","Court 1","Finalist 1","0","Finalist 2","0","To be updated","To be updated",new Date()]
  ]);

  sh.autoResizeColumns(1, 13);
}

function doGet(e) {
  const action = e.parameter.action;

  if (action === "getScores") {
    return jsonOutput({ scores: getScores() });
  }

  return jsonOutput({ message: "Tournament API is running." });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    if (data.password !== ADMIN_PASSWORD) {
      return jsonOutput({ success:false, message:"Invalid admin password." });
    }

    if (data.action === "saveScore") {
      saveScore(data);
      return jsonOutput({ success:true, message:"Match saved successfully." });
    }

    return jsonOutput({ success:false, message:"Unknown action." });
  } catch (err) {
    return jsonOutput({ success:false, message:err.toString() });
  }
}

function getScores() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scores");
  if (!sh) return [];

  const values = sh.getDataRange().getValues();
  values.shift();

  return values
    .filter(r => r[0])
    .map(r => ({
      matchId: r[0],
      category: r[1],
      status: r[2],
      date: r[3],
      time: r[4],
      court: r[5],
      teamA: r[6],
      scoreA: r[7],
      teamB: r[8],
      scoreB: r[9],
      sets: r[10],
      winner: r[11],
      updated: r[12]
    }));
}

function saveScore(data) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scores");
  if (!sh) throw new Error("Scores sheet not found. Run setupSheets first.");

  const matchId = data.matchId;
  const values = sh.getDataRange().getValues();

  let row = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === matchId) {
      row = i + 1;
      break;
    }
  }

  const rowData = [[
    matchId,
    data.category || "",
    data.status || "",
    data.date || "",
    data.time || "",
    data.court || "",
    data.teamA || "",
    data.scoreA || "",
    data.teamB || "",
    data.scoreB || "",
    data.sets || "",
    data.winner || "",
    new Date()
  ]];

  if (row === -1) {
    sh.appendRow(rowData[0]);
  } else {
    sh.getRange(row, 1, 1, 13).setValues(rowData);
  }

  sh.autoResizeColumns(1, 13);
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
