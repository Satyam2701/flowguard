# T17 live run

Prompt: `/flowguard Quick review of tests/fixtures/t17-design-vs-req/screens.md against tests/fixtures/t17-design-vs-req/requirements.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Guest checkout

**Reviewed:** tests/fixtures/t17-design-vs-req/screens.md (4 frame descriptions, Read) | **Requirements:** tests/fixtures/t17-design-vs-req/requirements.md (R01, R02, Explicit, Read) | **Mode:** Quick

## Context
The requirements allow guests to check out without an account (R01) and offer optional account creation after the order (R02). The designs go Cart (S01), then a "Sign in required" screen (S02) with only "Sign in" and "Create account", then Payment (S03) and Order confirmed (S04). The design and the requirements disagree. The supplied evidence does not show whether the design or the requirement reflects the current decision, so neither is assumed to be outdated.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Design forces sign in or account creation, but R01 allows guest checkout | R01; S02 "No guest option" | Verified (Requirement conflict) | If R01 stands, add "Continue as guest" on S02 leading to S03. If the design is intentional, update R01 and record the decision. |
| F02 | P2 | Optional post-order "Create account" step not designed | R02; S04 shows only the order number | Missing from supplied evidence | Add an optional "Create account" prompt on S04 for guests, skippable. |

Priority notes:
- F01 P1: the design blocks a branch that R01 explicitly requires; not P0 because users who sign in or register can still buy.
- F02 P2: explicit requirement, but optional for the user and does not block purchase.

## Recommendations
1. Q01: Was removing guest checkout an intentional design change? Suggested owner: product owner. Until answered, treat R01 as current and F01 as open.
2. Design the guest branch and the post-order account offer, or update the requirements to match the design.

## Limitations
- Text descriptions only; transitions Inferred from frame order.
- Which source is newer is Unknown; neither file is dated.
- Audit date: Not provided by the user.

---

Summary: reviewed 4 frames against 2 explicit requirements. F01 P1 requirement conflict (forced sign in vs guest checkout, R01); F02 P2 post-order account creation missing (R02). Decision requested on whether the design change was intentional. No files were saved.
