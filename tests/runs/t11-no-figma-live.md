# T11 (no Figma tool variant) run output (fresh headless session)

Prompt: `/flowguard Review this Figma prototype using available connected tools: https://www.figma.com/design/FAKEFILEKEY123/Onboarding?node-id=1-2. Identify missing paths and explain what you could verify.`
Execution: `claude -p` (Claude Code CLI, logged in with claude.ai), 2026-10-27, run from the repository root as its own fresh session `18d7cd41-9fd2-416f-8b58-65fa084ca83a`. Flags: `--setting-sources project,local --strict-mcp-config --mcp-config '{"mcpServers":{}}'`. No MCP servers were connected, so no Figma tool was available.
Raw output below is the session's assistant text, unchanged except that em and en dashes were replaced with hyphens to keep the repository dash-free.

---

I've completed the FlowGuard review. Here's the honest result.

---

# FlowGuard Review - Onboarding

## Metadata

| Field | Value |
| --- | --- |
| Module | Onboarding |
| Mode | Standard |
| Audit date | 2026-10-27 |
| Requirements supplied | None |
| Design evidence supplied | One Figma link (not retrievable - see below) |
| Screens audited | 0 |
| Transitions verified | 0 |

## What I could actually verify

Only one thing, and it is about the link, not the design:

- **The URL is well-formed.** It parses as a Figma *design* URL with file key `FAKEFILEKEY123` and node `node-id=1-2`. That is the full extent of what the evidence supports.
- The file key `FAKEFILEKEY123` has the shape of a **placeholder**, not a real Figma file key, so even a connected tool would likely return "not found." I'm flagging this as an observation, not a certainty.

## What I could not verify (and why)

| Attempted | Result |
| --- | --- |
| Detect a connected Figma tool | **None found.** No Figma MCP tools (`get_metadata`, `get_screenshot`, `get_design_context`, etc.) are present in my available toolset. |
| `DesignSync` as a fallback | Not applicable - it reads/writes *claude.ai design-system projects*, not Figma files. |
| Fetch the link directly | `WebFetch` permission was not granted, and Figma design URLs require authentication and would not return design content regardless. |

**Net result:** I retrieved **no** frames, screenshots, or prototype interaction data. I inspected **zero** screens and verified **zero** transitions. I therefore cannot identify missing paths *in your design* - I can only describe the paths an onboarding flow of this kind typically needs, so you have a checklist to audit against once the design is accessible.

Per FlowGuard's rules: this is *missing evidence*, **not** a defect in your product. I am not claiming anything is wrong with your onboarding.

## Provisional expected journey (for planning only)

Everything below is **`Provisional`** - inferred from the module name "Onboarding," not from your requirements or design. Treat it as a checklist, not a specification.

- **User goal** `A01`: A new user completes account setup and reaches the product's first useful state.
- **Entry points** `A02`: Sign-up CTA, invite/email link, deep link, SSO redirect return.
- **Main path** `PR01`: Entry → account creation → identity/email verification → profile or workspace setup → permissions/consent → first-run guidance → success/home.
- **Success condition** `A03`: Account active, verified, landed in the product.

## Paths an onboarding flow commonly needs - audit these when the design is available

| ID | Path / state | Why it is commonly missing |
| --- | --- | --- |
| PR02 | Email/OTP verification **failure + resend** | Happy path often drawn, retry/expired-code path omitted. |
| PR03 | **Already-registered** account (sign-up with existing email) | Branch frequently undesigned. |
| PR04 | **SSO / third-party auth failure or cancel** return | External handoff rarely has a return-failure frame. |
| PR05 | **Back / exit / resume** mid-flow | Partial-progress save and resume often undefined. |
| PR06 | **Permission denied** (notifications, camera, location) | Only the "granted" path usually exists. |
| PR07 | **Network error / loading / timeout** states | Loading and error states commonly missing. |
| PR08 | **Skip / optional-step** handling | Unclear whether steps are skippable and where skip leads. |
| PR09 | **Empty first-run state** after completion | Success screen present, but the landed-in state is blank or undefined. |
| PR10 | **Terms/consent decline** branch | Only the "accept" path is typically drawn. |

## Scope and limitations

- No requirements (PRD, stories, acceptance criteria) were provided.
- No readable design evidence was available; no screens or transitions were examined.
- The journey and path list above are **provisional conventions**, not findings, and must not be read as defects.
- No shareable page was published - there is no evidence-backed audit to put on one yet. I can publish one once there's real content.

## To get a real audit, send me any one of these

1. **PNG/PDF exports** of the onboarding frames, or screenshots.
2. A **corrected Figma link** to a file shared with a connected Figma account (and a connected Figma tool enabled in your settings) - the current key `FAKEFILEKEY123` looks like a placeholder.
3. A **text description** of each screen and its buttons.
4. Optionally, a **PRD or user stories** so I can audit against your real requirements instead of provisional ones.

---

**Summary:** I reviewed the request against my available tools. I found **no connected Figma tool**, and the link's file key (`FAKEFILEKEY123`) looks like a placeholder, so I retrieved no design and audited zero screens - I will not invent findings. What I *could* verify is only that the URL is a well-formed Figma design link. I've given you a provisional onboarding journey and a 10-item path checklist to audit against. Send exports, a working link, or screen descriptions and I'll run the real review. No files were saved and no page was published.
