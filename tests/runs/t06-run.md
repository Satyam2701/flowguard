# T06 run output

Prompt: `/flowguard Quick review of tests/fixtures/t06-cropped/shipping-details-cropped.png and tests/fixtures/t06-cropped/shipping-details-page2.png. Requirement: from shipping details, the user continues to payment; pincode must be 6 digits.`
Execution method: manual execution of SKILL.md in the authoring session. The PNG was opened with the Read tool; the second file read returned "File does not exist".

---

# FlowGuard Quick Review: Shipping details

**Reviewed:** `shipping-details-cropped.png` (read, partially visible) | **Not usable:** `shipping-details-page2.png` (file does not exist at that path) | **Requirements:** user statement (R01 continue to payment, R02 pincode 6 digits) | **Mode:** Quick

## Context

The screenshot is cropped at the top. Visible from the top edge: the lower part of a phone field (masked value), Pincode field with value "5600" and the inline error "Pincode must be 6 digits", an optional Delivery instructions field, "Order total: 1,249", a "Continue to payment" action, and a "Back to cart" link.

| ID | Element | Classification |
| --- | --- | --- |
| S01 | Shipping details with pincode error | Verified (visible in PNG) |
| S01 top area: screen title, header, back control, fields above phone | Unknown (cropped) |
| S02 | Shipping details default (no error) | Unknown (not supplied; may be on page 2) |

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P3 | Unclear whether "Continue to payment" is disabled while the pincode error is shown | PNG shows the action in the same style as the rest of the screen | Inferred | Specify whether the action is disabled or re-validates on tap. |

R02 is covered: the pincode error state is Verified. R01 is covered for the visible action; its destination is not shown (Inferred).

## Unresolved decisions

- Q01: Please supply the uncropped screenshot. The title, header, and first field are not visible and were not assessed.
- Q02: `shipping-details-page2.png` was not found. Check the path or supply the file.

## Limitations

- Content above the crop line is Unknown, not missing.
- One referenced file could not be read; findings cover only the visible screenshot.
