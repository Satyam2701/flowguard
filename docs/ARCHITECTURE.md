# Architecture and tech stack

## How the skill works (VERIFIED)

FlowGuard is plain Markdown that Claude Code loads as a skill. Claude Code reads the frontmatter of `.claude/skills/flowguard/SKILL.md` to list the skill; the body loads when `/flowguard` runs or a request matches the description. `$ARGUMENTS` receives the user's words. Detailed material sits in `references/` and is read only when a step points to it, which keeps the always-loaded part small.

| File | Role |
| --- | --- |
| `SKILL.md` | Non-negotiable rules, Steps 1 to 8 (read request, check access, decide, six-stage analysis, report, shareable page, save files, self-check), failure table |
| `references/flow-audit-framework.md` | ID conventions, stage details, Figma access procedure, large flows, conflicts, sensitive data |
| `references/state-checklist.md` | Contextual checklist with "applies when" triggers |
| `references/severity-rubric.md` | Evidence classifications, confidence, P0 to P3 rules and caps |
| `references/report-template.md` | Quick, Standard, Deep, planning, diagram-only templates; Mermaid rules; JSON schema; HTML page rules |
| `references/html-report-template.html` | Themed report page with placeholders and REPEAT blocks |

The skill uses whatever tools the host session has: file reading, optional Figma MCP, optional `Artifact` publishing tool, shell for validation. It pre-approves no tools.

## Installer and packaging (VERIFIED)

- `bin/install.js` (Node, no dependencies, Node 18.17 or newer for `fs.cpSync`): copies the skill to `~/.claude/skills/flowguard`, or `./.claude/skills/flowguard` with `--project`. Refuses to overwrite without `--force`; backups go to `.claude/flowguard-backups/<timestamp>` (outside the skills folder, so Claude never loads a duplicate). Also `--uninstall`, `--help`.
- `package.json` `files` limits the package to the skill, installer, README and LICENSE (10 files, about 32 kB).

## Tech stack

| Item | Version or note | Status |
| --- | --- | --- |
| Claude Code | Built and tested with 2.1.x (CLI and desktop app) | VERIFIED |
| Node.js | 18.17+ required by installer; developed on Node 26.7, npm 11.19 | VERIFIED |
| Python 3 | Optional, used ad hoc for test checks and JSON validation | VERIFIED |
| Mermaid | Diagrams; validated with Mermaid 11.4.1 | VERIFIED |
| Databases, APIs, env vars | None | VERIFIED |

## External services

| Service | Used for | Credentials needed |
| --- | --- | --- |
| GitHub `Satyam2701/flowguard` (public) | Source, releases, tag `v1.0.0` | Owner's GitHub login (`gh auth login`) |
| npm `flowguard-skill` | Distribution | Owner's npm login, only to publish |
| Figma MCP server | Optional design access during audits | User's own Figma connection |
| claude.ai Artifacts | Optional shareable report pages | User's claude.ai account |

## Tests

Markdown-based manual suite (`tests/`). Tests are run as `/flowguard` invocations (interactive or `claude -p`) against fixtures and graded against `expected-findings.md`. Results and their limits are recorded in `test-cases.md`; raw outputs in `runs/`.
