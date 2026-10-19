# T08 live run

Prompt: `/flowguard Quick review of tests/fixtures/t08-duplicates/screens.md.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

---

# FlowGuard Quick Review: Profile edit

**Reviewed:** tests/fixtures/t08-duplicates/screens.md (text descriptions of 6 exported images, Read; the images themselves were not supplied) | **Requirements:** statements inside the same file: R01 view and edit profile name and photo; R02 saving can fail (Explicit) | **Mode:** Quick

## Context
The user views their profile, edits name or photo, and saves; saving can fail. Six images map to five distinct screens or states:

| ID | Screen or state | Aliases | Classification |
| --- | --- | --- | --- |
| S01 | Profile view | img_01.png "Profile" | Verified |
| S02 | Profile edit, filled | img_02.png "Profile edit"; img_03.png "Profile edit" (likely duplicate: same layout, content, and state) | Verified |
| S03 | Profile edit, save error | img_04.png "Profile edit - error" | Verified |
| S04 | Profile edit, empty name with Save disabled | img_05.png "Profile edit (1)" | Verified |
| S05 | Profile saved | img_06.png "Profile - saved" | Verified |

img_03 is treated as a duplicate of img_02 and shares ID S02. img_04 and img_05 share the layout of img_02 but show different states (error banner; empty field with disabled Save), so they keep their own IDs.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P3 | No reason shown for disabled Save when the name is empty | S04: Save disabled, no helper or error text described | Missing from supplied evidence (Provisional) | Add helper text such as "Name is required" under the empty field. |
| F02 | P3 | Photo change sub-flow not shown (picker, upload progress, upload failure) | R01; S02 shows "Change photo" only | Missing from supplied evidence | Add photo picker, uploading, and upload-failed states, or confirm they are covered by a shared component. |

No P0 to P2 gaps identified. The save failure required by R02 is covered by S03 with a retry message.

## Recommendations
1. Remove img_03 from the export set or confirm it is intentionally identical.
2. Address F01 and F02 if the photo flow is in scope.
3. Q01: Does "Cancel" with unsaved changes ask for confirmation? Not shown (Unknown).

## Limitations
- Duplicate detection was based on the text descriptions of the images, not on a comparison of the image files, which were not supplied.
- The profile mock contains a sample person name; it is not reproduced here.
- Transitions are Inferred from labels; no prototype data.
- Audit date: Not provided by the user.

---

Summary: 6 images reviewed as descriptions; img_03 deduplicated into S02, img_04 and img_05 kept as distinct states S03 and S04. Two P3 items. No files were saved.
