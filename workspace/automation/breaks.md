# The nine breaks -- SCS3.5

| # | Break | Cannot happen because ... (line) | Found -- patched at (line, commit) |
|---|---|---|---|
| 1 | The header row counted | onEdit skips row === 1 at line 66; checkStock reads A12:C15 at line 6; generateMonthlyReport starts at A2 at line 27 | Checked against lines 6, 27, 66 |
| 2 | The wrong tab | checkStock reads "DASHBOARD" (line 5) and writes "Reminders"/"REMINDERS" (lines 10, 12); onEdit checks sheet.getName() !== "INTAKE" (line 61) | Watch line 10 ("Reminders") vs line 12 ("REMINDERS") during testing |
| 3 | The number read as text | onEdit checks typeof quantity === "number" at line 73; generateMonthlyReport coerces with Number(... \|\| 0) at lines 40 and 42 | Checked at lines 40, 42, 73 |
| 4 | The boundary | checkStock checks fixed range A12:C15 (line 6) and row[2] === "REORDER" (lines 8-9); onEdit checks column > 2 (line 66) and quantity > 0 (line 73) | Checked at lines 6, 8-9, 66, 73 |
| 5 | The overwrite | reminders.clearContents() (line 14) and report.clearContents() (line 48) clear values before writing; onEdit only sets dateCell if dateCell.getValue() === "" (line 77) | Checked at lines 14, 48, 77 |
| 6 | The invented piece | Functions checkStock (line 3), generateMonthlyReport (line 24), and onEdit (line 57) are verified by running them on the test copy, not node --check alone | To be verified by live runs on the copy |
| 7 | The silent assumption | Line 36 checks row[0] && typeof row[0].getmonth === "function" before calling methods | Found bugs at line 34 (single quotes) and line 36 (.getmonth case) |
| 8 | The trigger that runs too often | onEdit (line 57) exits early on non-INTAKE sheets (line 61), row 1 or column > 2 (line 66), and empty item/quantity (line 71) | Verify installable/simple trigger settings in Apps Script editor |
| 9 | The confident wrong answer | Caught by comparing hand-calculated expected answers in test-log.md against actual sheet output | Will record patch line and commit hash when patched |
