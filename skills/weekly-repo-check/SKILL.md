---
name: weekly-repo-check
description: Use when verifying repository cleanliness, test status, and secret hygiene at the end of a work session.
---

1. Change to `~/scs/projects/scs-track`.
2. Run `git status -s` to confirm no untracked secrets or `.env` files are staged.
3. Run `cd workspace/stock-tools && node --test` to verify all unit tests pass.
4. Confirm the current branch and unpushed commit count with `git status -sb`.

Done when all unit tests pass (`fail 0`) and no secrets or `.env` files appear in tracked status.
Ran: 2026-11-24 — passed 6/6 tests in workspace/stock-tools and verified clean tracked tree.
