# Severity Rubric and Evidence Classifications

## Contents

- [Evidence classifications](#evidence-classifications)
- [Confidence](#confidence)
- [Priority levels](#priority-levels)
- [Priority decision rules](#priority-decision-rules)
- [Priority caps](#priority-caps)
- [Justification format](#justification-format)
- [Examples](#examples)

## Evidence classifications

Every screen, transition, and finding gets exactly one classification.

| Classification | Meaning | How to write it |
| --- | --- | --- |
| **Verified** | Directly supported by accessible data or explicit evidence. | State precisely what was verified, for example "Verified: error banner visible on page 3 of onboarding.pdf". |
| **Inferred** | A plausible interpretation based on visual or contextual evidence. | Explain the inference, for example "Inferred: 'Continue' on S02 likely leads to S03 because frames are ordered and S03 title matches". |
| **Missing from supplied evidence** | An expected element was not found after reasonable inspection of the supplied material. | Say where you looked. Never claim it is absent from the live product. |
| **Unknown** | Evidence is insufficient to tell either way. | Explain what would resolve it, for example "Unknown: bottom of S04 is cropped; need full screenshot". |

Requirement status is separate from evidence classification:

- **Explicit**: stated in a supplied requirement or by the user.
- **Provisional**: inferred by FlowGuard from domain conventions or designs. Must be confirmed by the team.

A finding can be "Missing from supplied evidence" (observation) against a "Provisional" requirement (expectation). Report both.

## Confidence

Use High, Medium, or Low only when it adds meaning. Never use numerical probabilities.

- **Observation confidence**: how sure you are about what the evidence shows (for example a low-resolution screenshot lowers it).
- **Requirement confidence**: how sure you are the behavior is actually expected (explicit requirement is High; domain convention is Medium; speculative is Low).

When the two differ, state both, for example "Observation: High. Requirement: Medium (provisional)."

## Priority levels

| Level | Name | Definition |
| --- | --- | --- |
| **P0** | Critical | A confirmed or strongly evidenced issue that blocks a critical user goal or creates a serious user-impacting risk (data loss, security or privacy exposure, financial harm, legal or safety risk). |
| **P1** | High | An important required task or branch is blocked or significantly impaired, for example a required error or recovery path is not designed. |
| **P2** | Medium | A meaningful usability or completeness issue that causes friction or extra recovery effort but has a workaround. |
| **P3** | Low | A minor improvement with limited user impact. |

## Priority decision rules

Work through these factors for each finding:

1. **Task importance**: is the affected task critical to the user goal or the business (sign in, payment, data submission), or secondary?
2. **User impact**: blocked, harmed, confused, or mildly inconvenienced?
3. **Workaround**: can the user still succeed another way?
4. **Evidence strength**: classification and requirement status.
5. **Known constraints**: anything the user said about scope, phase, or platform.

Suggested mapping:

| Impact | Explicit requirement, Verified or Missing-from-evidence | Provisional requirement | Inferred or Unknown observation |
| --- | --- | --- | --- |
| Blocks critical goal or serious risk | P0 | P1 | P1 at most, or an open question |
| Blocks important branch | P1 | P1 or P2 | P2 at most |
| Friction with workaround | P2 | P2 or P3 | P3 or open question |
| Minor | P3 | P3 | Open question |

## Priority caps

- **P0** requires an explicit requirement or a self-evident serious risk (security, privacy, data loss, money) **and** Verified or Missing-from-evidence observation. Never assign P0 on Inferred, Unknown, or speculative grounds.
- A finding based only on **Unknown** evidence is not a finding. Move it to Unresolved decisions.
- A **polish or optional** state is at most P3.
- **Accessibility concerns from static evidence** are at most P2 unless an explicit requirement or a blocking barrier is visible (for example the only feedback for an error is color).
- Do not raise priority because of assumed frequency. Do not invent frequency, reach, or probability data.

## Justification format

Write one line per finding:

> P1: Required by R04; user cannot recover from a failed payment without restarting checkout; no workaround in the supplied designs; Missing from supplied evidence (all 9 frames reviewed).

## Examples

| Situation | Priority | Why |
| --- | --- | --- |
| PRD requires a "wrong password" error; no error state appears in any of the supplied login frames. | P1 | Explicit requirement, important branch, Missing from supplied evidence. Not P0 because the user can retry or reset the password. |
| Checkout design shows the full card number on the review screen. | P0 | Verified, serious privacy and financial risk, self-evident. |
| No loading state shown for a 1-second profile save; not mentioned in requirements. | P3 | Provisional, minor impact. |
| Bottom of the payment screen is cropped; cannot see if a "Pay" button exists. | Not a finding | Unknown. Add to Unresolved decisions and request full screenshot. |
| "Remember me" checkbox not present; no requirement mentions it. | Open question or P3 | Optional convenience state. |
| Screen S09 has no inbound link, but the PRD mentions an email deep link to it. | Not a finding | Alternate entry point explains it; record transition as Inferred. |
