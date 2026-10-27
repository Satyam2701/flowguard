# T22 run output (fresh headless session)

Prompt: `/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.`
Execution: `claude -p` (Claude Code CLI, logged in with claude.ai), 2026-10-27, run from the repository root as its own fresh session `e9746ead-b04d-49e0-9617-d5f9d500c353`. Flags: `--setting-sources project,local --strict-mcp-config --mcp-config '{"mcpServers":{}}'` `--disallowedTools Artifact`. No MCP servers were connected, so no Figma tool was available.
Raw output below is the session's assistant text, unchanged except that em and en dashes were replaced with hyphens to keep the repository dash-free.

---

## FlowGuard Quick Review: Sign in

**Reviewed:** `tests/fixtures/t02-missing-error/screens.md` (3 frames, text descriptions) | **Requirements:** `tests/fixtures/t02-missing-error/requirements.md` (R01-R05, explicit) | **Mode:** Quick

## Context
The journey is a standard email/password sign-in: user enters credentials (S01), sees a loading state while signing in (S02), and lands on Home on success (S03). The requirements specify five behaviors; the happy path (R01, R02, R05) is covered by the three supplied frames. Two required failure branches - a wrong-credentials error (R03) and account lockout after 5 failed attempts (R04) - have no corresponding frame in the supplied evidence.

## Top findings

| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | No wrong-credentials error state. R03 requires showing "Email or password is incorrect" and keeping the email filled; no frame shows an error message or a populated-email error layout. | R03; all 3 supplied frames reviewed (`screens.md`) | Missing from supplied evidence | Add a Sign-in error state: inline/banner error "Email or password is incorrect", email field retained, password cleared, button re-enabled for retry. |
| F02 | P1 | No account-lockout state. R04 requires locking the account for 15 minutes after 5 failed attempts with an explanatory message and a "Reset password" link; no frame covers the locked state or its messaging. | R04; all 3 supplied frames reviewed (`screens.md`) | Missing from supplied evidence | Add a locked-account state: lock explanation, remaining time or 15-min notice, and a "Reset password" link (the existing "Forgot password?" link may serve this - confirm). |

Both are P1, not P0: each is an explicit requirement with a Missing-from-supplied-evidence observation, but the user still has a workaround (retry, or reset via the existing "Forgot password?" link), so neither fully blocks a critical goal per the rubric.

## Recommendations
1. Design the two missing failure frames (error + lockout) before development; they are explicitly required and currently have no visual spec.
2. Confirm whether the lockout "Reset password" link (R04) is the same control as the existing "Forgot password?" link on S01, or a distinct one on the locked screen.
3. When adding the error frame, specify the exact field behavior R03 implies: email retained, and decide whether the password field is cleared (not stated in requirements - an open question for the team).

## Limitations
- This review covers only the three supplied text frame descriptions; no Figma file, prototype, or screenshots were available, so transitions (loading → Home) and the error/lock layouts are judged from text alone.
- Static evidence only - this does not verify live sign-in behavior; a frame could exist in the design file but be absent from this supplied list.
- Field-level details not in the requirements (empty-field validation, password-clear-on-error, exact lock-countdown display) are undecided and were not treated as findings.
- No HTML page-publishing tool is available in this environment, so the report is delivered in chat only. I can save it as a local `flowguard-signin-quick.md` (and a self-contained `.html`) next to the fixtures if you'd like - just say where.
