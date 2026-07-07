PHASE 1 PROFESSIONAL UPDATE

Included:
1. Mobile-friendly admin dashboard.
2. Set-by-set scoring: Set 1 to Set 5.
3. Current set indicator.
4. LIVE animation.
5. Professional fixture/live/result match cards.
6. Automatic standings calculated from completed matches.
7. Qualification zone shown in standings.

IMPORTANT:
Replace your Apps Script Code.gs with the new Code.gs.
Then:
- Change ADMIN_PASSWORD again if needed.
- Run setupSheets once if this is a fresh sheet.
- Deploy > Manage deployments > Edit > Deploy again.

Upload/replace these GitHub files:
- admin.html
- fixtures.html
- live-scores.html
- results.html
- standings.html
- Code.gs is for Apps Script only, not required in GitHub.

How standings work:
When a match status is set to Completed, standings calculate automatically.
Winner gets 3 points.
Ranking is by points, wins, then set difference.
