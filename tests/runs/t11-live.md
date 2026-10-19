# T11 live run

Prompt: `/flowguard Review this Figma prototype using available connected tools: https://www.figma.com/design/FAKEFILEKEY123/Onboarding?node-id=1-2. Identify missing paths and explain what you could verify.`
Execution method: live `/flowguard` invocation through the Skill tool (shared session; see test-cases.md).
Date: 2026-10-19

Environment condition: a Figma MCP server WAS connected in this session (it exposes `get_metadata`, `get_screenshot`, `get_design_context`, and related tools). The planned condition for T11 (no Figma tool connected) could therefore not be reproduced here. The run exercised the access-failure path instead.

Real tool call made during the run:

- `get_metadata` with `fileKey: "FAKEFILEKEY123"`, `nodeId: "1:2"` returned: `Invalid fileKey argument`.

No further Figma calls were made. The tool's own parameter rules require a file key of 22 to 128 letters and digits; the supplied key has 14 characters, so the link is malformed for this tool and retrying with a guessed key would not be meaningful.

---

# FlowGuard Quick Review: Onboarding (Figma)

**Reviewed:** nothing; the Figma file could not be accessed | **Requirements:** None supplied | **Mode:** Quick

## Context
You asked me to review a Figma prototype with the connected tools. A Figma tool is connected in this session, and I made one lightweight metadata call for node 1:2. It failed with "Invalid fileKey argument". The file key in the link ("FAKEFILEKEY123") is shorter than the 22-character minimum the Figma tool accepts, so the link appears malformed or truncated. I did not retrieve any frames, screenshots, or prototype connections, so I cannot describe any screens or verify any paths.

## Top findings

None. No design evidence was accessible, so no audit findings can be made.

## Recommendations
1. Copy the link again from Figma (Share, then Copy link) and send the full URL; a valid design file key is at least 22 characters.
2. If the file is private, share it with the account connected to the Figma integration. I will not ask for passwords or tokens, and I have not changed any connection settings.
3. Or send PNG or PDF exports of the onboarding frames, or a short text description of each screen, and I will audit those.
4. If you prefer to start now, I can produce a provisional onboarding planning checklist (expected journey and states to design) clearly marked as not an audit.

## Limitations
- What was verified: only that the Figma tool is connected and rejected the supplied file key. Nothing about the file's content was verified.
- Prototype interactions, frames, and node 1:2 were not retrieved.
- Audit date: Not provided by the user.

---

Summary: Figma access failed with "Invalid fileKey argument" on one `get_metadata` call; no screens were described or audited. Asked for a corrected link, file sharing with the connected account, or exports. No credentials requested. No files were saved.
