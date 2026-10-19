# T18 run output

Prompt: `/flowguard Quick review of tests/fixtures/t18-roles/screens.md against tests/fixtures/t18-roles/requirements.md.`
Execution method: manual execution of SKILL.md in the authoring session.

---

# FlowGuard Quick Review: Document sharing

**Reviewed:** `t18-roles/screens.md` (4 frames) | **Requirements:** R01 to R05, explicit | **Mode:** Quick

## Context

The designs show one Share button for all roles (S01) and one Share dialog offering Owner, Editor, and Viewer (S02). The branch condition "which role is viewing" is not represented, so the transition S01 to S02 has condition **Unknown** for Editor and Viewer.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Viewer share behavior is not designed | R04; S01 shows Share for all roles; no "Request edit access" state | Missing from supplied evidence | Add a Viewer variant: Share opens "Request edit access", plus a "Request sent" confirmation. |
| F02 | P1 | Editor share dialog offers roles Editors may not grant | R03; S02 lists Owner, Editor, Viewer | Verified (dialog content) | Add an Editor variant of S02 limited to Viewer, or explain disabled options. |
| F03 | P1 | "You no longer have access" state is missing | R05 | Missing from supplied evidence | Add the state for users whose access is removed while the document is open. |
| F04 | P3 | Owner notification for access requests is not shown | R04 says the owner is notified | Missing from supplied evidence | Show the notification and the owner's approve or decline flow, or reference where it lives. |

Priority notes: F01 to F03 are P1 because each explicit role rule is either unrepresented or contradicted, and users of those roles would hit undefined behavior. F04 is P3 because it may belong to a separate notifications flow.

## Unresolved decisions

- Q01: Should "Owner" ever be grantable from the dialog (ownership transfer), or only from Manage access?

## Limitations

- Static text descriptions only; role-specific variants may exist outside the supplied frames.
