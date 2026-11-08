# FlowGuard PRD

**Source:** recovered from the owner's original "FlowGuard: Complete Product Requirements & Implementation Prompt" (shared in the build conversation on 2026-10-19), plus requirements the owner added later. Labels: **VERIFIED** = stated by the owner or confirmed by the implementation; **INFERRED** = reconstructed; **UNKNOWN** = needs owner input. Everything below is VERIFIED unless marked.

## 1. Identity

- Name: FlowGuard. Tagline: "Catch missing paths before development."
- Type: open-source Claude Code Skill. Skill name and command: `flowguard`, `/flowguard`.
- Creator: Satyam Tiwari, Product Designer.
- Vision: help designers and product teams find missing screens, states, transitions, alternate paths and edge cases before development.
- Core promise: analyze a journey, compare expected behavior with available design evidence, produce an actionable report of potential gaps.

## 2. Problem

Teams design happy paths and leave errors, validation, recovery, permissions, cancellation and alternate journeys undocumented. Designers work from anything between a full PRD and a one-line description. FlowGuard must handle all of these without pretending to know more than the evidence supports.

## 3. Goals and non-goals

**Goals:** find missing or ambiguous states; reconstruct journeys from evidence; compare designs with explicit or provisional requirements; produce evidence-backed, prioritized recommendations; reusable Markdown reports and optional diagrams; work for individuals and teams; optional Figma MCP; a credible open-source project.

**Non-goals:** guarantee completeness; replace research or usability testing; verify live behavior from static screenshots; replace a PRD or product owner; require hosting, databases, paid APIs or Figma; create external tickets; guarantee accessibility compliance; invent requirements or metrics; redesign screens.

## 4. Hard constraints

Claude Code skill, not a web app. Infrastructure cost ₹0. Markdown instructions, references and templates. No paid APIs or external processing. Works without Figma and without a PRD. Separate verified, inferred, missing and unknown. Minimal dependencies and permissions. Never claim untested things work. Never overwrite or delete user files silently. Portable and easy to install.

## 5. Users

Individual product designers; designers without a PRD; design leads; product managers; startup founders; engineers.

## 6. Experience

Invoked as `/flowguard` plus natural language, for example audit a PDF against a PRD and save to `./reports/`; review designs with no PRD; review a Figma prototype with connected tools; map a journey from an idea only. On invocation: read the request, find the module and referenced files, check which tools exist, decide if there is enough to start, ask only essential questions (at most 3, each with a default, skippable), offer a preliminary analysis, explain limits.

## 7. Inputs and scenarios

Requirements (PRDs, stories, acceptance criteria, tickets, rules, specs), design evidence (Figma, screenshots, frames, PDFs, flow diagrams, inventories, text descriptions), plain-language context, and live URLs only when a browser tool exists. Scenarios: requirements available; designs without PRD (provisional journey); idea only (planning checklist, no audit claims); conflicting requirements (log, ask); insufficient context (preliminary review with unknowns).

## 8. Modes

Quick (top gaps), Standard (default, full report), Deep (traceability, branches, permissions, recovery, conflicts). Mode changes depth, not evidence standards.

## 9. Figma (optional)

Detect a compatible tool, verify access, inspect real responses, retrieve frames and metadata, record exactly what was retrieved, separate explicit connections from inferred ones, and fall back to exports on failure (private files, expired auth, bad URLs, permissions, rate limits, partial responses, large files, missing interaction data). Never request credentials.

## 10. Analysis engine (six stages)

1. Expected journey (goal, entry, main path, branches, success, rules, open questions; inferred requirements are Provisional).
2. Screen and state inventory with stable IDs, purpose, category, actions, evidence, status, notes; detect duplicates without merging distinct states.
3. Transition graph with stable IDs; flag disconnected screens, dead ends, unexplained transitions after considering deep links and notifications.
4. Contextual state checklist: navigation, forms, system behavior, auth and permissions, conditional branches, recovery, business rules and data, destructive and sensitive actions, multi-role and multi-device, accessibility and usability.
5. Compare expected with observed. Missing evidence is never a live defect.
6. Findings with ID, title, category, priority, evidence, expected, observed, impact, fix, confidence or status, validation steps, related IDs. No manufactured findings.

## 11. Evidence and priority

Classifications: Verified, Inferred, Missing from supplied evidence, Unknown. High, Medium, Low confidence only when meaningful; no numeric probabilities. Priorities P0 Critical, P1 High, P2 Medium, P3 Low, each justified; no P0 on speculation; no invented frequency.

## 12. Reports and exports

Markdown required. Standard report: metadata, executive summary, evidence and assumptions, screen inventory, flow overview (Mermaid), transitions, findings, fixes, developer-ready issues, validation checklist, unresolved decisions, scope and limitations. Quick and Deep variants. Optional Mermaid and JSON with a fixed schema, validated where practical. No completeness percentage. Write files only when requested; never overwrite silently; report paths only after successful writes.

## 13. Edge cases the skill must handle

No input; missing PRD or designs; unreadable or unsupported files; conflicting or outdated requirements; multiple flows; cropped or duplicate screenshots; inconsistent labels; multiple entry points; loops; unknown branch conditions; unreachable screens; external handoffs; stale links; Figma failures; unavailable tools; large flows; no gaps; only uncertain findings; existing output files; invalid paths; validation failures; summary-only or diagram-only requests.

## 14. Testing and acceptance

At least 20 documented test scenarios with input, expected findings, non-findings, actual result and verdict; run what is feasible and never mark unexecuted tests as passing. Acceptance: invocable skill; works without PRD; evidence labels; justified severity; safe fallbacks; stable IDs; documented limitations; README with install and usage; MIT license; author credit; no invented metrics or unverified claims.

## 15. Requirements added after v1 spec

| Date | Requirement | Status |
| --- | --- | --- |
| 2026-10-19 | No em dashes in any code or text | VERIFIED, enforced |
| 2026-10-20 | No Claude co-author or AI attribution in the repo | VERIFIED, enforced |
| 2026-10-27 | Every run also produces a shareable report page (private artifact where a publishing tool exists, local HTML fallback otherwise) | VERIFIED, implemented (SKILL.md Step 6) |
| 2026-10-28 | Easy install through npm | VERIFIED, implemented (`npx flowguard-skill`) |

## 16. Unknowns

- UNKNOWN: whether to keep the name "FlowGuard" given another open-source "FlowGuard" AI-agent tool (see `docs/STATUS.md`).
- UNKNOWN: whether a Claude Code plugin or marketplace listing is wanted in addition to npm.
