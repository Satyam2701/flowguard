# Migration guide: set up FlowGuard on a new Mac

The project has no database, no environment variables and no secrets, so GitHub holds everything needed to continue. Steps assume a fresh Mac.

## 1. Install the tools

Install Homebrew (see https://brew.sh), then:

```bash
brew install git gh node
```

Install Claude Code (current instructions: https://code.claude.com/docs):

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Optional, for test checks: `python3` (preinstalled on macOS or `brew install python`).

## 2. Connect GitHub

```bash
gh auth login
```

Choose GitHub.com, HTTPS, and sign in as **Satyam2701**. Then let git use that login:

```bash
gh auth setup-git
```

Set your commit identity (private no-reply email):

```bash
git config --global user.name "Satyam Tiwari" && git config --global user.email "34920689+Satyam2701@users.noreply.github.com"
```

## 3. Clone and set up

```bash
git clone https://github.com/Satyam2701/flowguard.git ~/Desktop/flowguard && cd ~/Desktop/flowguard && ./scripts/setup-new-machine.sh
```

The script checks your tools, sets the repo's commit identity, and installs the skill for your user account (it never overwrites an existing install).

## 4. Restore Claude configuration

- **The skill:** installed by the script into `~/.claude/skills/flowguard`. Alternatively `npx flowguard-skill`.
- **Project instructions:** `CLAUDE.md` in the repo loads automatically when you open Claude Code in this folder.
- **Log in to Claude Code:** run `claude`, then `/login`.
- **Figma (optional):** reconnect the Figma connector in your Claude settings if you want FlowGuard to read Figma files.
- **Chat history does not migrate.** The knowledge from it is in `CLAUDE.md` and `docs/`.

## 5. Publishing access (only to release new versions)

```bash
npm login
```

Sign in as `satyam2701`. Release steps are in `CLAUDE.md`.

## 6. Check everything works

```bash
cd ~/Desktop/flowguard && claude
```

Then type:

```text
/flowguard Quick review of tests/fixtures/t02-missing-error/screens.md against tests/fixtures/t02-missing-error/requirements.md.
```

Expected: two P1 findings (missing wrong-password error, missing account-locked state).
