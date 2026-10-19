# T18 live run

Prompt: `/flowguard Quick review of tests/fixtures/t18-roles/screens.md against tests/fixtures/t18-roles/requirements.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Document sharing

**Reviewed:** tests/fixtures/t18-roles/screens.md (4 frame descriptions, Read) | **Requirements:** tests/fixtures/t18-roles/requirements.md (R01 to R05, Explicit, Read) | **Mode:** Quick

## Context
Three roles (Owner, Editor, Viewer) share a document. The designs show one version of each screen: the document view with "Share" (S01, noted as the same for all roles in the mock), a share dialog offering all three roles (S02), a "Shared" toast (S03), and manage access (S04). The requirements define different Share behavior per role and a lost-access state. The single dialog matches the Owner case (R02) only; it is not assumed to cover Editors or Viewers.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | Viewer Share behavior not designed: no "Request edit access" option or owner notification | R04; S01 Share is identical for all roles; no Viewer variant | Missing from supplied evidence | Add a Viewer variant of S01 or S02 with "Request edit access" and a confirmation that the owner was notified. |
| F02 | P1 | Editor share dialog not restricted to Viewer access | R03; S02 role dropdown lists Owner, Editor, Viewer with no role-specific variant | Missing from supplied evidence | Add an Editor variant of S02 where the role is fixed to Viewer, with a short explanation. |
| F03 | P1 | "You no longer have access" state not designed | R05; no frame for removed access | Missing from supplied evidence | Add S05 shown when access is removed while the document is open, with a way to request access again or leave. |
| F04 | P3 | Share send failure and invalid email states not shown | S02 shows only the default dialog | Missing from supplied evidence (Provisional) | Add inline email validation and a send-failure message. |

Branch condition: which variant of "Share" a user sees depends on their role, but the designs do not state the condition (S01 note: same for all roles). This is recorded as Unknown and needs the role-specific variants above.

Priority notes:
- F01 to F03 P1: each is required by an explicit requirement and affects an important role-specific branch; not P0 because no data exposure is shown, and owners can still share.
- F04 P3: provisional, recoverable.

## Recommendations
1. Design per-role variants for S01 and S02 (Owner, Editor, Viewer) and label which role each frame represents.
2. Q01: When an Editor shares, can they also see the manage access list (S04)? Not stated in R03.
3. Q02: How does the owner receive an edit access request (email, in-app, both)? R04 says "notifies the owner" without a channel.

## Limitations
- Text descriptions only; transitions Inferred.
- The role-based branch condition is Unknown in the supplied designs.
- The "Shared" toast shows a placeholder for the email; no personal data appears.
- Audit date: Not provided by the user.

---

Summary: reviewed 4 frames against 5 explicit requirements. F01 P1 Viewer "Request edit access" missing, F02 P1 Editor restriction missing, F03 P1 lost-access state missing, F04 P3 share errors. Role-based branch condition is Unknown. No files were saved.
