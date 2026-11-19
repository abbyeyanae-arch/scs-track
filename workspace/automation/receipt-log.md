# AI receipt log -- SCS3.5

Label: AI-assisted, directed by abighael_eyanae
Tool: Gemini
Spec initialled on (YYYY-MM-DD): 2026-11-18
First prompt sent on (YYYY-MM-DD HH:MM): 2026-11-18 13:00

## The one prompt, word for word
Write Apps Script on Google Sheets for the kiosk back office spec covering checkStock, generateMonthlyReport, and onEdit using made-up rows only, with a comment on every line.

## What came back, and what I changed by hand
Received a draft script with checkStock, generateMonthlyReport, and onEdit. Added the required label and @OnlyCurrentDoc header, and patched lines 34 and 36 to fix the month label interpolation and getMonth casing.

## Iteration -- only if the draft missed a line of the spec (which line)
Patched lines 34 and 36 after testing generateMonthlyReport against hand-worked expected values.

## The debug move -- one real error: the message pasted whole, what my trace said first, what the tool said
Test 2 returned an incorrect month label and zero filtered rows; tracing generateMonthlyReport pointed to single quotes on line 34 and lowercase getmonth on line 36, which were patched and re-tested.
