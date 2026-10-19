# T13 live run

Prompt: `/flowguard Quick review of tests/fixtures/t13-accessibility/screens.md. Include accessibility and usability concerns.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Contact form

**Reviewed:** tests/fixtures/t13-accessibility/screens.md (3 frame descriptions, Read) | **Requirements:** statements in the same file: R01 submit name, email, message; R02 errors must be shown; R03 success must be confirmed (Explicit) | **Mode:** Quick

## Context
A visitor fills a three-field contact form (S01), sees an error state (S02) for invalid fields, and a sent confirmation (S03). All three states exist. The concerns are about how errors, labels, the submit control, and the confirmation are presented. Static descriptions cannot prove or disprove accessibility; the items below are potential concerns to verify with real testing.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Errors are shown by red border only, with no error text | R02; S02 "No error text is shown" | Verified (description states it) | Add a text message under each invalid field that says what is wrong, plus an icon; keep the border as a secondary cue. |
| F02 | P2 | Inputs use placeholder text only, with no visible labels | S01 | Verified (description); impact Inferred | Add persistent visible labels above each field; keep placeholders as examples only. |
| F03 | P2 | Success text may have low contrast | S03: grey text #BBBBBB on #FFFFFF; calculated ratio from these hex values is about 1.9 to 1 | Inferred (potential concern) | Use a darker text color and verify with a contrast checker. |
| F04 | P2 | Submit is a small icon-only button | S01: 28x28 px paper plane icon, no text | Inferred (potential concern) | Add a visible "Send" text label or an accessible name, and enlarge the touch target. |

Priority notes:
- F01 P1: R02 requires errors to be shown, and color is the only feedback, which is a blocking barrier for users who cannot perceive the red border; the rubric allows above P2 for accessibility in this case. Not P0: users who see the border can still recover.
- F02 to F04 P2: potential accessibility concerns from static evidence are capped at P2.

No compliance claim is made. These designs are not stated to be compliant or non-compliant with WCAG or any other standard.

## Recommendations
1. Fix F01 before handoff.
2. Verify F02 to F04 with a screen reader, keyboard-only navigation, and a contrast checker on the built screens.
3. Q01: Is a loading state shown while the form is sending? Not in the supplied frames (Unknown); a disabled send button during submit would also prevent duplicate messages.

## Limitations
- Text descriptions only; actual colors, sizes, and focus behavior were not inspected beyond the stated values.
- Contrast was calculated from stated hex values, not measured on a render.
- Audit date: Not provided by the user.

---

Summary: reviewed 3 frames. F01 P1 color-only error feedback (requirement-backed); F02 to F04 P2 potential concerns (placeholder-only labels, low-contrast success text, small icon-only submit). No compliance claim. No files were saved.
