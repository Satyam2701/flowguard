# State and Edge-Case Checklist

Apply contextually. For each category, check the **Applies when** trigger first. If it does not apply, skip the category. A missing item becomes a candidate gap only if it is relevant to this flow and its absence has user impact.

Each item lists a question to ask of the evidence.

## Contents

- [Navigation](#navigation)
- [Forms](#forms)
- [System behavior](#system-behavior)
- [Authentication and permissions](#authentication-and-permissions)
- [Conditional branches](#conditional-branches)
- [Recovery](#recovery)
- [Business rules and data](#business-rules-and-data)
- [Destructive and sensitive actions](#destructive-and-sensitive-actions)
- [Multi-role and multi-device](#multi-role-and-multi-device)
- [Accessibility and usability](#accessibility-and-usability)
- [Optional versus required states](#optional-versus-required-states)

## Navigation

**Applies when:** always.

- Entry point: how does the user arrive? Are alternate entry points (deep link, email, notification, search) accounted for?
- Next step: does every non-terminal screen have a clear forward action?
- Back navigation: can the user go back without losing work? What happens to entered data?
- Cancellation and exit: can the user leave mid-flow? Where do they land?
- Terminal state: is the end of the journey clear, with a sensible next action?
- Disconnected screens: is any screen unreachable from the known entry points?
- Unexplained transitions: does any jump lack a trigger or condition?

## Forms

**Applies when:** the flow collects user input.

- Empty input: what happens if the user submits with nothing entered?
- Required-field validation: are required fields marked, and is the error shown?
- Invalid formats: email, phone, dates, numbers, file types.
- Boundary conditions: min and max length, ranges, limits, file size.
- Duplicate submission: is the submit action protected from double taps?
- Disabled actions: is it clear why an action is disabled and how to enable it?
- Lost data: is input preserved on error, back navigation, or interruption?
- Recovery after validation errors: can the user fix and resubmit easily?

## System behavior

**Applies when:** the flow calls a server, processes data, or waits on anything.

- Loading: is there feedback while waiting?
- Success: is success confirmed?
- Empty state: what shows when there is no data yet?
- Error: is a failure state designed, with a useful message?
- Timeout and network failure: what does the user see offline or on timeout?
- Retry: can the user retry a failed operation?
- Partial success: some items succeed and some fail; is that represented?
- Delayed responses: long-running processes, pending or "in review" states.
- Duplicate requests: is the outcome safe if a request is sent twice?
- Interrupted operations: app closed, session lost, or call dropped mid-operation.

## Authentication and permissions

**Applies when:** the flow requires an account, roles, or protected data.

- Unauthenticated users: what happens if a signed-out user lands here?
- Expired sessions: what happens mid-flow? Is entered data preserved?
- Insufficient permissions: is there an access-denied state with a next step?
- Restricted or suspended accounts.
- Reauthentication for sensitive actions where relevant.

## Conditional branches

**Applies when:** the flow has decisions, eligibility rules, or variable outcomes.

- Valid versus invalid input.
- Eligible versus ineligible users.
- Accepted versus rejected requests (approvals, verification, reviews).
- Available versus unavailable resources (stock, slots, features).
- Confirmed versus cancelled operations.
- First-time versus returning users.
- For each branch: is the condition stated, and is each outcome designed?

## Recovery

**Applies when:** the flow has more than one step or can fail.

- Return to previous steps and edit entered information.
- Retry failed operations.
- Resume interrupted journeys (save progress, resume later).
- Recover from timeouts.
- Handle stale or expired links (email links, invites, reset tokens).
- Contact support or alternative path when recovery fails.

## Business rules and data

**Applies when:** the requirements or domain imply rules, limits, or persisted data.

- Missing required data from earlier steps or other systems.
- Conflicting values (for example two addresses, two prices).
- Invalid state transitions (approving an already cancelled item).
- Persistence: what is saved, and when?
- Duplicate records (signing up twice with the same email).
- Unavailable dependencies (third-party service down).
- Unclear operation ownership (who completes or approves a step).
- Conflicting business rules across sources.

## Destructive and sensitive actions

**Applies when:** the flow deletes, sends, pays, publishes, shares, or exposes sensitive data.

- Confirmation before irreversible actions.
- Cancellation consequences explained.
- Unsaved changes warning.
- Permission restrictions on who can perform the action.
- Sensitive-data exposure in screens, logs, or shared views (masking, partial display).
- Reversible versus irreversible: is undo offered where feasible?

## Multi-role and multi-device

**Applies when:** more than one role participates, or the product runs on several platforms.

- Different roles see appropriate screens and actions.
- Mobile versus desktop differences and responsive behavior.
- Cross-session or cross-device recovery (start on mobile, finish on desktop).
- External system handoffs and the return path (payment, identity, email, app switch).

## Accessibility and usability

**Applies when:** always, but limited to what static evidence can show.

- Error feedback: is it specific and placed near the problem, not color alone?
- Labels: do inputs have visible labels, not placeholder-only?
- Focus and navigation risks: modals, multi-step forms, focus after errors.
- Status feedback: are loading, success, and error states announced in text, not only visuals?
- Potential contrast or target-size concerns visible in the evidence.
- Keyboard interaction considerations for web and desktop flows.

Static designs cannot prove accessibility compliance. Report these as potential concerns with `Inferred` or `Unknown` classification and recommend verification with real testing (screen reader, keyboard, contrast checker). Never state that a design is compliant with WCAG or any other standard.

## Optional versus required states

Not every flow needs every state. Before flagging, ask:

1. Is the state required by an explicit requirement? If yes, it can be a P0 to P2 finding.
2. Is it needed for the user to complete or safely abandon the goal? If yes, it can be P1 or P2.
3. Is it a polish or convenience state (for example "remember me", tooltips, celebratory animation)? If yes, it is at most P3, or an open question.
4. Is it only a nice-to-have that the team may have deliberately excluded? Put it in Unresolved decisions rather than findings.
