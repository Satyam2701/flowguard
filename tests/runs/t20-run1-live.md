# T20 run 1 run output (fresh headless session)

Prompt: `/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.`
Execution: `claude -p` (Claude Code CLI, logged in with claude.ai), 2026-10-27, run from the repository root as its own fresh session `f40bf97d-6574-4555-8c82-8ea5f9026477`. Flags: `--setting-sources project,local --strict-mcp-config --mcp-config '{"mcpServers":{}}'`. No MCP servers were connected, so no Figma tool was available.
Raw output below is the session's assistant text, unchanged except that em and en dashes were replaced with hyphens to keep the repository dash-free.

---

I'll start by reading both fixture files.

Both files read cleanly. Let me load the report and page templates so the output follows the skill's conventions.

Clear picture. This is a quick review - two explicit requirements (error state and lockout) have no corresponding design frame. Let me read the HTML page template so the shareable page matches.

Both files read cleanly, requirements and designs are both present, so I can audit directly. Here's the quick review.

Now let me build the shareable page (quick mode: summary, findings, limitations only).

The publish wasn't approved, so I'll keep the report here in chat. The quick review:

# FlowGuard Quick Review: Sign in

**Reviewed:** `screens.md` (3 frames, text descriptions) | **Requirements:** `requirements.md` (R01-R05) | **Mode:** Quick

## Context
The sign-in journey: a user enters email and password (R01), sees a loading state while signing in (R02), and on success lands on Home (R05). Requirements also define two failure branches - an invalid-credentials error (R03) and an account lockout after 5 failed attempts (R04). The three supplied frames cover the Sign in form, the loading state, and Home. The two failure branches have no corresponding frame. Designs were supplied as text, so exact copy and field behavior could not be inspected directly.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | No invalid-credentials error state - R03 requires the message "Email or password is incorrect" with the email kept filled; no error frame, banner, or field message in any of the 3 frames | requirements.md R03; screens.md frames 1-3 | Missing from supplied evidence | Add a Sign in error state: inline R03 message, email retained, password cleared, button re-enabled |
| F02 | P1 | No account-lockout state after 5 failed attempts - R04 requires a lock message explaining the 15-minute lock plus a "Reset password" link; not present. (A "Forgot password?" link exists on the Sign in frame but is not the required lock message) | requirements.md R04; screens.md frames 1-3 | Missing from supplied evidence | Add a locked state: lock explanation, remaining-time indication, "Reset password" link |

Both are P1, not P0: the task is critical and the requirement explicit, but retry and "Forgot password?" give the user a partial recovery path, so neither fully blocks the critical goal. (R01, R02, R05 appear covered by the three frames.)

## Recommendations
1. Design the Sign in error state (F01) with the exact R03 copy and confirm the email field is retained after a failed attempt.
2. Design the locked state (F02) with the lock explanation, timing cue, and "Reset password" link; confirm with engineering whether the 5-attempt counter is per-session or persistent.
3. If error/lock frames exist elsewhere, supply them - they would move these from "missing" to a verified check.

## Limitations
- Static evidence only (text descriptions of 3 frames); live product behavior was not verified.
- Because designs were text, not images, field-retention-on-error and exact button states could not be inspected - R03's "keep the email filled" is an open decision to confirm in the error-state design.
- Quick mode: screen and transition tables were analyzed internally but not reported here.
- FlowGuard does not guarantee a flow is complete and does not replace usability testing.

---

**Summary:** I reviewed `screens.md` (3 frames) against `requirements.md` (R01-R05). Top findings: the required invalid-credentials error state (R03) and the account-lockout state (R04) are both missing from the supplied evidence - both P1. The happy path and loading state are covered. I couldn't confirm field-retention-on-error because designs were text-only. The shareable page wasn't published (the publish step wasn't approved) - I can save it as a self-contained `.html` file next to a report in your project instead; want me to? No files have been written.
