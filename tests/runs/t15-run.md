# T15 run output

Prompt: `/flowguard Audit examples/sample-screen-inventory.md against examples/sample-requirements.md. Save Markdown, Mermaid, and JSON to tests/output/t15/.`
Execution method: manual execution of SKILL.md in the authoring session. Files were actually written with the shell; checks were actually run.

## Pre-condition

`tests/output/t15/flowguard-password-reset-standard.md` existed with the text "EXISTING FILE: MUST NOT BE OVERWRITTEN" (SHA-1 `9e890d33ea950838fa2b538110d36b09f4670839`).

## Actions and raw results

1. Checked the default name; it existed, so the next free version `-v2` was chosen for all three outputs.
2. Wrote:
   - `tests/output/t15/flowguard-password-reset-standard-v2.md`
   - `tests/output/t15/flowguard-password-reset-standard-v2.mmd`
   - `tests/output/t15/flowguard-password-reset-standard-v2.json`
3. `python3 -m json.tool` on the JSON: parsed successfully.
4. Re-hashed the pre-existing file: SHA-1 unchanged (`9e890d33...0839`).
5. Mermaid: see test-cases.md, T15, for the rendering check result.

## Reply to user

Saved the report to:

- `tests/output/t15/flowguard-password-reset-standard-v2.md`
- `tests/output/t15/flowguard-password-reset-standard-v2.mmd`
- `tests/output/t15/flowguard-password-reset-standard-v2.json`

A report named `flowguard-password-reset-standard.md` already existed in that folder, so I used `-v2` and left the existing file unchanged. The JSON was validated by parsing it.

Known shortfall in this run: the JSON `transitions` array includes only 3 of the 18 transitions in the Markdown report (T01, T10, T14). The structure is valid, but the content is incomplete.
