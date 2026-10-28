# FlowGuard Test Cases

A Markdown-based manual test suite. Each test lists its input, expected findings, expected non-findings, the actual result, a pass or fail verdict, and an explanation. Detailed pass criteria are in [expected-findings.md](expected-findings.md). Fixtures are in [fixtures/](fixtures/). Raw outputs of executed runs are in [runs/](runs/).

## How tests were executed (read this first)

The suite has been executed in two rounds. The "Actual result" and "Verdict" fields below record **round 2 (live)**. Round 1 outputs are kept unchanged for comparison.

### Round 2: live `/flowguard` invocations (current results)

- **Environment:** Claude Code desktop app session on macOS, 2026-10-19, started in the repository root after the skill existed. `flowguard` was listed as an available skill at session start.
- **Method:** each test prompt was run as a real `/flowguard` invocation through the Skill tool, which loaded `SKILL.md` with the prompt as `$ARGUMENTS`. Outputs are in `runs/tNN-live.md`.
- **Real tool actions:** T06 opened the real PNG with the Read tool and got "File does not exist." for the second file. T11 made one real call to the connected Figma MCP server (`get_metadata`), which returned `Invalid fileKey argument`. T12 summary counts were recounted by script from the tables and the diagram. T15 wrote real files with `cp -n`, parsed the JSON with `python3 -m json.tool`, cross-checked every ID between JSON and Markdown, and hashed the pre-existing file before and after. T16 searched `runs/` and `output/` for the three sensitive values with `grep`. T19 made real `mkdir` and write attempts and hashed `blocker` before and after.
- **Limits of this round, stated plainly:**
  - All 19 live runs happened one after another in **one** session, not in a fresh session per test. Later runs could be influenced by earlier ones.
  - The headless CLI (`claude -p`) on this machine still reports `loggedIn: false`, so per-test fresh sessions were not possible.
  - The executing session read `expected-findings.md` before running the tests (to plan the work), so the runs are not blind to the pass criteria. Grading was done by the same session that produced the outputs.
  - Live Mermaid diagrams were checked by rule and by edge counts, not rendered: `mmdc` is not installed, and the browser pane only shows local files as static snapshots.
  - The session ran separately from the session where the skill was built, but with the same tools and setup.

### Round 1: author-executed manual runs (superseded, kept for reference)

- The session where the skill was built could not load the skill mid-session (`Unknown skill: flowguard`) and the headless CLI was not logged in, so it executed 19 tests by following `SKILL.md` by hand. Outputs are in `runs/tNN-run.md` (T02 is `runs/t02-run-a.md`). Two defects found in round 1 (T12 count mismatch, T15 incomplete JSON) were fixed in `SKILL.md` before round 2.

## Summary

| Test | Name | Round 2 live verdict | Round 1 (author-executed) |
| --- | --- | --- | --- |
| T01 | Complete linear journey | Pass | Pass |
| T02 | Missing required error state | Pass | Pass |
| T03 | Missing retry or recovery path | Pass | Pass |
| T04 | Designs without a PRD | Pass | Pass |
| T05 | Feature idea without designs | Pass | Pass |
| T06 | Incomplete screenshot | Pass | Pass |
| T07 | Potentially disconnected screen | Pass | Pass |
| T08 | Duplicate screenshots | Pass | Pass |
| T09 | Optional state not represented | Pass | Pass |
| T10 | Contradictory requirements | Pass | Pass |
| T11 | Unavailable Figma integration | Pass (access-failure variant in round 2; "no Figma tool" variant in round 4) | Pass, variant only |
| T12 | Large flow with multiple branches | Pass (counts consistent; round 1 defect did not recur) | Pass with defect, fixed |
| T13 | Accessibility uncertainty | Pass | Pass |
| T14 | No significant gaps | Pass | Pass |
| T15 | Report and diagram export | Pass (JSON complete; Mermaid not rendered) | Pass with defect, fixed |
| T16 | Sensitive information | Pass | Pass |
| T17 | Design conflicts with requirements | Pass | Pass |
| T18 | Conditional paths and permissions | Pass | Pass |
| T19 | Failed file export | Pass | Pass |
| T20 | Repeated execution | Pass (round 4, two fresh sessions) | Not executed |
| T21 | Shareable page published by default | Pass (round 3, live) | n/a |
| T22 | No publishing tool available | Pass (round 4, fresh session) | n/a |

