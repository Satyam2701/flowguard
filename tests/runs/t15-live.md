# T15 live run

Prompt: `/flowguard Audit examples/sample-screen-inventory.md against examples/sample-requirements.md. Save Markdown, Mermaid, and JSON to tests/output/t15/.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md). The report content was built once as a data structure in a scratch script so the Markdown, Mermaid, and JSON exports come from the same source; the files were written to a scratch folder, validated, and then copied into the repository with `cp -n` (no overwrite).
Date: 2026-10-19

## Pre-run state

- `tests/output/t15/flowguard-password-reset-standard.md` was recreated with exactly `EXISTING FILE: MUST NOT BE OVERWRITTEN`. sha256 `6cf58164269abb45de61a4d873c2f9ba0f7c6d987b5d9f95e335b0639094a469`.
- `-v2` files from the author-executed run already existed in the folder, so the next free version was `-v3`. `ls flowguard-password-reset-standard-v3.*` returned no matches before writing.

## Actions and real results

| Action | Result |
| --- | --- |
| Read both example inputs | Read |
| `python3 -m json.tool` on the JSON (scratch copy and repository copy) | Parsed without error both times |
| Cross-check: every requirement, screen, transition, finding, and question ID in the JSON appears in the Markdown | 11, 9, 16, 5, 3 IDs; none missing |
| Mermaid edges vs transition table rows | 16 and 16 |
| `.mmd` content identical to the diagram block in the `.md` | True |
| Mermaid render | Not rendered. `mmdc` is not installed; an attempt to render through a local HTML page in the browser pane failed because the pane shows local files only as static snapshots. Checked by the template rules instead. |
| `cp -n` of `.md`, `.mmd`, `.json` | exit 0 for all three |
| sha256 of the pre-existing file after the run | `6cf58164...a469`, unchanged; content still `EXISTING FILE: MUST NOT BE OVERWRITTEN` |
| `-v2` files | Hashes unchanged |

## Files written

- `tests/output/t15/flowguard-password-reset-standard-v3.md`
- `tests/output/t15/flowguard-password-reset-standard-v3.mmd`
- `tests/output/t15/flowguard-password-reset-standard-v3.json`

## Chat summary given to the user

Reviewed 7 frames against 11 explicit requirements (Standard mode). Top findings: F01 P1 expired or used reset link state missing (R06); F02 P1 server error on password update missing (R09); F03 P2 password rule errors cover length only (R07); F04 and F05 P3. Not verified: prototype connections, the reset email, Mermaid rendering. A file named `flowguard-password-reset-standard.md` already existed, so it was left untouched and all three exports were saved with the matching `-v3` suffix at the paths above. The JSON parsed with `python3 -m json.tool`; the Mermaid was checked by rule, not rendered.

The full report is in [../output/t15/flowguard-password-reset-standard-v3.md](../output/t15/flowguard-password-reset-standard-v3.md).
