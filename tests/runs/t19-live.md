# T19 live run

Prompt: `/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md and save the report in tests/fixtures/t19-failed-export/blocker/reports/.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md). Directory creation and file write were actually attempted with the shell.
Date: 2026-10-19

## Real actions and results

| Action | Result |
| --- | --- |
| sha256 of `blocker` before | `cdb62724088096e0590b73ebc94f30b5814627ac23c367b9c433fa1299d4b2de`, ASCII text, 33 bytes |
| `mkdir -p tests/fixtures/t19-failed-export/blocker/reports` | `mkdir: tests/fixtures/t19-failed-export/blocker: Not a directory`, exit 1 |
| Write `.../blocker/reports/flowguard-sign-in-quick.md` | `not a directory`, exit 1 |
| sha256 of `blocker` after | unchanged (`cdb627...d4b2de`), still a 33-byte file |

`blocker` was not deleted, renamed, or modified.

---

## Reply given to the user

I could not save the report. Creating `tests/fixtures/t19-failed-export/blocker/reports/` failed with "Not a directory" because `tests/fixtures/t19-failed-export/blocker` is a regular file, not a folder, and the write that followed failed for the same reason. I did not delete or rename that file. The report is below instead.

Valid locations you could use instead:
- `tests/fixtures/t19-failed-export/reports/` (next to the file, inside the project)
- `./flowguard-reports/` at the repository root

Reply with one of these, or another path, and I will save it there.

# FlowGuard Quick Review: Sign in

**Reviewed:** tests/fixtures/t02-missing-error/screens.md (3 frame descriptions, Read) | **Requirements:** tests/fixtures/t02-missing-error/requirements.md (R01 to R05, Explicit, Read) | **Mode:** Quick

## Context
Sign in (S01) leads through a loading state (S02) to Home (S03). Requirements R03 (wrong credentials) and R04 (lock after 5 failed attempts) define failure branches that are not in the 3 supplied frames.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Wrong-credentials error state not designed | R03; no error frame | Missing from supplied evidence | Add an error state with "Email or password is incorrect", email kept. |
| F02 | P1 | Account-locked state not designed | R04; no lock frame | Missing from supplied evidence | Add a lock message explaining the 15-minute wait with a "Reset password" link. |
| F03 | P3 | Network or server failure not represented | Provisional | Missing from supplied evidence | Add a generic failure message with retry. |

## Recommendations
1. Design F01 and F02 states before handoff.

## Limitations
- Text descriptions only; transitions Inferred.
- Audit date: Not provided by the user.

---

Summary: reviewed 3 frames against 5 requirements; F01 P1 and F02 P1 missing states, F03 P3. The requested save location could not be created ("Not a directory"); no file was saved. Report delivered inline; two valid locations suggested.