Totals for round 2: 19 tests executed as live `/flowguard` invocations, 19 passed, 0 failed. T20 and the planned T11 variant were not executed. All 19 runs shared one session; see the limits above.

Round 3 (2026-10-27, after the shareable page feature was added): T21 executed live and passed. T01 to T19 were not re-run after this change; the change only adds Step 6 and renumbers later steps.

Round 4 (2026-10-27, fresh headless sessions): once the Claude Code CLI was logged in, T20 (two runs), T22 and the planned T11 variant were each run with `claude -p` as a separate fresh session from the repository root, with no MCP servers connected. All passed. Each session was independent of the others and of the authoring session, but grading was done by the authoring session. Totals across all rounds: 22 of 22 tests have a recorded live pass; no test has failed.

---

## T01: Complete linear journey

- **Input:** `fixtures/t01-linear-complete/` (6 frames, R01 to R06). Prompt: Quick review of screens against requirements.
- **Expected findings:** none above P3.
- **Expected non-findings:** error, loading, already subscribed, and failure states are not reported missing.
- **Actual result:** "No significant gaps identified in the supplied evidence." All six requirements mapped to frames 1 to 6. Two open questions (confirmation email scope, subscribing another address). [runs/t01-live.md](runs/t01-live.md)
- **Verdict:** Pass.
- **Explanation:** All Must items hold; no states reported missing; no padding.

## T02: Missing required error state

- **Input:** `fixtures/t02-missing-error/` (3 frames, R01 to R05).
- **Expected findings:** wrong-credentials error missing (P1); account-lock state missing (P1 or P2).
- **Expected non-findings:** no P0; no live-product claims.
- **Actual result:** F01 P1 wrong-credentials error (Missing from supplied evidence), F02 P1 account-locked state, F03 P3 provisional network failure. Limitations state that missing evidence does not mean the live product lacks the states. [runs/t02-live.md](runs/t02-live.md)
- **Verdict:** Pass.

## T03: Missing retry or recovery path

- **Input:** `fixtures/t03-missing-retry/` (4 frames, R01 to R04).
- **Expected findings:** P1 missing retry and alternate method; cart preservation Unknown.
- **Expected non-findings:** failure screen not reported missing.
- **Actual result:** F01 P1 missing "Try again" and "Use another payment method"; Q01 cart preservation Unknown; explicit note that the failure screen S03 exists and is not missing. [runs/t03-live.md](runs/t03-live.md)
- **Verdict:** Pass.

## T04: Designs without a PRD

- **Input:** `fixtures/t04-no-prd/` (4 frames, no requirements). Prompt says no PRD and to proceed with defaults.
- **Expected findings:** provisional journey with `PR` IDs; location permission, search no results, validation, save failure; edit or delete as a question.
- **Expected non-findings:** no PRD citation; no P0.
- **Actual result:** Standard report. Defaults for the 3 essential questions recorded as A01 to A03; PR01 to PR06 all Provisional; F01 P2 location permission denied, F02 P2 search no results, F03 P2 validation and save failure, F04 and F05 P3; Q01 edit or delete saved addresses. Counts in the summary match the tables. [runs/t04-live.md](runs/t04-live.md)
- **Verdict:** Pass.

## T05: Feature idea without design evidence

- **Input:** `fixtures/t05-idea-only/brief.md`.
- **Expected findings:** planning format, states to design, open questions.
- **Expected non-findings:** no Verified screen inventory; no audit findings.
- **Actual result:** Planning report with the "not an audit" banner, proposed journey (sign up, verification pending, approved, rejected and resubmit, bank account, first listing), proposed Mermaid flow, 12 states to design, 4 open questions. No S IDs, no P0 to P3 findings. [runs/t05-live.md](runs/t05-live.md)
- **Verdict:** Pass.

## T06: Incomplete screenshot

- **Input:** `fixtures/t06-cropped/shipping-details-cropped.png` (real PNG, top cropped) and a non-existent `shipping-details-page2.png`.
- **Expected findings:** visible content described; cropped area Unknown; missing file reported.
- **Expected non-findings:** title, header back control, or name field not reported missing.
- **Actual result:** PNG read and described (masked phone field edge, pincode with "Pincode must be 6 digits", optional delivery instructions, order total, "Continue to payment", "Back to cart"). Title, header or back control, and fields above the phone number classified Unknown. Read tool error for page2 reported with a request for the correct path. Pincode error Verified. One P3 item about the button state; one open question on whether the pincode text is error or helper text. [runs/t06-live.md](runs/t06-live.md)
- **Verdict:** Pass.
- **Note:** the open question about error versus helper text sits beside the Verified classification of the pincode error. Both are defensible from the image, but a reviewer may want to confirm the run should not have hedged.

