# Flow Audit Framework

The detailed method behind FlowGuard's six stages. Load this when running a Standard or Deep audit, or when a situation in SKILL.md points here.

## Contents

- [ID conventions](#id-conventions)
- [Stage 1: Establish the expected journey](#stage-1-establish-the-expected-journey)
- [Stage 2: Inventory screens and states](#stage-2-inventory-screens-and-states)
- [Stage 3: Build the transition graph](#stage-3-build-the-transition-graph)
- [Stage 4: Check relevant states and edge cases](#stage-4-check-relevant-states-and-edge-cases)
- [Stage 5: Compare expected and observed behavior](#stage-5-compare-expected-and-observed-behavior)
- [Stage 6: Generate findings](#stage-6-generate-findings)
- [Figma access procedure](#figma-access-procedure)
- [Large flows and context limits](#large-flows-and-context-limits)
- [Requirement conflicts](#requirement-conflicts)
- [Sensitive information](#sensitive-information)
- [Repeatability](#repeatability)

## ID conventions

Stable IDs make reports traceable and comparable across runs.

| Object | Format | Example | Rule |
| --- | --- | --- | --- |
| Requirement | `R01` | `R03` | Numbered in source order. Provisional ones are prefixed: `PR01`. |
| Screen or state | `S01` | `S07` | Numbered in the order the main path visits them, then branches, then unreached screens. |
| Transition | `T01` | `T12` | Numbered by source screen ID, then by trigger order on that screen. |
| Finding | `F01` | `F04` | Numbered by priority (P0 first), then by journey order. |
| Assumption | `A01` | `A02` | Numbered in the order made. |
| Open question | `Q01` | `Q05` | Numbered in the order raised. |

Record original names from the evidence (frame names, file names, page numbers) as aliases next to the stable ID.

## Stage 1: Establish the expected journey

Capture:

- **User goal**: one sentence from the user's perspective.
- **Actors and roles**: who performs the journey and who else is involved (approver, admin, external system).
- **Entry conditions and entry points**: where the user starts (home, deep link, email, notification, another feature), and preconditions (signed in, eligible, has data).
- **Main path**: the ordered steps of the successful journey.
- **Branches**: decision points and their outcomes.
- **Success conditions**: what is true when the user is done.
- **Failure and exit conditions**: what ends the journey without success.
- **Business rules**: limits, eligibility, timing, ownership.
- **Open questions**: anything needed but not known.

Source priority:

1. Explicit requirements supplied by the user (PRD, stories, acceptance criteria, tickets). Cite the source and section.
2. Statements the user made in conversation. Cite as `User statement`.
3. Conventions inferred from the domain and the designs. Label `Provisional` and add an assumption ID. Never present a provisional requirement as a stakeholder decision.

If requirements are clearly outdated (older version, superseded ticket), note it and ask which version governs, or proceed with the most recent and say so.

## Stage 2: Inventory screens and states

For each screen or distinct state, record:

| Field | Notes |
| --- | --- |
| ID | `S01`... |
| Name | Descriptive name plus original label as alias. |
| Purpose | What the user does or learns here. |
| State category | One of: Entry, Form, Review, Loading, Success, Empty, Error, Confirmation, Permission, Terminal, External handoff, Informational, Other. |
| Actions | Buttons, links, gestures, and inputs visible or described. |
| Evidence source | File and page or frame, Figma node, or `User description`. |
| Classification | Verified, Inferred, Missing from supplied evidence, Unknown. |
| Notes and limitations | Cropping, low resolution, ambiguous copy, aliases. |

**Duplicates.** Treat two artifacts as likely duplicates only when content, layout, and state all appear the same. Keep separate IDs for genuinely different states of the same screen (empty versus filled, default versus error, loading versus loaded). When unsure, keep both and note "possible duplicate of S04".

**Cropped or partial evidence.** Record the visible region. Anything outside it is `Unknown`, never `Missing from supplied evidence`.

**Missing expected states.** Expected states not found in the evidence are listed in the inventory with classification `Missing from supplied evidence`, using IDs that continue the sequence, so findings can reference them.

## Stage 3: Build the transition graph

For each transition, record:

| Field | Notes |
| --- | --- |
| ID | `T01`... |
| Source | Screen ID. |
| Trigger | User action or system event. |
| Condition | Guard such as "valid input" or "user is admin". `None` if unconditional; `Unknown` if a branch exists but its condition is not stated. |
| Destination | Screen ID, `External: <system>`, or `Exit`. |
| Evidence | Prototype connection, flow diagram arrow, requirement, annotation, or visual inference. |
| Classification | `Verified` only for explicit connections (prototype link retrieved by a tool, a drawn arrow, a requirement that names both ends). Visual guesses are `Inferred`. |
| Related requirements | `R` IDs. |
| Uncertainty | What would confirm it. |

Patterns to support explicitly: linear paths, branches, loops, retries, back navigation, cancellation, alternate entry points, multiple terminal states, and external handoffs (payment providers, email, identity providers, other apps).

Graph checks, in order:

1. **Reachability**: every screen should be reachable from at least one entry point. Before flagging an unreachable screen, consider deep links, notifications, emails, alternate entry points, and screens owned by other flows. Report as "potentially disconnected" with the alternatives you considered.
2. **Dead ends**: non-terminal screens with no outgoing transition. A success or terminal screen without a next action is a dead end only if the user would need to continue somewhere.
3. **Unexplained transitions**: jumps without a visible trigger, or a branch without a stated condition.
4. **Loops**: retries and validation loops should have an exit (cancel, give up, contact support) and any limit stated by the rules.
5. **Terminal clarity**: each terminal state should make the outcome clear and offer a sensible next step.

## Stage 4: Check relevant states and edge cases

Use [state-checklist.md](state-checklist.md). For each category, first decide whether it applies, using its "Applies when" trigger. Only relevant items become candidate gaps. Record skipped categories briefly in Scope and limitations for Deep audits.

## Stage 5: Compare expected and observed behavior

For each expected element (requirement, provisional requirement, or relevant checklist item), determine:

- **Covered**: evidence shows it. Classification `Verified` or `Inferred`.
- **Not found**: reasonable inspection of the supplied evidence did not find it. Classification `Missing from supplied evidence`.
- **Cannot determine**: evidence is cropped, unreadable, or out of scope. Classification `Unknown`.
- **Conflicts**: design shows behavior different from requirements, or requirements disagree.

Also record observed elements that no requirement explains (extra screens or branches). These may be fine, but should be confirmed.

Never equate "not found in the supplied evidence" with "the live product lacks it".

## Stage 6: Generate findings

A finding exists when a gap, conflict, or risk has user impact and enough evidence to act on. Each finding has:

| Field | Content |
| --- | --- |
| Finding ID | `F01`... |
| Title | Short, specific, action-oriented. |
| Category | A checklist category (Navigation, Forms, System behavior, Auth and permissions, Conditional branches, Recovery, Business rules and data, Destructive and sensitive actions, Multi-role and multi-device, Accessibility and usability) or `Requirement conflict`. |
| Priority | P0 to P3 with a one-line justification. |
| Evidence | Exact sources: requirement IDs, screen IDs, file and page. |
| Expected behavior | What should happen, with its source (requirement or provisional). |
| Observed behavior or evidence limitation | What the evidence shows or does not show. |
| User impact | Concrete consequence for the user. |
| Recommended fix | A design action, not a full redesign. |
| Classification and confidence | Classification plus High, Medium, or Low confidence when meaningful. |
| Validation steps | How the team confirms and closes it. |
| Related IDs | Screens and transitions. |

Rules:

- Merge findings that share a root cause; list the affected screens.
- Unknowns that block judgment go to Unresolved decisions as questions, not findings.
- If there are no findings, say "No significant gaps identified in the supplied evidence" and list what was checked and residual risks.

## Figma access procedure

Figma access is optional and depends on the environment.

1. **Detect.** Look for connected tools whose names or descriptions mention Figma (the official Figma MCP server exposes tools such as `get_metadata`, `get_screenshot`, `get_design_context`, and `get_figjam`; names vary by setup and version). If none exist, skip to step 7.
2. **Validate the link.** Confirm it is a figma.com design, prototype, board, or proto URL and extract the file key and node ID if present. If the link is malformed, say so and ask for a corrected link.
3. **Verify access.** Make one lightweight call (for example metadata for the given node). Inspect the actual response. Handle:
   - Authentication required or expired: tell the user the Figma connection needs to be authorized in their own settings. Do not request tokens or passwords and do not change auth settings.
   - No permission or private file: ask the user to share the file with the connected account or supply exports.
   - Not found or invalid node: ask for the correct frame or page link.
   - Rate limit: wait briefly once, then fall back and report it.
   - Partial or truncated response: record what was received and treat the rest as `Unknown`.
4. **Retrieve.** Get frame list and names, then screenshots of the frames relevant to the flow. For large files, ask which page or flow to start with, or start with the linked node.
5. **Interactions.** Only treat a transition as `Verified` from Figma if the tool response explicitly includes prototype interaction or connection data. Most design-context and screenshot responses do not include prototype links, so transitions inferred from frame order, names, or button labels are `Inferred`.
6. **Record.** In the metadata, list exactly what was retrieved (for example "metadata for page Onboarding, screenshots of 8 of 14 frames, no prototype interaction data"). Never write "the prototype was fully inspected" unless it was.
7. **Fall back.** If Figma access is unavailable or failed, say so in one sentence and ask for PNG or PDF exports, a flow diagram, or a text description of each screen. Continue with any other evidence already available.

## Large flows and context limits

- Split by flow or section (for example "Sign up", "Verify email", "Profile setup").
- Audit the requested or most critical flow first. State which flows were covered and which were not.
- For PDFs, read in page ranges and record pages reviewed.
- Keep the inventory compact; move detail into the Deep report only when requested.
- Offer to continue with the next section in a follow-up run that reuses the same IDs.

## Requirement conflicts

Log each conflict with:

- Conflict ID (use `Q` IDs in Unresolved decisions, and a finding with category `Requirement conflict` when it affects the design).
- Both sources and their exact statements (paraphrase if copyrighted or long).
- What the design currently shows, if anything.
- Impact of each option.
- The decision needed and who likely owns it (product owner, legal, engineering), labeled as a suggestion.

Do not resolve a conflict silently. If the user wants you to proceed, use the most recent or most specific source and record it as an assumption.

## Sensitive information

If an artifact contains secrets (API keys, tokens, passwords), personal data (emails, phone numbers, addresses, government IDs), payment data, or real customer records:

- Do not repeat the values. Use `[REDACTED: API key]`, `[REDACTED: email]`, and so on.
- If the value appears inside the design itself (for example a real customer's data in a mockup, or a full card number shown on screen), raise a finding under Destructive and sensitive actions.
- Mention in Scope and limitations that sensitive values were redacted.
- Do not send artifact content to any external service beyond the tools the user has connected for this purpose.

## Repeatability

Identical inputs should produce materially the same audit. To support this:

- Follow the ID ordering rules above.
- Use the rubric decision rules rather than intuition for priority.
- Apply the checklist triggers consistently.
- Avoid wording that depends on run-specific assumptions; state assumptions explicitly with `A` IDs.
