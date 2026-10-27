# Report Templates

Markdown is always produced. Choose the template that matches the mode or request. Replace every `<placeholder>`. Write `Not provided` for unknown metadata. Never invent dates, counts, scores, or metrics.

## Contents

- [Standard report](#standard-report)
- [Quick report](#quick-report)
- [Deep report additions](#deep-report-additions)
- [Planning report (no designs)](#planning-report-no-designs)
- [Diagram-only output](#diagram-only-output)
- [Developer-ready issue format](#developer-ready-issue-format)
- [Mermaid rules](#mermaid-rules)
- [JSON export schema](#json-export-schema)
- [Shareable HTML report](#shareable-html-report)

## Standard report

````markdown
# FlowGuard Audit: <Product or module>

## 1. Audit metadata

| Field | Value |
| --- | --- |
| Product or module | <name or Not provided> |
| Audit mode | Standard |
| Audit date | <date if known, else Not provided> |
| Requirements source | <files and sections, "User statements", or "None: provisional journey"> |
| Design evidence | <files, pages, frames, links> |
| Access method | <Local file read, Figma MCP (what was retrieved), Browser, User description> |
| Artifacts not usable | <file and reason, or None> |
| Coverage limitations | <cropping, pages not reviewed, flows out of scope> |

## 2. Executive summary

<3 to 5 sentences: what was reviewed, overall state of the flow, the most important gaps, and the biggest unknowns.>

**Summary of evidence**

- Requirements identified: <n explicit>, <n provisional>
- Screens and states inventoried: <n> (<n> verified, <n> inferred, <n> missing from supplied evidence, <n> unknown)
- Transitions mapped: <n> (<n> verified, <n> inferred, <n> unknown)
- Findings: <n> (P0: <n>, P1: <n>, P2: <n>, P3: <n>)
- Unresolved decisions: <n>

These counts describe the supplied evidence. They do not measure completeness.

## 3. Evidence and assumptions

### Requirements

| ID | Requirement | Source | Status |
| --- | --- | --- | --- |
| R01 | <text> | <file, section> | Explicit |
| PR01 | <text> | <basis> | Provisional |

### Assumptions

| ID | Assumption | Reason | Impact if wrong |
| --- | --- | --- | --- |
| A01 | <text> | <why> | <impact> |

## 4. Screen inventory

| ID | Name (alias) | Purpose | Category | Actions | Evidence | Classification | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | <name> (<original label>) | <purpose> | <category> | <actions> | <source> | <classification> | <notes> |

## 5. Flow overview

<One paragraph describing the main path and key branches.>

```mermaid
<diagram following the Mermaid rules>
```

Legend: solid arrow = verified, dashed arrow = inferred, `?` label = condition unknown, dashed node border = missing from supplied evidence.

## 6. Transition inventory

| ID | Source | Trigger | Condition | Destination | Evidence | Classification | Related reqs | Uncertainty |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | S01 | <action> | <condition> | S02 | <source> | <classification> | R01 | <what would confirm> |

## 7. Prioritized findings

### F01: <Title>

| Field | Detail |
| --- | --- |
| Category | <category> |
| Priority | <P0 to P3>: <one-line justification> |
| Evidence | <sources> |
| Expected behavior | <text> (<R or PR ID>) |
| Observed behavior or limitation | <text> |
| User impact | <text> |
| Recommended fix | <text> |
| Classification and confidence | <classification>; <confidence if meaningful> |
| Validation steps | <steps> |
| Related IDs | <S and T IDs> |

<Repeat per finding. If none: "No significant gaps identified in the supplied evidence." followed by what was checked.>

## 8. Recommended fixes

| Priority | Finding | Fix | Affected screens |
| --- | --- | --- | --- |
| P1 | F01 | <short fix> | S03, S04 |

## 9. Developer-ready issues

<Include for P0 to P2 findings when useful. Use the developer-ready issue format.>

## 10. Validation checklist

- [ ] <Check derived from findings and requirements>

## 11. Unresolved decisions

| ID | Question | Why it matters | Suggested owner | Default if no answer |
| --- | --- | --- | --- | --- |
| Q01 | <question> | <impact> | <role, suggested> | <default> |

## 12. Scope and limitations

- This audit reviewed static design evidence. It does not verify live product behavior.
- <Evidence gaps, unreadable files, cropped areas, tools unavailable, pages not reviewed.>
- <Redaction note if sensitive data was found.>
- FlowGuard does not guarantee a flow is complete and does not replace usability testing.
````

## Quick report

```markdown
# FlowGuard Quick Review: <Product or module>

**Reviewed:** <evidence> | **Requirements:** <source or provisional> | **Mode:** Quick

## Context
<2 to 3 sentences on the journey as understood, including key assumptions.>

## Top findings
| ID | Priority | Finding | Evidence | Classification | Fix |
| --- | --- | --- | --- | --- | --- |
| F01 | P1 | <title> | <source> | <classification> | <fix> |

<Up to 5 findings. If none: "No significant gaps identified in the supplied evidence.">

## Recommendations
1. <action>

## Limitations
- <what was not verified, what would improve the review>
```

## Deep report additions

Add these sections after section 11 of the Standard report, renumbering Scope and limitations last:

- **Requirement traceability matrix**: each `R` or `PR` ID mapped to screens, transitions, and findings, with coverage status (Covered, Not found, Cannot determine, Conflict).
- **Branch analysis**: one subsection per decision point listing each outcome, its condition, its destination, and coverage.
- **Alternate entry points**: deep links, notifications, emails, other features; what each entry assumes and where it lands.
- **Edge-case matrix**: checklist categories applied, items checked, items skipped and why.
- **Requirement conflict log**: each conflict with both sources, design status, options, and decision owner.
- **Recovery path map**: for each failure state, the way back to the main path.

## Planning report (no designs)

Use when only a feature description or requirements exist.

```markdown
# FlowGuard Journey Plan: <Feature>

> No design evidence was supplied. This is a planning checklist, not an audit of existing screens.

## 1. Context and assumptions
## 2. Expected journey (provisional)
## 3. Flow diagram (proposed)
## 4. States to design
| Proposed ID | State | Why it is needed | Priority to design | Requirement status |
## 5. Edge cases to decide
## 6. Open questions
## 7. Next steps
```

## Diagram-only output

Provide the Mermaid diagram, the legend, and one limitations line, for example: "Transitions T03 and T07 are inferred from frame order; no prototype data was available."

## Developer-ready issue format

```markdown
### [FlowGuard F01] <Issue title>

**Problem:** <one paragraph>
**Affected states:** S03, T05
**Expected behavior:** <text>
**Acceptance criteria:**
- Given <context>, when <action>, then <outcome>.
**Test scenarios:**
1. <scenario>
**Source:** FlowGuard audit of <module>, finding F01 (<classification>).
```

Do not create tickets in external tools. The user can copy these.

## Mermaid rules

Follow these so diagrams render on GitHub and common Markdown viewers:

1. Start with `flowchart TD` (or `flowchart LR` for wide flows).
2. Use stable IDs as node IDs: `S01["Sign in"]`. Always quote labels.
3. Do not use parentheses, brackets, quotes, `#`, `;`, or `|` inside labels unless the label is quoted; avoid them anyway when possible.
4. Verified transition: `S01 -->|"Submit valid"| S02`.
5. Inferred transition: `S01 -.->|"Inferred: Next"| S02`.
6. Unknown condition: `S03 -.->|"?"| S05`.
7. Missing state: declare it and apply a class: `S09["Error state: not found"]:::missing`.
8. Entry and terminal nodes: `ENTRY(["Start: Home"])`, `END1(["Done: Account created"])`.
9. External handoffs: `EXT1[["Payment provider"]]`.
10. Add class definitions at the end:

```
classDef missing stroke-dasharray: 5 5,stroke:#b42318,fill:#fff4f2,color:#7a271a;
classDef unknown stroke-dasharray: 2 2,stroke:#667085,fill:#f2f4f7,color:#344054;
```

11. Keep it under about 40 nodes. For larger flows, draw one diagram per section.
12. No HTML, no em dashes, no smart quotes inside the diagram.

## JSON export schema

Produce JSON only when requested. Use this structure, include every top-level key (use empty arrays when nothing applies), and validate by parsing it before saving.

```json
{
  "schema": "flowguard-report",
  "schemaVersion": "1.0",
  "metadata": {
    "product": "string or null",
    "module": "string or null",
    "mode": "quick | standard | deep",
    "auditDate": "string or null",
    "accessMethods": ["string"],
    "coverageLimitations": ["string"]
  },
  "inputs": [
    { "source": "string", "type": "requirements | design | context | other", "status": "read | partially_read | unreadable | not_attempted", "notes": "string" }
  ],
  "requirements": [
    { "id": "R01", "text": "string", "source": "string", "status": "explicit | provisional" }
  ],
  "screens": [
    { "id": "S01", "name": "string", "aliases": ["string"], "purpose": "string", "category": "string", "actions": ["string"], "evidence": "string", "classification": "verified | inferred | missing_from_evidence | unknown", "notes": "string" }
  ],
  "transitions": [
    { "id": "T01", "source": "S01", "trigger": "string", "condition": "string", "destination": "S02", "evidence": "string", "classification": "verified | inferred | missing_from_evidence | unknown", "relatedRequirements": ["R01"], "uncertainty": "string" }
  ],
  "findings": [
    { "id": "F01", "title": "string", "category": "string", "priority": "P0 | P1 | P2 | P3", "priorityJustification": "string", "evidence": "string", "expected": "string", "observed": "string", "userImpact": "string", "recommendedFix": "string", "classification": "verified | inferred | missing_from_evidence | unknown", "confidence": "high | medium | low | null", "validationSteps": ["string"], "relatedIds": ["S01", "T01"] }
  ],
  "recommendations": [
    { "findingId": "F01", "priority": "P1", "action": "string" }
  ],
  "assumptions": [
    { "id": "A01", "text": "string", "reason": "string" }
  ],
  "unresolvedQuestions": [
    { "id": "Q01", "question": "string", "impact": "string", "suggestedOwner": "string or null" }
  ],
  "limitations": ["string"]
}
```

## Shareable HTML report

Every run also produces a shareable page unless the user opts out (see SKILL.md Step 6). Build it from [html-report-template.html](html-report-template.html):

- Same content and counts as the Markdown report. Quick mode keeps only summary, findings, and limitations.
- Copy each `REPEAT` block once per item and remove the marker comments. Replace every `{{PLACEHOLDER}}`; use `Not provided` for unknown metadata.
- Use the classification classes `c-verified`, `c-inferred`, `c-missing`, `c-unknown` and the priority classes `p0` to `p3` so labels look the same in every report.
- Escape `&`, `<`, and `>` in inserted text. Mermaid source goes inside `<pre class="mermaid">` unchanged, apart from escaping.
- Published page: delete the line marked `LOCAL FILE ONLY`, because the host renders Mermaid itself.
- Local `.html` file: keep that line and wrap the file in a full HTML document as the template comment describes.
- If there are no findings, replace the findings block with "No significant gaps identified in the supplied evidence." and what was checked.
