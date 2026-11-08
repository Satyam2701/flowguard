# FlowGuard: project guide for Claude Code

FlowGuard is an open-source Claude Code **skill** (Markdown instructions, not an app) that audits product user flows for missing screens, states, transitions and edge cases before development. Owner: Satyam Tiwari, Product Designer. Public repo: https://github.com/Satyam2701/flowguard. npm package: `flowguard-skill`.

Read the relevant file in `docs/` before any significant change, and update it (plus `docs/DECISION_LOG.md`) when behavior, structure or release state changes.

## Layout

| Path | What it is |
| --- | --- |
| `.claude/skills/flowguard/SKILL.md` | The skill itself: rules, 8-step workflow, failure table. Keep under 500 lines. |
| `.claude/skills/flowguard/references/` | Loaded on demand: audit framework, state checklist, severity rubric, report templates, HTML report page template |
| `bin/install.js` | Zero-dependency npm installer (`npx flowguard-skill`) |
| `package.json` | npm package; `files` ships only the skill, installer, README, LICENSE |
| `examples/` | Illustrative password-reset sample (fictional, hand-written) |
| `tests/` | Manual test suite: `test-cases.md` (results), `expected-findings.md` (pass criteria), `fixtures/`, `runs/` (raw outputs), `output/` |
| `docs/` | PRD, architecture, decisions, status (see index below) |
| `MIGRATION_GUIDE.md`, `BACKUP_STATUS.md` | New-machine setup and backup state |

## Commands

There is no build step. Useful commands:

```bash
npm pack --dry-run                      # check what the npm package ships
node bin/install.js --help              # installer help
claude -p '/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.'   # run a test headlessly
```

To test the installer without touching the real `~/.claude`, run it with `HOME` pointed at a temporary folder.

## Conventions (owner preferences, verified in conversation)

- **No em dashes or en dashes** in any code, docs, commit message or release note. Scan with `grep -rlP "\x{2014}|\x{2013}" .` before committing.
- **No AI attribution:** no `Co-Authored-By` or "Generated with" lines in commits, PRs or files. "Claude Code" may appear only as the platform name.
- Commits are authored as `Satyam Tiwari <34920689+Satyam2701@users.noreply.github.com>`; push with the `Satyam2701` GitHub account.
- Never force-push, change repo visibility, publish to npm or delete artifacts without the owner's explicit approval.
- Skill content rules: every claim carries an evidence label (Verified, Inferred, Missing from supplied evidence, Unknown); no invented metrics, dates or completeness scores; P0 never rests on guesses.
- Use fictional data only in fixtures and examples. The repo is public.

## Releasing a new version

1. Bump `version` in `package.json` **and** `metadata.version` in `SKILL.md`.
2. Run the affected tests and record results in `tests/test-cases.md`.
3. Commit, push, tag `vX.Y.Z`, create a GitHub release (notes without em dashes).
4. The owner runs `npm publish` (needs their npm login). Users update with `npx flowguard-skill --force`.

## Status (2026-11-08)

v1.0.0 is released on GitHub and npm. All 22 test scenarios have a recorded pass. Open items are in `docs/STATUS.md`; the main one is the unresolved name overlap with another open-source "FlowGuard" tool.

## Documentation index

- `docs/PRD.md`: product requirements (recovered from the original spec)
- `docs/ARCHITECTURE.md`: how the skill, installer, packaging and tests fit together; tech stack; external services
- `docs/DECISION_LOG.md`: dated decisions and why
- `docs/STATUS.md`: current state, pending tasks, known issues
- `README.md`: user-facing overview, install, usage
