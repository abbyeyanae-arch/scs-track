# Restore test log -- the practice business (2026-11-18)

A backup nobody has restored from is a hope. 'It worked' is not an entry: say what did not come back,
or what you checked to be sure nothing is missing.

| # | Restore | What I deleted or suspended | How I restored it | How long | What came back | What did not come back |
|---|---|---|---|---|---|---|
| 1 | The suspended user, restored whole | Suspended practice test user account | Admin console > Users > Unsuspend account | 2 minutes | User profile, active status, and group memberships restored successfully | External sharing permissions required manual re-application |
| 2 | A file from the shared drive's trash | Deleted spreadsheet from Shared Drive | Shared Drive trash > Restore file | 1 minute | File metadata, content, and team access permissions fully restored | File shortcut links in external personal drives remained broken |
| 3 | A user's deleted file, restored by the admin | User deleted file from My Drive | Admin console > Drive > Restore data | 3 minutes | File restored to user's root folder | Sharing links generated prior to deletion required regeneration |
| 4 | One file from the export | Extracted single file from Takeout archive | Extracted via tar and uploaded to Shared Drive | 5 minutes | Raw file content and original file attributes | Version history and active collaborator comments were not preserved |
