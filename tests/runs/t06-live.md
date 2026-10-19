# T06 live run

Prompt: `/flowguard Quick review of tests/fixtures/t06-cropped/shipping-details-cropped.png and tests/fixtures/t06-cropped/shipping-details-page2.png. Requirement: from shipping details, the user continues to payment; pincode must be 6 digits.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md). The PNG was opened with the Read tool and rendered as an image. The Read tool returned "File does not exist." for shipping-details-page2.png.
Date: 2026-10-19

---

# FlowGuard Quick Review: Shipping details

**Reviewed:** shipping-details-cropped.png (Partially read: image is cropped at the top) | shipping-details-page2.png (Unreadable: file does not exist at that path) | **Requirements:** User statements R01 "from shipping details, the user continues to payment", R02 "pincode must be 6 digits" (Explicit) | **Mode:** Quick

## Context
One cropped screenshot of a shipping details form (S01). Visible from top to bottom: the lower edge of a phone number field containing a masked placeholder value, a "Pincode" field containing 4 digits with the helper or error text "Pincode must be 6 digits" below it, an optional "Delivery instructions" field, "Order total: 1,249", a "Continue to payment" button, and a "Back to cart" link. The top of the screen is cut off, so the screen title, any header or back control, and any fields above the phone number (for example name or address lines) are Unknown, not missing.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P3 | Unclear whether "Continue to payment" is disabled or allowed to submit while the pincode is invalid | S01: button appearance does not show a disabled style in the image; R02 | Inferred (Observation Medium) | Specify the button state when validation fails, and focus the pincode field on submit if it stays enabled. |

Verified, not a finding: the pincode validation error required by R02 is visible on S01 ("Pincode must be 6 digits" under a 4-digit value). Verified: "Continue to payment" exists for R01; its destination (payment) is Inferred from the label because no second screen was available.

No other significant gaps identified in the readable evidence.

## Recommendations
1. Supply shipping-details-page2.png at the correct path, or confirm its name; the Read tool reported that the file does not exist at tests/fixtures/t06-cropped/shipping-details-page2.png.
2. Supply an uncropped screenshot of the shipping details screen so the title, header, back control, and upper fields can be reviewed.
3. Q01: Is "Pincode must be 6 digits" an error state or permanent helper text? The text is not visibly styled as an error in the image (Unknown). Confirm with the designer.

## Limitations
- Top of S01 is cropped; everything above the phone field is Unknown and was not judged.
- Second file could not be read, so the payment screen and anything it shows were not reviewed.
- Static image only; no prototype data, so transitions are Inferred.
- A phone number appears in masked form in the image; no personal data is reproduced here.
- Audit date: Not provided by the user.

---

Summary: reviewed 1 cropped PNG (partially read); the second PNG does not exist at the given path and was requested again. Pincode 6-digit error is Verified. One P3 item about the button state. Cropped top area is Unknown. No files were saved.
