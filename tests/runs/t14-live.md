# T14 live run

Prompt: `/flowguard Quick review of tests/fixtures/t14-no-gaps/screens.md against tests/fixtures/t14-no-gaps/requirements.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Change email

**Reviewed:** tests/fixtures/t14-no-gaps/screens.md (10 frame descriptions, Read) | **Requirements:** tests/fixtures/t14-no-gaps/requirements.md (R01 to R08, Explicit, Read) | **Mode:** Quick

## Context
The user starts from Account settings (S01), enters a new email and current password (S02), and submits (S04 saving). Errors (S03) cover invalid email, same email, and wrong password, each with text and an icon. After submit, "Check your new inbox" (S05) offers "Resend" and "Cancel change"; settings show a pending state (S06) while the old email stays active; verification ends in "Email updated" (S07) or "Link expired" with "Send again" (S08). A server error (S09) keeps input and offers "Try again", and cancelling shows a confirmation toast (S10).

Requirement mapping: R01 S01; R02 S02; R03 S03 (all three variants); R04 S04; R05 S05; R06 S06; R07 S07 and S08; R08 S09.

## Top findings

No significant gaps identified in the supplied evidence.

Checked: entry point, form labels, all three required inline errors with text, loading, verification pending, resend with cooldown and feedback, cancel paths from S05 and S06, success, expired link recovery, server error with preserved input, cancellation confirmation.

## Recommendations
1. Q01 (residual risk): what happens if the user opens the verification link on a device where they are signed out? The landing behavior of the email link is not shown; confirm whether sign in is required before S07.
2. Q02 (residual risk): is there a limit on "Resend" beyond the 30-second cooldown? Not stated in R05.

## Limitations
- Text descriptions only; visuals and accessibility not verified.
- Transitions are Inferred from labels and requirements; no prototype data.
- The verification email itself is outside the supplied evidence.
- S06 shows a placeholder email address; it is not reproduced here.
- Audit date: Not provided by the user.

---

Summary: reviewed 10 frames against 8 explicit requirements; no significant gaps. Two residual questions (signed-out link opening, resend limit). No files were saved.
