# Status and pending tasks

As of 2026-11-08.

## Current state (VERIFIED)

- **Released:** v1.0.0 on GitHub (tag `v1.0.0`, release notes published) and npm (`flowguard-skill@1.0.0`, maintainer `satyam2701`). Repo is public.
- **Tests:** 22 of 22 scenarios have a recorded pass (see `tests/test-cases.md`). T01 to T19 ran live in one shared session; T11, T20, T22 ran in their own fresh `claude -p` sessions; T21 ran live. Grading was done by the build session, not an independent reviewer.
- **Real-world use:** audited the owner's Boring Rituals Figma file (15 pages) through the Figma MCP server; result shared as a private claude.ai page.
- **Repo metadata:** description, npm homepage link and 14 topics set on GitHub.

## Pending tasks

| Priority | Task | Status |
| --- | --- | --- |
| High | Decide whether to keep the name. Another open-source "FlowGuard" (github.com/liuyingxuvka/FlowGuard) checks AI-agent and UI flows. Renaming later means a new npm package and repo. Formal trademark searches (IP India, USPTO, WIPO, classes 9 and 42) not yet done by the owner. | NEEDS OWNER DECISION |
| Medium | Test with real image and PDF exports (only a generated PNG and text fixtures so far) | Open |
| Low | Optionally re-run T01 to T19 each in its own fresh session | Open |
| Low | Optional Claude Code plugin or marketplace packaging | UNKNOWN if wanted |
| Low | Delete the T21 test page on claude.ai if no longer needed | Owner choice |

## Known limitations

- Figma MCP does not return prototype connections; FlowGuard infers links from hotspot layer names and labels them Inferred.
- How published pages render inside claude.ai has not been visually checked; the local HTML version was verified.
- Two runs on the same input can differ in wording and optional P3 items.
