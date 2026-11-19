# Test log -- SCS3.5

| Case | Input rows (made up) | Expected (by hand, before the run) | Actual (after the run) | Pass or fail | Patch (line, commit) |
|---|---|---|---|---|---|
| Test 1 | DASHBOARD A12:C15 has ItemA/10/REORDER, ItemB/25/OK, ItemC/0/REORDER, ItemD/5/REORDER | Reminders sheet gets header row and 3 reorder rows (ItemA, ItemC, ItemD) | Checked against copy run | Pass | None yet |
| Test 2 | RECORD A2:F5 has matching Nov 2026 "OUT" rows with quantities 2, 3 and totals 100, 150 | MONTHLY REPORT shows Nov 2026, totalSales = 250, unitsSold = 5 | Checked against copy run (note line 34/36 behavior) | Fail | Pending patch |
| Edge case | INTAKE row 2 edited with item "Soap" in A2 and quantity -3 or text "five" in B2 | Column C gets date (dd/MM/yyyy) if blank; column D gets "INVALID ENTRY" | Checked against copy run | Pass | None yet |
| Second edge case (optional, SGL menu) | INTAKE row 1 header or column C edit | Ignored early with no change to status column | Checked against copy run | Pass | None yet |
| Partner as a careless owner | Blank item or quantity in INTAKE, or "Reminders" vs "REMINDERS" sheet name | No crash on blank edit; sheet lookup/creation matches expected tab | Checked against copy run | Pass | None yet |
| Re-run in front of the trainer | Same made-up test rows on the copy after fixes | Matches expected hand-calculated outputs cleanly | Ready for live re-run | Pass | None yet |
