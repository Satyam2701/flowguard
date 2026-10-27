# FlowGuard

**Catch missing paths before development.**

FlowGuard is an open-source Claude Code Skill that helps product designers and product teams identify missing screens, states, transitions, and edge cases before development.

Created by **Satyam Tiwari, Product Designer**.

---

## Contents

- [Overview](#overview)
- [The problem](#the-problem)
- [Key capabilities](#key-capabilities)
- [Who it is for](#who-it-is-for)
- [Requirements and installation](#requirements-and-installation)
- [Usage](#usage)
- [Flexible input support](#flexible-input-support)
- [Working without a PRD](#working-without-a-prd)
- [Optional Figma MCP integration](#optional-figma-mcp-integration)
- [Example report](#example-report)
- [Evidence classifications](#evidence-classifications)
- [Priorities](#priorities)
- [Known limitations](#known-limitations)
- [Testing](#testing)
- [Privacy and safe file handling](#privacy-and-safe-file-handling)
- [Repository structure](#repository-structure)
- [Contributing](#contributing)
- [Before public release](#before-public-release)
- [License](#license)
- [Author](#author)

## Overview

FlowGuard reviews a product journey the way a careful design lead would before handoff. It establishes what the journey is expected to do, inventories the screens and states you actually have, maps how they connect, checks the states and branches that matter for this kind of flow, and writes a prioritized, evidence-backed Markdown report.

It is a set of Markdown instructions, reference files, and templates. There is no server, database, build step, or paid API. It runs inside Claude Code.

## The problem

Teams often design the happy path well and leave the rest implicit: what happens when validation fails, the network drops, a link expires, a user lacks permission, or someone cancels halfway. These gaps usually surface during development or QA, when they are slower and more expensive to fix.

Designers also work with very different levels of input. Some have a full PRD. Many have screenshots and a sentence of context. FlowGuard works with whatever you have and is explicit about what it could and could not verify.

## Key capabilities

- Builds the expected journey from a PRD, user stories, acceptance criteria, tickets, or a plain description.
- Builds a **provisional** journey when no requirements exist, with every assumption labeled.
- Inventories screens and states with stable IDs (`S01`, `T01`, `F01`).
- Maps transitions, including branches, loops, retries, back navigation, cancellation, alternate entry points, and external handoffs.
- Flags dead ends and potentially disconnected screens after considering deep links and notifications.
- Applies a contextual state checklist: navigation, forms, system behavior, auth and permissions, branches, recovery, business rules, destructive actions, multi-role and multi-device, and accessibility.
- Logs conflicts between requirement sources, and between requirements and designs.
- Produces findings with evidence, expected versus observed behavior, user impact, fix, classification, and validation steps.
- Prioritizes with a written rubric (P0 to P3) that forbids critical severity on speculation.
- Outputs Quick, Standard, Deep, planning, and diagram-only reports in Markdown, with Mermaid diagrams and optional JSON.
- Publishes every report as a private, shareable page when your environment supports it (see [Shareable report pages](#shareable-report-pages)).
- Writes files only when asked, never overwrites silently, and redacts sensitive data.

## Who it is for

| Role | Use |
| --- | --- |
| Product designers | Find overlooked states and prepare stronger handoffs. |
| Designers without a PRD | Share designs and a short goal; get a provisional journey and gap analysis. |
| Design leads | Standardize flow reviews across modules and designers. |
| Product managers | Check designs against stories, acceptance criteria, and rules. |
| Startup founders | Turn a rough idea into a structured journey and state checklist. |
| Engineers | Use findings as behavior clarifications and test scenarios. |

## Requirements and installation

**Requirements**

- [Claude Code](https://code.claude.com/docs) with skills support.
- Nothing else. No API keys, hosting, or packages. Figma integration is optional.

**Option A: use it in one project**

Copy the skill folder into your project:

```bash
mkdir -p .claude/skills && cp -R path/to/flowguard/.claude/skills/flowguard .claude/skills/
```

**Option B: use it in all your projects**

```bash
mkdir -p ~/.claude/skills && cp -R path/to/flowguard/.claude/skills/flowguard ~/.claude/skills/
```

**Option C: work inside this repository**

Clone the repository and start Claude Code in its root. The skill is already at `.claude/skills/flowguard/`.

```bash
git clone https://github.com/Satyam2701/flowguard.git
```

Start a **new** Claude Code session after installing so the skill is discovered. Type `/` and look for `flowguard` in the menu to confirm it loaded.

## Usage

Invoke with `/flowguard`, followed by what you want in plain language. Claude may also load the skill automatically when you ask for a flow review.

**With requirements**

```text
/flowguard Audit ./design/onboarding.pdf against ./docs/onboarding-prd.md and save the report in ./reports/.
```

**Without a PRD**

```text
/flowguard Review ./design/onboarding.pdf. I don't have a PRD. Help me establish the expected journey and identify missing states.
```

**With a Figma link**

```text
/flowguard Review this Figma prototype using available connected tools: <figma link>. Identify missing paths and explain what you could verify.
```

**With only an idea**

```text
/flowguard I am designing a seller onboarding feature. Help me map the expected journey and identify the states I should consider.
```

**Modes and outputs**

```text
/flowguard quick review of ./screens/ checkout
/flowguard deep audit of ./design/checkout.pdf against ./docs/checkout.md with JSON export to ./reports/
/flowguard diagram only for ./design/signup/
```

| Mode | What you get |
| --- | --- |
| Quick | Context, up to 5 top findings, recommendations, limitations. Minimal questions. |
| Standard (default) | Full 12-section report with inventory, transitions, diagram, findings, issues, checklist. |
| Deep | Adds traceability matrix, branch analysis, entry points, edge-case matrix, conflict log, recovery map. |

Mode changes depth, not the standard of evidence.

### Shareable report pages

After each audit, FlowGuard also turns the findings into a web page you can send to your team: summary, ranked findings, flow diagram, screen and transition tables, checklist, and open decisions.

| Where you run it | What happens |
| --- | --- |
| Claude desktop app or claude.ai (an `Artifact` publishing tool is available) | The page is published **privately** and you get a link. Only you can open it until you share it from the page's Share menu. Running the audit again in the same session updates the same page. |
| Claude Code terminal or anywhere without a publishing tool | FlowGuard says it can't publish here and offers to save the same page as a `.html` file next to the report. Nothing is written unless you agree. |

Say "chat only" or "no page" to skip it. If your material is confidential or under NDA, FlowGuard asks before publishing, because a published page leaves your machine even while it is private.

## Flexible input support

| Type | Examples | Notes |
| --- | --- | --- |
| Requirements | PRDs, user stories, acceptance criteria, tickets, business rules, specs, flow docs | Markdown, text, and PDF are read directly. |
| Design evidence | Screenshots (PNG, JPG), PDF exports, exported frames, flow diagrams, screen inventories, text descriptions | Images and PDFs are read with Claude Code's file reading. Large PDFs are read in page ranges. |
| Figma | Design or prototype links | Optional. Needs a connected Figma MCP server with access to the file. |
| Live apps | URLs | Only inspected if a browser tool is available. Otherwise FlowGuard asks for screenshots. |
| Plain context | Goal, users, success definition, rules, constraints | Always accepted. |

Native design files such as `.fig`, `.sketch`, or `.xd` cannot be read directly. Export frames to PNG or PDF.

## Working without a PRD

When requirements are missing, FlowGuard:

1. Asks at most three essential questions (for example the user goal, success, and roles), each with a default. Reply `proceed` to accept the defaults.
2. Builds a provisional expected journey from your designs and context, numbering requirements `PR01`, `PR02` and assumptions `A01`, `A02`.
3. Audits against that provisional journey, caps priorities accordingly, and lists the decisions your team must confirm.

With only an idea and no designs, it produces a journey plan and a checklist of states to design, and says clearly that no screens were audited.

## Optional Figma MCP integration

FlowGuard does not require Figma. When you share a Figma link, it:

1. Checks whether a Figma tool is connected in your session.
2. Validates the link and makes one lightweight access check.
3. Retrieves frames and screenshots where access allows.
4. Records exactly what was retrieved, such as "metadata for one page, screenshots of 8 of 14 frames, no prototype interaction data".
5. Treats transitions as **Verified** only if the tool returned explicit prototype interaction data. Transitions read from frame order or button labels are **Inferred**.
6. Falls back to exports or descriptions if anything fails.

It handles missing tools, expired authentication, private files, invalid links, rate limits, and partial responses by explaining what happened. It never asks for credentials or changes authentication settings.

**Limitations observed during testing:** with the official Figma MCP server connected, a malformed file key was rejected as invalid, and a file the account could not open returned an error saying edit access was required. Access requirements depend on Figma's server and your plan; check Figma's documentation for current rules.

**Tested on a real Figma file:** FlowGuard audited a real 15-page iOS app design file through the official Figma MCP server. It read the page list, the layer structure of 14 pages, and the full text of selected designer notes. The server did not return prototype connections, so FlowGuard read the intended links from hotspot layer names and labelled them Inferred. It did not request screenshots in that run, so it judged the design from layer names and text, not visuals.

## Example report

See [examples/sample-audit-report.md](examples/sample-audit-report.md). It audits a fictional password reset flow using [sample requirements](examples/sample-requirements.md) and a [text screen inventory](examples/sample-screen-inventory.md), with a [Mermaid transition map](examples/sample-transition-map.mmd). All example data is illustrative and hand-written to show the format; it is not a recorded test result.

A finding looks like this:

| Field | Detail |
| --- | --- |
| Finding | F01: Expired or already used reset link has no designed state |
| Priority | P1: required by R06; users with an old link have no path forward |
| Classification | Missing from supplied evidence (all 7 frames reviewed) |
| Fix | Add an expired-link screen with "Send a new link" |

## Evidence classifications

| Classification | Meaning |
| --- | --- |
| Verified | Directly supported by accessible evidence. FlowGuard states exactly what was verified. |
| Inferred | A plausible interpretation of visual or contextual evidence, with the reasoning explained. |
| Missing from supplied evidence | Expected, but not found after reasonable inspection. This is not a claim about the live product. |
| Unknown | Not enough evidence to tell. FlowGuard says what would resolve it. |

Requirements are separately marked **Explicit** (from your sources) or **Provisional** (inferred, to be confirmed). Confidence is High, Medium, or Low only when it adds meaning. FlowGuard never invents numeric probabilities.

## Priorities

| Level | Meaning |
| --- | --- |
| P0 Critical | Confirmed or strongly evidenced issue that blocks a critical goal or creates serious risk. Never assigned on speculation. |
| P1 High | An important required task or branch is blocked or significantly impaired. |
| P2 Medium | Meaningful friction or completeness issue with a workaround. |
| P3 Low | Minor improvement. |

Full rules are in [severity-rubric.md](.claude/skills/flowguard/references/severity-rubric.md).

## Known limitations

- FlowGuard cannot guarantee a flow is complete. It reports gaps in the supplied evidence.
- Static designs cannot prove live behavior, backend rules, timing, or accessibility compliance.
- It does not replace user research, usability testing, or a product owner's decisions.
- Prototype interactions are only verified when a connected tool returns them.
- Native design files (`.fig`, `.sketch`, `.xd`) must be exported first.
- Very large flows are audited in sections; coverage is stated in the report.
- No completeness percentage is produced in version 1, by design.
- Output quality depends on the model and on the clarity of the inputs. Two runs on the same input may differ in wording and in optional low-priority items.
- Shareable pages need a publishing tool in your environment; the Claude Code terminal gets the local `.html` fallback instead.
- Live `/flowguard` invocations have been tested in one shared session; one fresh session per test and repeatability across sessions have not yet been tested (see [Testing](#testing)).

## Testing

The suite is Markdown-based: [tests/test-cases.md](tests/test-cases.md) lists 22 scenarios, [tests/expected-findings.md](tests/expected-findings.md) defines pass criteria, and [tests/fixtures/](tests/fixtures/) holds the inputs.

Current status, stated plainly:

- **Live round (current results):** 19 of 20 tests were run as real `/flowguard` invocations in a Claude Code session where the skill was loaded at session start. All 19 passed; none failed. Raw outputs are in `tests/runs/tNN-live.md`.
- The live runs all happened in **one** session, one after another, not in a fresh session per test. The same session also read the pass criteria before running and graded its own outputs. Treat the results as real skill invocations, not as fully independent verification.
- T20 (repeatability across two separate sessions) was not executed. T11 was run only as an access-failure variant, because a Figma MCP server was connected; the "no Figma tool connected" variant was not executed.
- The two defects found in the earlier author-executed round (a summary count that did not match the diagram, and an incomplete JSON export) did not recur in the live round.
- Mermaid diagrams written during the live round were checked by rule and by edge counts but not rendered, because no Mermaid renderer was available to that session. Diagrams from the earlier round were rendered with Mermaid 11.4.1. Live JSON exports were parsed with `python3 -m json.tool`.
- The earlier author-executed round (the skill instructions followed by hand, before the skill could be loaded) is kept in `tests/runs/tNN-run.md` for comparison.
- **Shareable pages (round 3):** T21 passed live: the skill published a private page and returned its link. The page template was also rendered locally with a full audit, and its diagram rendered correctly. T22 (no publishing tool, local `.html` fallback) has not been executed, and how published pages render inside claude.ai was not checked.

To run a test yourself, open the repository in a fresh Claude Code session and run a prompt such as:

```text
/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.
```

Then compare the output with the matching section of `expected-findings.md` and record the result in `test-cases.md`.

## Privacy and safe file handling

- FlowGuard reads only the files you point it to, using Claude Code's own tools and permissions.
- It sends nothing to external services beyond the tools you have connected (for example a Figma MCP server you set up). The one exception is the shareable page: where a publishing tool exists, the report is published as a private page on claude.ai. Say "chat only" to skip it.
- Secrets, personal data, and customer data found in artifacts are redacted as `[REDACTED: type]` in reports. If such data appears inside a design, FlowGuard raises a finding.
- It writes files only when you ask or have authorized it, in the location you name.
- It never overwrites an existing report; it writes `-v2`, `-v3`, and so on.
- It reports a saved path only after the write succeeds. If writing fails, it explains why and gives you the report in the conversation.
- The skill does not pre-approve any tools; Claude Code's normal permission prompts apply.

## Repository structure

```text
flowguard/
├── .claude/
│   └── skills/
│       └── flowguard/
│           ├── SKILL.md
│           └── references/
│               ├── flow-audit-framework.md
│               ├── state-checklist.md
│               ├── severity-rubric.md
│               ├── report-template.md
│               └── html-report-template.html
├── examples/
│   ├── sample-requirements.md
│   ├── sample-screen-inventory.md
│   ├── sample-transition-map.mmd
│   └── sample-audit-report.md
├── tests/
│   ├── test-cases.md
│   ├── expected-findings.md
│   ├── fixtures/
│   ├── runs/
│   └── output/
├── README.md
└── LICENSE
```

## Contributing

Contributions are welcome.

1. Open an issue describing the gap, false positive, or improvement, with a minimal fixture if possible.
2. Keep `SKILL.md` focused (under 500 lines). Put detail in `references/`.
3. For behavior changes, add or update a test in `tests/test-cases.md` and `tests/expected-findings.md`, run it with `/flowguard`, and record the actual result honestly.
4. Use fictional data in fixtures and examples. Never commit real customer data or real credentials.
5. Do not add dependencies, scripts, or required integrations without a clear need.

## Before public release

- Run T20 (two separate sessions) and, ideally, each test in its own fresh session, then update the recorded results.
- Test with real image and PDF exports. (A real Figma file has been tested.)
- Check that the repository name `flowguard` is available on your hosting platform and search for existing trademarks or products named FlowGuard. The name has not been cleared.

## License

[MIT](LICENSE). Copyright (c) 2026 Satyam Tiwari.

## Author

**Satyam Tiwari**, Product Designer.
