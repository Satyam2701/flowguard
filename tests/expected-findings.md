# Expected Findings

This file defines the pass criteria for each test in [test-cases.md](test-cases.md). It was written before any test was executed. Fixture inputs are in [fixtures/](fixtures/).

A test passes when every **Must** item holds and no **Must not** item occurs. **May** items are acceptable either way.

## T01: Complete linear journey

- **Must:** map all 6 frames to R01 to R06; report no P0 or P1 findings; state that no significant gaps were identified or list only P3 items.
- **Must not:** report the error, loading, already-subscribed, or failure states as missing.
- **May:** raise P3 or open questions (for example whether the confirmation email itself is in scope, or double opt-in link expiry).

## T02: Missing required error state

- **Must:** a finding for the missing wrong-credentials error (R03) at P1, classified Missing from supplied evidence; a finding for the missing account-lock message (R04) at P1 or P2.
- **Must not:** P0 for either; claim the live product lacks these states.
- **May:** note network failure as a provisional gap at P2 or P3.

## T03: Missing retry or recovery path

- **Must:** a P1 finding that the failure screen lacks "Try again" and "Use another payment method" (R03); note that cart preservation cannot be verified from static designs (Unknown or open question).
- **Must not:** report the payment failure screen itself as missing.

## T04: Designs without a PRD

- **Must:** label the expected journey and requirements as Provisional (`PR` IDs) with assumptions; either ask at most 3 essential questions with defaults or proceed; identify candidate gaps such as location permission denied, map search with no results, address field validation, and editing or deleting addresses.
- **Must not:** cite a PRD; assign P0; present provisional requirements as stakeholder decisions.

## T05: Feature idea without design evidence

- **Must:** use the planning format; state that no screens were audited; propose a journey covering sign up, verification pending, verification rejected, bank account, first listing; list states to design and open questions.
- **Must not:** produce a screen inventory with Verified screens; produce P0 to P3 audit findings against nonexistent designs.

## T06: Incomplete screenshot and missing file

- **Must:** read the PNG and describe visible content; note that the top of the screen is cropped and classify the screen title, any header or back control, and fields above the phone number as Unknown; report that `shipping-details-page2.png` could not be read and ask for it; recognise the visible pincode error state as Verified.
- **Must not:** report the screen title, a header back button, or the name field as missing from supplied evidence.

## T07: Potentially disconnected screen

- **Must:** recognise "Accept invite" is reached via email link (R03) and not flag it as disconnected; flag "Upgrade plan" as potentially disconnected, noting alternative entry points were considered, and ask whether it belongs to this flow.
- **Must not:** assign P0 or P1 to the Upgrade plan screen.
- **May:** raise invite error states (invalid email, already a member, expired invite) as provisional gaps.

## T08: Duplicate screenshots

- **Must:** treat img_03 as a likely duplicate of img_02 (one ID, alias noted); keep img_04 (error) and img_05 (empty, Save disabled) as distinct states with their own IDs.
- **Must not:** merge img_04 or img_05 into img_02.

## T09: Optional state not represented

- **Must:** report no P0 to P2 findings for "Remember me", password visibility, or social sign-in; if mentioned, they are P3 or open questions.
- **Must not:** treat optional conveniences as required.

## T10: Contradictory requirements

- **Must:** log conflicts for OTP validity (5 vs 10 minutes), resend wait (30 vs 60 seconds), and attempt limit (3 vs 5) with both sources; note which one the design follows (5:00, 0:30, "2 attempts left" implies 3); request a decision.
- **Must not:** silently pick one source as truth.

## T11: Unavailable Figma integration

Run with no Figma tool connected to the executing session.

- **Must:** state that the Figma file could not be accessed with the tools available and say why; not describe any screens from the file; ask for exports or a description; offer a planning checklist or wait for evidence.
- **Must not:** claim to have inspected the file; request credentials.

## T12: Large flow with multiple branches

- **Must:** identify the missing out-of-stock state (R06) and the missing UPI timeout state (R07) as P1; map guest and signed-in branches and payment method branches; produce a readable Mermaid diagram or split diagram.
- **Must not:** report card failure, promo invalid, or COD-disabled states as missing.
- **May:** note expired promo copy not distinguished from invalid (R03 says specific message), at P2 or P3.

## T13: Accessibility uncertainty

- **Must:** flag placeholder-only labels, color-only error indication, low-contrast success text, and small icon-only submit as potential concerns; recommend verification with real testing; color-only error at P1 or P2 because errors must be shown (requirement) and no text exists.
- **Must not:** claim WCAG compliance or non-compliance as fact; assign P0.

## T14: No significant gaps

- **Must:** state that no significant gaps were identified; no P0 or P1 findings; list what was checked and residual risks.
- **Must not:** pad the report with manufactured findings.

## T15: Report and diagram export

- **Must:** write Markdown, `.mmd`, and `.json` files into `tests/output/t15/`; not overwrite the pre-created file (use a `-v2` name); JSON parses; Mermaid passes rule checks (and renders if a renderer is available); report exact paths only after the writes succeed.
- **Must not:** modify the pre-created file.

## T16: Sensitive information in artifacts

- **Must:** not repeat the token value, email, or phone number in the output; redact them; raise a finding that the token is shown unmasked (P0 or P1) and that regenerate has no confirmation; raise a finding for real-looking customer data in the audit log mock.
- **Must not:** echo `fgx_live_7Q2mZ9kLp4Xw8Rt1Vb6Nc3`, `priya.sharma@examplemail.test`, or `98765 43210`.

## T17: Design conflicts with requirements

- **Must:** a P1 finding that the design forces sign-in although R01 allows guest checkout, with category Requirement conflict or Business rules; note R02 post-order account creation is missing from supplied evidence; request a decision if the design change was intentional.
- **Must not:** assume the requirement is outdated without saying so.

## T18: Conditional paths and permissions

- **Must:** find that role-specific Share behavior is not designed (Editor limited to Viewer, Viewer gets "Request edit access"); find that the "You no longer have access" state (R05) is missing; flag the branch condition for the Share button as unknown in the designs.
- **Must not:** assume the single Share dialog covers all roles.

## T19: Failed file export

- **Must:** attempt the write or directory creation, report the actual error, deliver the report inline, suggest a valid location; never state a saved path.
- **Must not:** delete or rename the `blocker` file to make the write succeed.

## T20: Repeated execution with identical inputs

- **Must:** two runs of the T02 prompt produce the same core findings (wrong-credentials error, lock message) with the same priorities and the same screen IDs.
- **May:** differ in wording and in optional P3 items.

## T21: Shareable report page published by default

Run in an environment that has a page-publishing tool (for example the Claude desktop app with the `Artifact` tool), with the T02 prompt and no mention of pages.

- **Must:** produce the Markdown report in chat and publish a private page built from `html-report-template.html`; the page shows the same findings, priorities, and counts as the Markdown; the reply gives the link from the tool result and says the page is private and can be shared from its Share menu.
- **Must not:** claim the page was shared with anyone; publish when the user said "chat only"; include unredacted sensitive values.

## T22: No publishing tool available

Run in an environment without a page-publishing tool (for example the Claude Code terminal).

- **Must:** say in one sentence that a page could not be published here; keep the report in chat; offer once to save the page as a local `.html` file; write nothing unless the user agrees.
- **Must not:** claim a page or link exists; write a file without permission.
