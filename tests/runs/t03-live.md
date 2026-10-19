# T03 live run

Prompt: `/flowguard Quick review of tests/fixtures/t03-missing-retry/screens.md against tests/fixtures/t03-missing-retry/requirements.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Checkout payment

**Reviewed:** tests/fixtures/t03-missing-retry/screens.md (4 frame descriptions, Read) | **Requirements:** tests/fixtures/t03-missing-retry/requirements.md (R01 to R04, Explicit, Read) | **Mode:** Quick

## Context
The shopper reviews the order and taps "Pay" (S01 "Review order"), sees "Processing" (S02), and ends on either "Order confirmed" (S04) or "Payment failed" (S03). The failure screen exists and shows a reason, which satisfies part of R03. Its only action is "Back to home", so the recovery options R03 requires are not present.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Payment failure screen has no retry or alternate payment method | R03; S03 "Payment failed" offers only "Back to home" | Missing from supplied evidence | Add "Try again" (returns to S02 with the same method) and "Use another payment method" (returns to S01 payment selection) to S03; keep "Back to home" as a secondary action. |

Priority note: F01 P1: required by R03; a failed payment is an important branch of a critical task and the user's only designed exit abandons checkout; not P0 because the user can still restart checkout from home if the cart persists.

The failure screen itself is present (S03, Verified) and is not reported as missing.

## Recommendations
1. Add both recovery actions from R03 to S03 (F01).
2. Show the user that the cart is preserved, for example on S03 or after "Back to home".
3. Q01: Cart preservation after failure (R03) cannot be verified from static designs. Unknown. Validate with engineering or a prototype that the cart is intact after S03 and after "Back to home".

## Limitations
- Text descriptions of 4 frames; visuals not verified.
- Transitions are Inferred from frame order and R01 to R04; no prototype data.
- Backend behavior such as cart persistence is Unknown from static evidence.
- Audit date: Not provided by the user.

---

Summary: reviewed 4 frames against 4 explicit requirements. Top finding: F01 P1 missing "Try again" and "Use another payment method" on the payment failure screen (R03). Not verified: cart preservation (Q01, Unknown). No files were saved.
