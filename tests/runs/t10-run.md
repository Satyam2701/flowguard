# T10 run output

Prompt: `/flowguard Quick review of tests/fixtures/t10-contradictory/screens.md against tests/fixtures/t10-contradictory/prd.md and tests/fixtures/t10-contradictory/ticket.md.`
Execution method: manual execution of SKILL.md in the authoring session.

---

# FlowGuard Quick Review: OTP verification

**Reviewed:** `screens.md` (3 frames) | **Requirements:** `prd.md` (PRD v2, R01 to R04) and `ticket.md` (OTP-142 acceptance criteria) | **Mode:** Quick

## Context

The user enters a 6-digit OTP (S01), may enter a wrong code (S02), and reaches Verified (S03). The two requirement sources disagree on three rules. Neither source states it supersedes the other, so no source was chosen.

## Requirement conflicts

| ID | Rule | PRD v2 | Ticket OTP-142 | Design shows |
| --- | --- | --- | --- | --- |
| Q01 | OTP validity | 5 minutes (R02) | 10 minutes | "Code expires in 05:00" (follows PRD) |
| Q02 | Resend wait | 30 seconds (R03) | 60 seconds countdown | "Resend OTP in 0:30" (follows PRD) |
| Q03 | Attempt limit | 3 wrong attempts (R04) | 5 wrong attempts | "2 attempts left" after one error, implying 3 (follows PRD) |

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Conflicting OTP rules between PRD v2 and ticket OTP-142 | Q01 to Q03 | Verified (both sources read) | Product owner to confirm the governing source; update the other source and the design copy if needed. |
| F02 | P1 | No lockout state after the final wrong attempt | R04 and ticket both require a 10-minute lock | Missing from supplied evidence | Add a locked state with remaining time and an alternative (contact support or try later). |
| F03 | P2 | No expired-code state | R02 and ticket both define expiry | Missing from supplied evidence | Add "Code expired" with "Resend OTP". |

## Limitations

- The design was not assumed correct because it matches one source; the decision belongs to the product owner.
