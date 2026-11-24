# Patch Card -- SCS3.6

One real bug from the audit.  The fix, not a rewrite.  The spec and the test come before the prompt.

The bug, in one sentence: `reorderList` in `workspace/stock-tools/reorder.js` used `<` instead of `<=`, omitting items whose stock equals their reorder level.
Which check found it (auth, edge case, wrong version, invented library): edge case
The spec for the fix, one thing: Change the comparison in `reorderList` in `workspace/stock-tools/reorder.js` so rows where `In stock` is less than or equal to (`<=`) `Reorder at` are included.
The test that shows the bug (input -> expected): `grinding discs 115 mm,Gas and welding supplier,20,20,pieces` -> `reorderList` returns `["grinding discs 115 mm"]` instead of `[]`.
The prompt, word for word: In `workspace/stock-tools/reorder.js`, update `reorderList` so items with `In stock` equal to `Reorder at` are included (`<=` instead of `<`), without changing any other function.

## The Diff, Read Whole

Every line the patch changed.  A line the spec did not ask for is marked BEYOND in the second column.

| Line | What the patch changed | In the spec? | My adjustment |
|---|---|---|---|
| `reorder.js:22` | Changed comment to `// Items at or below their reorder level (inclusive boundary).` | BEYOND | Reverted comment back to original wording so only the bug line changed. |
| `reorder.js:24` | Changed `<` to `<=` in `parseInt(r["In stock"], 10) <= parseInt(r["Reorder at"], 10)` | Yes | Kept as patched; verified with boundary unit test. |

Tests before the patch: 5 pass, 1 fail (`lists items equal to their reorder level` failed with `[] !== ['grinding discs 115 mm']`).
Tests after the patch: 6 pass, 0 fail (`node --test reorder.test.js`).
Tests after my adjustment: 6 pass, 0 fail (`node --test reorder.test.js`).
Commits on scs3.6-patch (the test, the patch, the adjustment): 3 commits (`Add failing test...`, `Patch reorderList...`, `Adjust patch and fill SCS3.6 patch card`).

## Receipt

1. Label: AI-assisted, directed by abighael_eyanae
2. Tool and tier: Gemini (free/web assistant tier, 2026-11-24)
3. Spec and prompt: above, word for word
4. Tests or checks: `cd workspace/stock-tools && node --test reorder.test.js` -> 6 pass, 0 fail
5. Rights line: not checked
6. Cost: 0 KSh (estimate: ~45 tokens in, ~30 tokens out on free web tier)