## T07: Potentially disconnected screen

- **Input:** `fixtures/t07-disconnected/` (6 frames, R01 to R04).
- **Expected findings:** Upgrade plan potentially disconnected, low priority, alternatives considered.
- **Expected non-findings:** Accept invite not flagged (email link entry point).
- **Actual result:** Accept invite explicitly not flagged because of R03; Upgrade plan F03 P3 "potentially disconnected" with three alternatives considered and a question on whether it belongs to the flow; invite form errors F01 and expired invite F02 at P2. [runs/t07-live.md](runs/t07-live.md)
- **Verdict:** Pass.

## T08: Duplicate screenshots

- **Input:** `fixtures/t08-duplicates/screens.md` (6 image descriptions).
- **Expected findings:** img_03 deduplicated into img_02.
- **Expected non-findings:** img_04 and img_05 not merged.
- **Actual result:** S02 lists img_02 and img_03 as aliases; img_04 (S03, error) and img_05 (S04, empty with Save disabled) kept as distinct states. Two P3 items. [runs/t08-live.md](runs/t08-live.md)
- **Verdict:** Pass.
- **Limitation:** duplicate detection was tested on text descriptions, not actual image comparison.

## T09: Optional state not represented

- **Input:** `fixtures/t09-optional-state/` (5 frames, R01 to R05).
- **Expected findings:** none above P3.
- **Expected non-findings:** Remember me, password toggle, social sign-in not treated as required.
- **Actual result:** "No significant gaps identified." Optional conveniences recorded only as an open question (Q01), with a note that a password toggle would be P3 at most if adopted. [runs/t09-live.md](runs/t09-live.md)
- **Verdict:** Pass.

## T10: Contradictory requirements

- **Input:** `fixtures/t10-contradictory/` (PRD, ticket, 3 frames).
- **Expected findings:** three conflicts with both sources; design alignment noted; decision requested.
- **Expected non-findings:** no silent choice.
- **Actual result:** Conflict log Q01 to Q03 (5 vs 10 minutes, 30 vs 60 seconds, 3 vs 5 attempts) with both sources and a "Follows: PRD" column; F01 P1 requirement conflict; F02 P1 lock state and F03 P2 expired state missing; explicit statement that no source is chosen. [runs/t10-live.md](runs/t10-live.md)
- **Verdict:** Pass.

## T11: Unavailable Figma integration

- **Input:** Figma URL with fictional key `FAKEFILEKEY123`.
- **Planned condition:** no Figma tool connected.
- **Actual condition:** a Figma MCP server was connected in the live session too, so the planned condition could not be reproduced. The run made one real `get_metadata` call, which returned `Invalid fileKey argument` (the tool requires a key of at least 22 characters).
- **Expected findings:** clear statement of what failed; no screens described; fallback options; no credential requests.
- **Actual result:** Stated the exact error and why; described no screens; asked for a corrected link, sharing with the connected account, or exports; offered a provisional planning checklist; requested no credentials and changed no settings. [runs/t11-live.md](runs/t11-live.md)
- **Verdict:** Pass for the access-failure variant.
- **Round 4 (no Figma tool variant):** run in a fresh `claude -p` session with no MCP servers. It stated that no Figma tool was connected, retrieved and described no screens, did not ask for credentials, asked for exports, a working link or descriptions, and offered a provisional onboarding checklist clearly labelled as not an audit. [runs/t11-no-figma-live.md](runs/t11-no-figma-live.md) **Verdict: Pass.** Two observations led to small SKILL.md clarifications afterwards: the session also tried to fetch the Figma URL with a web-fetch tool (permission was not granted), and it skipped the shareable page because nothing had been audited, a case Step 6 did not cover.

## T12: Large flow with multiple branches

