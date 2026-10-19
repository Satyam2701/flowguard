# T13 run output

Prompt: `/flowguard Quick review of tests/fixtures/t13-accessibility/screens.md. Include accessibility and usability concerns.`
Execution method: manual execution of SKILL.md in the authoring session.

---

# FlowGuard Quick Review: Contact form

**Reviewed:** `t13-accessibility/screens.md` (3 frames, text) | **Requirements:** inline note (submit name, email, message; errors shown; success confirmed) | **Mode:** Quick

## Context

Form (S01), error state (S02), sent confirmation (S03). The main path and both required outcome states exist. Concerns below are potential accessibility and usability risks identified from the descriptions. Static designs cannot prove or disprove compliance with WCAG or any other standard.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Errors are indicated by red border only, with no error text | S02; requirement says errors must be shown | Verified (description states no text) | Add specific error text under each field and an icon, not color alone. |
| F02 | P2 | Inputs use placeholder text only, no visible labels | S01 | Verified | Add persistent visible labels; keep placeholders as hints at most. |
| F03 | P2 | Success message may have low contrast (#BBBBBB on #FFFFFF) | S03 | Inferred (potential concern; contrast not measured by a tool) | Check with a contrast checker; darken the text. |
| F04 | P2 | Icon-only 28x28 px submit button may be hard to tap and lacks a visible text label | S01 | Inferred (potential target-size and labeling concern) | Use a text button "Send" or enlarge the target and provide an accessible name. |

Priority notes: F01 is P1 because the requirement says errors must be shown, and color-only feedback leaves users who cannot perceive red without the information. Accessibility concerns F02 to F04 are capped at P2 per the rubric.

## Recommendations

1. Fix F01 and F02 before handoff.
2. Verify F03 and F04 with a contrast checker, keyboard navigation, and a screen reader on a build.

## Limitations

- No compliance claim is made. Focus order, screen reader announcements, and keyboard behavior cannot be assessed from static descriptions.
