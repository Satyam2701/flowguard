# T02 run output (run A)

Prompt: `/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.`
Execution method: manual execution of SKILL.md in the authoring session.

---

# FlowGuard Quick Review: Sign in

**Reviewed:** `t02-missing-error/screens.md` (3 frames) | **Requirements:** `t02-missing-error/requirements.md` (R01 to R05, explicit) | **Mode:** Quick

## Context

The user signs in with email and password (S01), sees a loading state (S02), and lands on Home (S03). The supplied frames cover only the success path. The fixture states no other frames were supplied.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | No wrong-credentials error state | R03; frames 1 to 3 reviewed | Missing from supplied evidence | Add S04 "Sign in: incorrect credentials" with the R03 message and the email kept filled. |
| F02 | P1 | No account-locked state after 5 failed attempts | R04; frames 1 to 3 reviewed | Missing from supplied evidence | Add S05 "Account locked" explaining the 15-minute lock with a "Reset password" link. |
| F03 | P3 | No network or server failure state | Provisional (PR01: sign-in calls a server) | Missing from supplied evidence | Add a generic failure banner with "Try again", or reference the system error pattern. |

Priority notes:
- F01, P1: explicit requirement; important branch; user can retry blindly but gets no feedback. Not P0: the user is not harmed and a workaround (Forgot password) exists.
- F02, P1: explicit requirement; locked users cannot tell why sign-in fails and cannot reach the reset link that R04 requires.
- F03, P3: provisional requirement only.

## Recommendations

1. Design S04 and S05 before handoff (F01, F02).
2. Confirm whether the lock message shows remaining time (Q01).

## Limitations

- Static text descriptions only; live behavior is not verified.
- "Forgot password?" destination is outside this flow and was not reviewed.
