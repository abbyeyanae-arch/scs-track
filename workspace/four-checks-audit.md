# Four-Checks Audit

Run all four on every AI-built piece before a client sees it.  Write what you found, not what you hoped.
'Clean' is allowed only with the evidence beside it: the command you ran and what it printed, or the
page you read and the date you read it.  One section per piece; add a new piece at the bottom each time.

## Piece 1: the stock tool (workspace/stock-tools)

### Auth
Looked for: Hardcoded API keys, secrets, or tokens in send-sms.js and reorder.js.
Found: Hardcoded gateway API key `<REDACTED-SMS-KEY>` written directly in `workspace/stock-tools/send-sms.js` line 9.
Evidence: `grep -n "SMS_ENV_KEY" workspace/stock-tools/send-sms.js` -> `9:const SMS_ENV_KEY = "<REDACTED-SMS-KEY>";`

### Edge cases
Ugly inputs, written before trying them: Exact reorder boundary (`In stock` equal to `Reorder at`), blank stock cell, and quoted item names containing commas.
Found: `reorderList` uses `<` instead of `<=` (dropping items equal to reorder level like `grinding discs 115 mm` at 20/20), blank `"In stock"` (`Cement 50 kg`) evaluates to `NaN` and is dropped, and `parseCsv` splits on every comma breaking quoted fields (`"Nails, 3 inch"`).
Evidence: `node -e 'const r=require("./workspace/stock-tools/reorder.js"); console.log(r.reorderList(r.parseCsv(require("fs").readFileSync("workspace/stock-tools/stock-export.csv","utf8"))).map(x=>x.Item))'` -> omits `Cement 50 kg`, `"Nails, 3 inch"`, and `grinding discs 115 mm`.

### Wrong versions
Looked for: JavaScript APIs requiring newer Node.js versions than README's "Works on any Node" claim.
Found: `Object.groupBy` in `workspace/stock-tools/reorder.js` line 28 requires Node.js v21.0.0 or newer and throws `TypeError: Object.groupBy is not a function` on Node 18/20 LTS.
Evidence: `node --version` printed `v22.22.1` (which supports `Object.groupBy`, introduced in Node v21.0.0; `grep -n "groupBy" workspace/stock-tools/reorder.js` -> `28:  return Object.groupBy(list, (r) => r.Supplier);`).

### Invented libraries
Looked for: Non-existent Node core modules or invented functions imported in `reorder.js` and `send-sms.js`.
Found: `workspace/stock-tools/send-sms.js` line 5 imports `{ fetchWithRetry } = require("node:http")`, which does not exist in Node's `node:http` module (`undefined` at runtime).
Evidence: `node -e 'console.log(typeof require("node:http").fetchWithRetry)'` -> `undefined` (from `send-sms.js:5`).

The one to fix first, and why: Remove the hardcoded `SMS_ENV_KEY` from `send-sms.js` (Auth) and replace `fetchWithRetry` (Invented library) immediately so credentials are not exposed and SMS sending does not crash at runtime, then fix the `<=` reorder boundary in `reorder.js`.

## Piece 2: my own SCS3.5 script

### Auth
Looked for: Hardcoded credentials, personal emails, phone numbers, or sheet IDs in `workspace/automation/sheet-automation.gs`.
Found: Clean — script uses `SpreadsheetApp.getActiveSpreadsheet()` and `/** @OnlyCurrentDoc */` scope with no hardcoded secrets or client identifiers.
Evidence: `head -n 5 workspace/automation/sheet-automation.gs` -> `/** @OnlyCurrentDoc */` and `const ss = SpreadsheetApp.getActiveSpreadsheet();`

### Edge cases
Ugly inputs, written before trying them: Header row edits, negative/non-numeric quantities, blank rows, and sheet name casing (`Reminders` vs `REMINDERS`).
Found: `onEdit` skips row 1 and validates `typeof quantity === "number"` and `quantity > 0`, while `checkStock` looks up `"Reminders"` on line 10 but creates `"REMINDERS"` on line 12 if missing.
Evidence: `grep -n -E "Reminders|REMINDERS" workspace/automation/sheet-automation.gs` -> `10:  let reminders = ss.getSheetByName("Reminders");` and `12:    reminders = ss.insertSheet ("REMINDERS");`

### Wrong versions
Looked for: Deprecated Apps Script services or incompatible JavaScript syntax in `workspace/automation/sheet-automation.gs`.
Found: Uses V8 runtime syntax (`const`, `let`, arrow functions, template literals) and standard `SpreadsheetApp` methods (`getRange`, `getValues`, `setValues`, `clearContents`).
Evidence: `grep -n "SpreadsheetApp" workspace/automation/sheet-automation.gs` -> `4:  const ss = SpreadsheetApp.getActiveSpreadsheet();` (verified against Google Apps Script V8 runtime on 2026-11-19).

### Invented libraries
Looked for: Non-existent Apps Script classes or invented methods in `workspace/automation/sheet-automation.gs`.
Found: Clean — all `SpreadsheetApp`, `Sheet`, `Range`, and `Date` methods (`getMonth()`, `getFullYear()`, `toLocaleTimeString()`) are standard built-in APIs after patching `.getmonth` to `.getMonth` on line 36.
Evidence: `cat workspace/automation/test-log.md` -> `Test 2: fail -> pass (lines 34 & 36, 9b55631)` and `Re-run in front of the trainer: Pass`.

What I will do about what I found (a fix on the sheet copy, SCS3.5's test log, or 'clean'): Align `"Reminders"`/`"REMINDERS"` sheet naming on the sheet copy and keep `workspace/automation/test-log.md` updated.
