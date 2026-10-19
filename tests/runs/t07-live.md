# T07 live run

Prompt: `/flowguard Quick review of tests/fixtures/t07-disconnected/screens.md against tests/fixtures/t07-disconnected/requirements.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Team invite

**Reviewed:** tests/fixtures/t07-disconnected/screens.md (6 frame descriptions, Read) | **Requirements:** tests/fixtures/t07-disconnected/requirements.md (R01 to R04, Explicit, Read) | **Mode:** Quick

## Context
An admin invites a teammate from Team settings (S01) through an invite modal (S02), sees a confirmation toast (S03), and the invitee later accepts through an email link (S04) and lands on the Team dashboard (S05). S04 has no inbound link from another frame, which is expected: R03 says it is opened from the email link, so it is not disconnected. S06 "Upgrade plan" has no inbound link from any frame or requirement.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P2 | Invite form has no validation or failure states (invalid email, already a member, send failure) | R02; S02 shows only the default modal | Missing from supplied evidence (Provisional requirement PR01) | Add inline errors on S02 for invalid email and existing member, and a send-failure message that keeps the entered email. |
| F02 | P2 | Expired or already-used invite link not handled | R03; S04 shows only the valid invite | Missing from supplied evidence (Provisional requirement PR02) | Add an "Invite expired or no longer valid" state with a way to request a new invite. |
| F03 | P3 | "Upgrade plan" (S06) is potentially disconnected from this flow | S06 has no inbound transition in the frames or requirements | Inferred | Confirm whether S06 belongs to this flow, for example as a seat-limit branch from "Send invite", or move it to its own flow. |

Priority notes:
- F01 P2: provisional requirements; the admin can retry, so friction rather than a block.
- F02 P2: provisional; invitee can ask the admin to resend.
- F03 P3: alternatives considered before flagging: an email or notification deep link, a seat-limit branch when inviting beyond the plan, a navigation entry owned by Billing settings. None is stated in the supplied evidence, so the screen is flagged only as potentially disconnected, at low priority.

## Recommendations
1. Q01: Does "Upgrade plan" appear when the team reaches a seat limit during invite? If yes, add the branch from S02 and its condition; if not, remove S06 from this flow's file.
2. Add F01 and F02 error states before handoff.
3. Confirm whether the invitee must sign in or sign up before S04 (not stated in R03).

## Limitations
- Text descriptions only; no prototype links, so all transitions are Inferred except where requirements name both ends (R01 to R04).
- The email itself is outside the supplied evidence.
- Audit date: Not provided by the user.

---

Summary: reviewed 6 frames against 4 explicit requirements. "Accept invite" is reached via email link (R03) and is not flagged. "Upgrade plan" flagged as potentially disconnected at P3 with alternatives listed. Two P2 provisional error-state gaps. No files were saved.