- **Input:** `fixtures/t12-large-flow/` (18 frames, R01 to R09).
- **Expected findings:** P1 out-of-stock (R06) and UPI timeout (R07); branches mapped; readable diagram.
- **Expected non-findings:** card failure, promo invalid, COD disabled not reported missing.
- **Actual result:** F01 P1 out-of-stock, F02 P1 UPI timeout, F03 P2 expired promo copy, F04 P3 no cancel while waiting for UPI. Guest and signed-in branches and all three payment methods mapped. Card failure, promo invalid, and COD disabled listed as present. Script recount: 34 diagram edges and 34 transition rows (28 Inferred, 6 Missing from supplied evidence), 20 nodes and 20 screen rows (18 Verified, 2 Missing), matching the executive summary. [runs/t12-live.md](runs/t12-live.md)
- **Verdict:** Pass.
- **Explanation:** the round 1 defect (summary count did not match the diagram) did not recur after the Step 7 fix. The diagram was not rendered in this round.

## T13: Accessibility uncertainty

- **Input:** `fixtures/t13-accessibility/screens.md`.
- **Expected findings:** placeholder-only labels, color-only errors, low contrast, small icon button as potential concerns.
- **Expected non-findings:** no compliance claim; no P0.
- **Actual result:** F01 P1 color-only error (requirement-backed, justified as a blocking barrier), F02 P2 placeholder-only labels, F03 P2 low-contrast success text (ratio calculated from the stated hex values), F04 P2 small icon-only submit; recommends screen reader, keyboard, and contrast checker testing; explicit statement that no compliance claim is made. [runs/t13-live.md](runs/t13-live.md)
- **Verdict:** Pass.

## T14: No significant gaps

- **Input:** `fixtures/t14-no-gaps/` (10 frames, R01 to R08).
- **Expected findings:** none above P3.
- **Expected non-findings:** no manufactured findings.
- **Actual result:** "No significant gaps identified", requirement-to-frame mapping, list of what was checked, two residual questions. [runs/t14-live.md](runs/t14-live.md)
- **Verdict:** Pass.

## T15: Report and diagram export

- **Input:** example inputs; save Markdown, Mermaid, and JSON to `tests/output/t15/`. Before the run, `flowguard-password-reset-standard.md` was recreated with exactly `EXISTING FILE: MUST NOT BE OVERWRITTEN`. The round 1 `-v2` files were also present.
- **Expected findings:** files written with versioned names; existing file untouched; JSON parses; Mermaid renders.
- **Actual result:** `-v3` `.md`, `.mmd`, and `.json` written (the next free version); sentinel file sha256 unchanged and content unchanged; `-v2` hashes unchanged; `python3 -m json.tool` parsed the JSON; every requirement, screen, transition, finding, and question ID in the JSON appears in the Markdown (11, 9, 16, 5, 3); 16 Mermaid edges match 16 transition rows; exact paths reported only after `cp -n` succeeded. Mermaid was checked by rule, not rendered. [runs/t15-live.md](runs/t15-live.md), [output/t15/](output/t15/)
- **Verdict:** Pass.
- **Explanation:** the round 1 defect (JSON contained 3 of 18 transitions) did not recur. The Must item "renders if a renderer is available" was satisfied by rule checks because no renderer was available to the run.

## T16: Sensitive information in artifacts

- **Input:** `fixtures/t16-sensitive/screens.md` with a fake token, email, and phone number.
- **Expected findings:** unmasked token, no confirmation on regenerate, real-looking personal data.
- **Expected non-findings:** sensitive values never echoed.
- **Actual result:** F01 P0 unmasked token, F02 P1 regenerate without confirmation, F03 P2 real-looking personal data in the audit log mock; values shown as `[REDACTED: ...]`. `grep -rnF` for each of the three values over `runs/` and `output/` found 0 matches. [runs/t16-live.md](runs/t16-live.md)
- **Verdict:** Pass.

## T17: Design conflicts with requirements

- **Input:** `fixtures/t17-design-vs-req/`.
- **Expected findings:** P1 conflict (forced sign-in versus guest checkout); R02 missing; decision requested.
- **Actual result:** F01 P1 Requirement conflict, F02 P2 post-order account step missing, Q01 asking whether the change was intentional; explicit statement that neither source is assumed outdated. [runs/t17-live.md](runs/t17-live.md)
- **Verdict:** Pass.

## T18: Conditional paths and permissions

- **Input:** `fixtures/t18-roles/`.
- **Expected findings:** Viewer and Editor share variants missing; lost-access state missing; unknown branch condition.
- **Actual result:** F01 P1 Viewer "Request edit access" missing, F02 P1 Editor restriction missing, F03 P1 lost-access state missing, F04 P3 share errors; role-based branch condition recorded as Unknown; explicit statement that the single dialog is not assumed to cover all roles. [runs/t18-live.md](runs/t18-live.md)
- **Verdict:** Pass.

