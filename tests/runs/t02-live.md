# T02 live run

Prompt: `/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Sign in

**Reviewed:** tests/fixtures/t02-missing-error/screens.md (3 frame descriptions, Read) | **Requirements:** tests/fixtures/t02-missing-error/requirements.md (R01 to R05, Explicit, Read) | **Mode:** Quick

## Context
A returning user signs in with email and password (S01 "Sign in"), sees a loading state (S02 "Sign in - loading"), and lands on Home (S03). The happy path (R01, R02, R05) is covered. The requirements also define two failure branches, wrong credentials (R03) and account lock after 5 failed attempts (R04), and neither appears in the 3 supplied frames. The fixture states that no other frames were supplied. Assumption A01: the "Forgot password?" link on S01 leads to a separate reset flow outside this review.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Wrong-credentials error state not designed | R03; frames S01 to S03 contain no error state | Missing from supplied evidence | Add S04 "Sign in - error" showing "Email or password is incorrect" with the email field still filled and the password cleared. |
| F02 | P1 | Account-locked state not designed | R04; no lock message or "Reset password" link in any frame | Missing from supplied evidence | Add S05 "Sign in - locked" explaining the 15-minute lock, with a "Reset password" link. |
| F03 | P3 | Network or server failure during sign in not represented | No requirement; S02 has no failure exit | Missing from supplied evidence (Provisional requirement PR01) | Add a generic failure message with retry on S01, or confirm a global error pattern covers it. |

Priority notes:
- F01 P1: required by R03; the failed sign-in branch is important and has no designed feedback; not P0 because the user can retry or use "Forgot password?".
- F02 P1: required by R04; locked users get no explanation or recovery path in the supplied designs; not P0 because a reset link exists on S01 as a workaround.
- F03 P3: provisional requirement only, no explicit rule; friction with retry as an obvious workaround.

## Recommendations
1. Design S04 (wrong credentials, R03) and S05 (account locked, R04) before handoff.
2. Decide whether the lock message shows remaining time and whether attempts-remaining warnings appear before the lock (not stated in R04).
3. Confirm the global network-error pattern for F03.

## Limitations
- Evidence is text descriptions of 3 frames; visual details were not verified.
- Transitions S01 to S02 to S03 are Inferred from frame names and R02, R05; no prototype data was supplied.
- Missing states are missing from the supplied evidence only; this does not mean the live product lacks them.
- Audit date: Not provided by the user.

---

Summary: reviewed 3 frames against 5 explicit requirements. Top findings: F01 P1 wrong-credentials error missing (R03), F02 P1 account-locked state missing (R04), F03 P3 provisional network failure. Not verified: visuals, prototype links. No files were saved.
