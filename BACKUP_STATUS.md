# Backup status

Checked 2026-11-08 on the old Mac. Repository: https://github.com/Satyam2701/flowguard (public).

| Requirement | Status |
| --- | --- |
| Source code preserved | COMPLETED |
| Git history preserved | COMPLETED |
| PRDs recovered/reconstructed | COMPLETED |
| Technical documentation | COMPLETED |
| CLAUDE.md | COMPLETED |
| Claude configurations | COMPLETED |
| Environment setup | COMPLETED |
| Local assets/database backup | NOT APPLICABLE |
| GitHub push verified | COMPLETED |
| Migration guide | COMPLETED |

## How this was verified

- Before this file was added, local `main` and `origin/main` were the same commit (`8f03b51`), 0 ahead and 0 behind, with no uncommitted files and no stashes.
- GitHub held the same 107 files and 7 commits as local, plus tag `v1.0.0` and its release.
- `CLAUDE.md`, `MIGRATION_GUIDE.md`, `docs/PRD.md`, `scripts/setup-new-machine.sh`, `SKILL.md` and `bin/install.js` load from raw.githubusercontent.com without login.
- `scripts/setup-new-machine.sh` was dry-run on a fresh clone with an empty home folder: it checked tools, set the commit identity, installed the skill, and left it untouched on a second run.
- The package is on npm as `flowguard-skill@1.0.0`, and installing it from the registry produced an exact copy of the repo's skill.

## Preserved on GitHub

All source (skill, references, installer, package.json), examples, the full test suite with fixtures and raw run outputs, README, LICENSE, and project knowledge (`CLAUDE.md`, `docs/`). There are no secrets, environment variables, databases or binary assets beyond one small test PNG, which is committed.

## Stays local (not needed to continue)

| Item | Where | Impact if lost |
| --- | --- | --- |
| Claude chat history for this project | `~/.claude/projects/` on the old Mac | Low. Its knowledge is summarized in `CLAUDE.md` and `docs/`. |
| Installed skill copy | `~/.claude/skills/flowguard` | None. Reinstall with the setup script or `npx flowguard-skill`. |
| GitHub and npm logins | macOS keychain | None. Sign in again (`gh auth login`, `npm login`). |
| HTML sources of pages published on claude.ai | Temporary session folder | None. The pages themselves live in your claude.ai account. |

## Manual steps on the new Mac

Follow `MIGRATION_GUIDE.md`: install tools, `gh auth login` as Satyam2701, clone, run `scripts/setup-new-machine.sh`, `claude` then `/login`, and `npm login` only if you will publish.

## Missing information

- Whether to keep the name "FlowGuard" (see `docs/STATUS.md`).

## Risks before formatting the old Mac

None found for this project. Everything needed is on GitHub and npm. Optional: if you want the full chat transcript for reference, export it from the Claude app before formatting.
