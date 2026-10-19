# T17 run output

Prompt: `/flowguard Quick review of tests/fixtures/t17-design-vs-req/screens.md against tests/fixtures/t17-design-vs-req/requirements.md.`
Execution method: manual execution of SKILL.md in the authoring session.

---

# FlowGuard Quick Review: Checkout (guest access)

**Reviewed:** `t17-design-vs-req/screens.md` (4 frames) | **Requirements:** R01, R02, explicit | **Mode:** Quick

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Design requires sign-in, but requirements allow guest checkout | R01 versus S02 "Sign in required" with no guest option | Verified (conflict between two supplied sources) | Either add "Continue as guest" on S02 or update R01. Category: Requirement conflict. |
| F02 | P2 | Optional post-order account creation is not designed | R02; S04 shows only the order number | Missing from supplied evidence | Add an optional "Create account" prompt on S04 for guests. |

Priority note: F01 is P1 because the design blocks a branch that R01 explicitly requires. It is not P0 because users who sign in can still complete the purchase.

## Unresolved decisions

- Q01: Was guest checkout removed on purpose (newer decision) or is S02 out of date? The requirements are not dated, so neither source was assumed to be outdated. Product owner to confirm.

## Limitations

- Static text descriptions only.
