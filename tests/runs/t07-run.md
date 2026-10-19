# T07 run output

Prompt: `/flowguard Quick review of tests/fixtures/t07-disconnected/screens.md against tests/fixtures/t07-disconnected/requirements.md.`
Execution method: manual execution of SKILL.md in the authoring session.

---

# FlowGuard Quick Review: Team invite

**Reviewed:** `t07-disconnected/screens.md` (6 frames) | **Requirements:** `t07-disconnected/requirements.md` (R01 to R04) | **Mode:** Quick

## Context

Admin flow: Team settings (S01) to Invite modal (S02) to Invite sent toast (S03). Invitee flow: email link (external) to Accept invite (S04) to Team dashboard (S05). S04 has no inbound transition from S01 to S03, but R03 names the email link as its entry point, so it is reachable through an alternate entry point (T05 Inferred: external email to S04). It is not flagged.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P2 | No error states for the invite form (invalid email, already a member, already invited) | R02; S02 only shows default | Missing from supplied evidence; requirement Provisional (PR01) | Add inline errors on S02. |
| F02 | P2 | No state for an expired or revoked invite link | R03; S04 only shows the valid case | Missing from supplied evidence; Provisional (PR02) | Add "Invite no longer valid" with a way to contact the admin. |
| F03 | P3 | S06 "Upgrade plan" is potentially disconnected | No frame, requirement, or entry point leads to S06. Considered: email link, deep link, notification, other features. None documented. | Inferred | Confirm whether S06 belongs to this flow (for example a seat-limit upsell when inviting) or remove it from this file. |

Priority notes: F03 is P3 because it may belong to another flow; if it is meant as a seat-limit branch, the missing condition would become a P2 gap.

## Unresolved decisions

- Q01: Is S06 shown when the team reaches its seat limit during invite? If yes, define the condition on S02.
- Q02: What does the invitee see if they are not signed in or have no account when opening the link?

## Limitations

- Text descriptions only; transitions Inferred from names and requirements.
