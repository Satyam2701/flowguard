# T10 live run

Prompt: `/flowguard Quick review of tests/fixtures/t10-contradictory/screens.md against tests/fixtures/t10-contradictory/prd.md and tests/fixtures/t10-contradictory/ticket.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: OTP verification

**Reviewed:** tests/fixtures/t10-contradictory/screens.md (3 frame descriptions, Read) | **Requirements:** prd.md "OTP verification PRD v2" (R01 to R04, Read) and ticket.md "OTP-142" acceptance criteria (TK1 to TK3, Read); both Explicit and in conflict | **Mode:** Quick

## Context
The user enters a 6-digit OTP (S01), may see a wrong-code state (S02), and reaches "Verified" (S03). The PRD and the ticket disagree on three business rules. Neither source states a date or which supersedes the other, so no source was chosen as truth.

Conflict log:

| ID | Rule | PRD v2 | Ticket OTP-142 | Design shows | Follows |
| --- | --- | --- | --- | --- | --- |
| Q01 | OTP validity | 5 minutes (R02) | 10 minutes | "Code expires in 05:00" (S01) | PRD |
| Q02 | Resend wait | 30 seconds (R03) | 60 seconds countdown | "Resend OTP in 0:30" (S01) | PRD |
| Q03 | Attempts before lock | 3 wrong attempts (R04) | 5 wrong attempts | "Incorrect code. 2 attempts left." after one wrong entry (S02), which implies 3 | PRD (Inferred) |

Both sources agree the lock lasts 10 minutes.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | PRD and ticket conflict on OTP validity, resend wait, and attempt limit; the design follows the PRD | R02 to R04 vs OTP-142; S01, S02 | Verified (conflict between supplied sources) | Product owner decides which source governs; update the other source and, if the ticket wins, the copy on S01 and S02. |
| F02 | P1 | Verification-locked state not designed | R04 and OTP-142 both require a 10-minute lock | Missing from supplied evidence | Add S04 "Too many attempts" explaining the wait, with a timer or the time it unlocks. |
| F03 | P2 | Expired-code state not designed | R02 and OTP-142 both define expiry | Missing from supplied evidence | Add an expired state on S01 when the timer reaches zero, prompting "Resend OTP". |

Priority notes:
- F01 P1: Requirement conflict on an important branch; engineering cannot build timers and limits without a decision.
- F02 P1: both sources require the lock; locked users have no designed explanation.
- F03 P2: explicit rule, but "Resend OTP" offers a workaround.

## Recommendations
1. Decide Q01 to Q03 (suggested owner: product owner). Default if no answer: none is chosen; FlowGuard does not pick a source silently. If the team says to proceed, the most specific or most recent source should be recorded as an assumption.
2. Design F02 and F03 states.
3. Confirm resend limits (not stated in either source).

## Limitations
- Text descriptions only; transitions Inferred.
- Which source is newer is Unknown from the files; neither has a date.
- Audit date: Not provided by the user.

---

Summary: reviewed 3 frames against a PRD and a ticket. Three conflicts logged with both sources (5 vs 10 minutes, 30 vs 60 seconds, 3 vs 5 attempts); the design follows the PRD. F01 P1 conflict needs a decision; F02 P1 lock state and F03 P2 expired state missing. No files were saved.
