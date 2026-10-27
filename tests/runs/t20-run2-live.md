# T20 run 2 run output (fresh headless session)

Prompt: `/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.`
Execution: `claude -p` (Claude Code CLI, logged in with claude.ai), 2026-10-27, run from the repository root as its own fresh session `db4cf65d-f96d-49f0-9256-8aab318b9749`. Flags: `--setting-sources project,local --strict-mcp-config --mcp-config '{"mcpServers":{}}'`. No MCP servers were connected, so no Figma tool was available.
Raw output below is the session's assistant text, unchanged except that em and en dashes were replaced with hyphens to keep the repository dash-free.

---

I'll start by reading the two fixture files, then run the FlowGuard review.

Both files read cleanly. Let me load the templates and rubric I need for a quick-mode report and page.

Both fixtures read cleanly. This is a quick review, so I'll run all six stages internally and report the top findings, then publish a shareable page. The material is a fictional fixture, so no confidentiality concern.

Here's the review.

---

# FlowGuard Quick Review: Sign in

**Reviewed:** `tests/fixtures/t02-missing-error/screens.md` (3 frames, text description) | **Requirements:** `tests/fixtures/t02-missing-error/requirements.md` (5 explicit) | **Mode:** Quick

## Context

The flow is email/password sign in: the user enters credentials, sees a loading state, and lands on Home on success (R01, R02, R05). The requirements also mandate two failure paths - an incorrect-credentials error that keeps the email filled (R03) and an account lockout after 5 failed attempts with a 15-minute lock message and a reset link (R04). The supplied designs cover only the happy path: Sign in, Sign in - loading, and Home. Neither failure state appears in the three frames, and the file states "No other frames were supplied."

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | No incorrect-credentials error state | R03; all 3 supplied frames reviewed | Missing from supplied evidence | Add an error state on the Sign in screen showing "Email or password is incorrect", with the email field still populated |
| F02 | P1 | No account-lockout state after 5 failed attempts | R04; all 3 supplied frames reviewed | Missing from supplied evidence | Add a locked state showing the 15-minute lock explanation and a "Reset password" link |

Both are required branches with no design coverage. They are P1, not P0: the user is not harmed and can retry or reset, so the critical goal is impaired rather than blocked (rubric caps P0 to serious risk).

## Recommendations

1. Design the R03 error state as a variant of frame 1 (Sign in): inline or banner error text, email preserved, password cleared, "Sign in" button re-enabled.
2. Design the R04 lockout state: lock message with remaining duration and a visible "Reset password" entry point. Decide whether the countdown is shown live or as static text.
3. Confirm where "Forgot password?" (present in frame 1) and the R04 "Reset password" link lead - the reset flow itself was not supplied, so it could not be audited.

## Limitations

- This review covers static design evidence only (3 text-described frames); it does not verify live product behavior.
- The password-reset / "Forgot password?" flow was not supplied and was not audited (open question Q01).
- No visual fidelity was available - frames are text descriptions, so exact error placement and copy could not be verified, only presence/absence of the states.
- FlowGuard does not guarantee a flow is complete and does not replace usability testing.

---

Now let me publish the shareable page (quick mode keeps summary, findings, and limitations).

The FlowGuard HTML template already carries its own design system, so I'll build the page from it, keeping the quick-mode sections (summary, findings, limitations).

The publish wasn't approved, so the page wasn't created. That's fine - the full review is in chat above.

If you'd like the shareable page anyway, I can either try publishing again or save it as a self-contained `.html` file next to the fixtures (`flowguard-sign-in-quick.html`). Just say which.

**Review summary:** I checked `screens.md` (3 frames) against `requirements.md` (R01-R05, all explicit). The designs cover the happy path (sign in → loading → Home), but two required failure states are **missing from the supplied evidence**:

- **F01 (P1)** - no incorrect-credentials error state (R03: "Email or password is incorrect", email kept filled)
- **F02 (P1)** - no account-lockout state after 5 failed attempts (R04: 15-minute lock message + "Reset password" link)

Both are P1, not P0: they're required branches, but the user can still retry or reset, and no security/data risk is visible in static evidence. **Could not verify:** the password-reset / "Forgot password?" flow (not supplied), and exact copy/placement (frames are text descriptions, not visuals). No files were saved and no page was published.
