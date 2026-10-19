# T11 run output

Prompt: `/flowguard Review this Figma prototype using available connected tools: https://www.figma.com/design/FAKEFILEKEY123/Onboarding?node-id=1-2. Identify missing paths and explain what you could verify.`
Execution method: manual execution of SKILL.md in the authoring session. Unlike the planned setup (no Figma tool), this session **did** have the official Figma MCP server connected, so the test exercised the real access-failure path instead. Raw tool responses are quoted below.

## Tool calls made

1. `get_metadata(fileKey="FAKEFILEKEY123", nodeId="1:2")` returned: `Invalid fileKey argument`.
2. To check the next failure mode, a 24-character fictional key was tried: `get_metadata(fileKey="FAKEFILEKEY1234567890XYZ", nodeId="1:2")` returned: "Looks like you don't have edit access to this file. The file owner can share it with you and make you an editor." plus a debug UUID.

---

I could not access the Figma file.

- A Figma tool is connected in this session, but it rejected the file key in the link as invalid (`Invalid fileKey argument`). Figma file keys are normally 22 or more characters; the key in this link is 14, so the link may be truncated or mistyped.
- Nothing from the file was retrieved: no frames, no screenshots, no prototype interactions. I have not reviewed any screens and cannot report gaps in them.

To continue, any of these works:

1. Paste the full Figma link again (from Share > Copy link). If the file is private, the connected Figma account needs access to it. The connected Figma server reported that it requires edit access for files it cannot open.
2. Export the frames as PNG or PDF and give me the file paths.
3. Describe each screen in text (name, purpose, buttons).

If you prefer, I can start now with a planning checklist for an onboarding flow and audit the designs when they are available.

I did not request or change any credentials.
