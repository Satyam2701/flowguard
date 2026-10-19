# T01 run output

Prompt: `/flowguard Quick review of tests/fixtures/t01-linear-complete/screens.md against tests/fixtures/t01-linear-complete/requirements.md.`
Execution method: manual execution of SKILL.md in the authoring session (see test-cases.md, "How tests were executed").

---

# FlowGuard Quick Review: Newsletter signup

**Reviewed:** `t01-linear-complete/screens.md` (text description of 6 frames) | **Requirements:** `t01-linear-complete/requirements.md` (R01 to R06, explicit) | **Mode:** Quick

## Context

A visitor subscribes from the site footer by entering an email. All six requirements map to a designed frame: default (S01, R01), validation error (S02, R02), loading (S03, R03), success (S04, R04), already subscribed (S05, R05), and failure with retry and preserved input (S06, R06). Transitions are inferred from frame names because no prototype data was supplied.

## Top findings

No significant gaps identified in the supplied evidence.

## Recommendations

1. Q01 (open question, not a finding): R04 says "Check your inbox to confirm". If confirmation is double opt-in, the confirmation email and the landing page after clicking it (including an expired confirmation link) are outside the supplied frames. Confirm whether they belong to this flow.

## Limitations

- Designs are text descriptions; visual properties (contrast, target size) were not assessed.
- All transitions (S01 to S03, S03 to S04, S05, or S06, S06 to S03 via Try again, S01 to S02) are Inferred from frame names.
- This review does not verify live behavior.