## T19: Failed file export

- **Input:** save request into `fixtures/t19-failed-export/blocker/reports/` where `blocker` is a file.
- **Expected findings:** real error reported; report delivered inline; valid location suggested; no saved path claimed.
- **Actual result:** `mkdir` failed with "Not a directory" (exit 1); write failed (exit 1); `blocker` sha256 unchanged; reply explained the error, gave the report inline, suggested two valid locations, and claimed no saved path. [runs/t19-live.md](runs/t19-live.md)
- **Verdict:** Pass.

## T20: Repeated execution with identical inputs

- **Input:** T02 prompt run twice in two separate fresh sessions.
- **Actual result (round 4):** two separate fresh `claude -p` sessions ran the identical T02 prompt. Both reported F01 P1 (no wrong-credentials error, R03) and F02 P1 (no account-locked state, R04), both classified Missing from supplied evidence, both with the same reason for not using P0. Neither reported the optional P3 network-failure item that earlier rounds included, which the pass criteria allow. Quick mode did not list screen IDs in either run. Both sessions tried to publish a page; the headless permission mode refused it, and both kept the report in chat, offered a local `.html` file, and wrote nothing into the project. [runs/t20-run1-live.md](runs/t20-run1-live.md), [runs/t20-run2-live.md](runs/t20-run2-live.md)
- **Verdict:** Pass.
- **Earlier note:** this needs two independent `/flowguard` sessions. The live round ran in one session started by another session, and that session cannot start further sessions; the headless CLI is not logged in. Informal observation only, not counted as a result: the live T02 output and the round 1 T02 output (different sessions, but round 1 was not a `/flowguard` invocation) report the same findings F01 P1, F02 P1, F03 P3 with the same screen IDs S01 to S03.

## T21: Shareable report page published by default

- **Input:** the T02 prompt, run as a live `/flowguard` invocation in the Claude desktop app, where an `Artifact` publishing tool is available. The prompt did not mention pages.
- **Expected findings:** see [expected-findings.md](expected-findings.md#t21-shareable-report-page-published-by-default).
- **Actual result:** the Markdown report was produced (F01 P1, F02 P1, F03 P3), then a Quick-mode page was built from `html-report-template.html` and published privately. The tool returned a link and Version 1. The reply gave the link, said the page is private, and pointed to the Share menu. No sharing was claimed. [runs/t21-live.md](runs/t21-live.md)
- **Verdict:** Pass.
- **Additional template check:** the same template was filled with the full Boring Rituals Standard audit (5 findings, 13 screen rows, 24 transition rows) and published. A local `.html` version of it was opened in a browser. Mermaid 11.4.1 rendered the diagram with 20 nodes and 16 edges, matching the report, with no syntax error and no horizontal scroll. The first harness attempt failed because the harness picked the wrong line, not because of the template.
- **Not verified:** how the published pages render inside claude.ai, including the host's own Mermaid rendering.

## T22: No publishing tool available

- **Input:** any FlowGuard prompt in an environment without a page-publishing tool (for example the Claude Code terminal).
- **Actual result (round 4):** fresh `claude -p` session with the publishing tool removed (`--disallowedTools Artifact`). The report (F01 P1, F02 P1) stayed in chat. The reply said no page-publishing tool was available and offered to save the report and a self-contained `.html` file. `git status` showed nothing written to the project. [runs/t22-live.md](runs/t22-live.md)
- **Verdict:** Pass.
- **Related observation:** in T20's two sessions the publishing tool existed but headless mode refused permission. Both handled it as "publishing failed": they kept the report in chat, offered a local file, and wrote nothing into the project. The page drafts went only to each session's temporary scratch folder.

---

## Re-running the suite

In a fresh Claude Code session started in the repository root:

```bash
claude
```

Then run each prompt listed at the top of the run files, for example:

```text
/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.
```

Compare the output with [expected-findings.md](expected-findings.md) and record the result here. For T15, recreate `tests/output/t15/flowguard-password-reset-standard.md` with the sentinel text first. For T11's planned variant, run in a session with no Figma MCP server connected. For T20, run the T02 prompt in two separate sessions and compare. For stronger independence than round 2, use one fresh session per test.

Headless option (requires a logged-in CLI):

```bash
claude -p "/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md."
```
