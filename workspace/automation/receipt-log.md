# AI receipt log -- SCS3.5

Label: AI-assisted, directed by abighael_eyanae
Tool: Gemini
Spec initialled on (YYYY-MM-DD): 2026-11-18
First prompt sent on (YYYY-MM-DD HH:MM): 2026-11-18 13:00

## The one prompt, word for word
Write Google Apps Script on Google Sheets for the kiosk back office specification using only made-up sample rows and a comment on every line. Implement three functions: checkStock to read DASHBOARD A12:C15, filter rows where status equals REORDER, create or clear REMINDERS, write headers ITEM, CURRENT STOCK, STATUS, and output matching rows; generateMonthlyReport to read RECORD A2:F1000 for November 2026 OUT entries, calculate total sales and units sold, and write MONTHLY REPORT with headers REPORT MONTH, TOTAL SALES, UNIT SOLD; and onEdit(e) for INTAKE edits on rows greater than 1 and columns up to 2, validating positive numbers, adding a dd/MM/yyyy date in column C if blank, and setting OK or INVALID ENTRY in column D. Do not include any real client data, customer names, phone numbers, balances, or addresses.

## What came back, and what I changed by hand
Received a draft script implementing checkStock, generateMonthlyReport, and onEdit. Added @OnlyCurrentDoc and the AI-assisted label at the top, and patched lines 34 and 36 to fix the month label template literal and getMonth casing.

## Iteration -- only if the draft missed a line of the spec (which line)
Patched lines 34 and 36 after testing generateMonthlyReport against hand-worked expected values.

## The debug move -- one real error: the message pasted whole, what my trace said first, what the tool said
Test 2 produced an incorrect month label and zero filtered rows; tracing generateMonthlyReport identified single quotes on line 34 and lowercase getmonth on line 36, which were patched and re-tested.
