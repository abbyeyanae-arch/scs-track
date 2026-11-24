Line 1: Committed the SCS3.6 starting state in `workspace/stock-tools` before modifying any file so every diff has a clean baseline.
Line 2: Audited both the stock tool and my SCS3.5 script across auth, edge cases, wrong versions, and invented libraries with reproducible command evidence.
Line 3: Reproduced the `<` vs `<=` reorder boundary bug with a failing unit test on `scs3.6-patch` before patching `reorder.js` and reverting an unrequested `BEYOND` comment.
Line 4: Removed the planted `SMS_API_KEY` from `send-sms.js` by hand so it reads `process.env.SMS_API_KEY` and added `.env` to `.gitignore`.
Line 5: Created `AGENTS.md`, `skills/weekly-repo-check/SKILL.md`, `scs3.6-agent`, and the cost card using scoped branches and `--no-ff` merges.
Line 6: Least carefully checked edge-case CSV inputs on my own patch (blank `In stock` cells and quoted commas in `parseCsv`); adding tests for `Cement 50 kg` (blank stock) and `"Nails, 3 inch"` would tell me immediately.
