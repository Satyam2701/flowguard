# T04 run output

Prompt: `/flowguard Review tests/fixtures/t04-no-prd/screens.md. I don't have a PRD. Help me establish the expected journey and identify missing states. Proceed with defaults if you need to.`
Execution method: manual execution of SKILL.md in the authoring session.

---

No requirements were supplied, so this review builds a **provisional** journey. The user said to proceed, so the essential questions below are answered with stated defaults.

| Question | Default used |
| --- | --- |
| Who is the user and what is the goal? | A signed-in customer adding a new delivery address during checkout or from the address list (A01). |
| Platform? | Mobile app (A02, inferred from map pin and chips). |
| Is location permission requested in this flow? | Yes, the map screen implies current-location use (A03). |

# FlowGuard Audit: Add delivery address (Standard, provisional)

## Expected journey (provisional)

| ID | Provisional requirement | Basis |
| --- | --- | --- |
| PR01 | From the address list, the user can add a new address. | S01 "+ Add new address" |
| PR02 | The user sets the location on a map or by search. | S02 |
| PR03 | The user enters address details; required fields are validated. | S03 fields, Landmark marked optional |
| PR04 | The saved address appears selected in the list. | S04 |
| PR05 | The user can leave the flow without saving. | Domain convention |

These are not stakeholder decisions. Confirm them with the product owner.

## Screen inventory

| ID | Name | Category | Classification |
| --- | --- | --- | --- |
| S01 | Address list | Entry | Verified |
| S02 | Add address: map | Form | Verified |
| S03 | Add address: details | Form | Verified |
| S04 | Address list: updated | Success | Verified |
| S05 | Location permission denied | Permission | Missing from supplied evidence |
| S06 | Search: no results | Empty | Missing from supplied evidence |
| S07 | Details: validation errors | Error | Missing from supplied evidence |
| S08 | Save failed | Error | Missing from supplied evidence |

## Findings

| ID | Priority | Finding | Classification | Fix |
| --- | --- | --- | --- | --- |
| F01 | P2 | No state for location permission denied or location unavailable | Missing from supplied evidence; requirement Provisional (A03) | Add a fallback that centers the map on search and explains how to enable location. |
| F02 | P2 | No validation error state for required fields (House/Flat, Street) | Missing from supplied evidence; Provisional (PR03) | Add inline errors and keep entered values. |
| F03 | P2 | No error or retry if saving fails | Missing from supplied evidence; Provisional | Add an error banner with "Try again" and preserved input. |
| F04 | P3 | No "no results" state for area search | Missing from supplied evidence; Provisional | Add an empty state suggesting moving the pin. |
| F05 | P3 | No back or cancel action visible on S02 and S03 | Unknown whether a system back control exists | Confirm navigation pattern; add "Back" if not provided by the platform header. |

Priority note: all findings are capped at P2 because requirements are provisional and the main path works.

## Unresolved decisions

- Q01: Can users edit or delete saved addresses here, or elsewhere?
- Q02: Is there a serviceability check (address outside delivery area)? If yes, an "We don't deliver here yet" state is needed.
- Q03: What happens with "Other" label: is a custom name required?

## Limitations

- No PRD: the expected journey is provisional (PR01 to PR05, A01 to A03).
- Text descriptions only; transitions are Inferred from frame order.
