#!/usr/bin/env bash
# Set up FlowGuard development on a new Mac. Safe to run more than once:
# it only checks tools, sets this repo's git identity, and installs the skill
# without overwriting an existing copy.
set -u

cd "$(dirname "$0")/.." || exit 1
missing=0

check() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "ok       $1 ($($1 --version 2>/dev/null | head -1))"
  else
    echo "MISSING  $1: $2"
    missing=1
  fi
}

echo "Checking tools..."
check git "brew install git"
check gh "brew install gh"
check node "brew install node (18.17 or newer)"
check claude "see https://code.claude.com/docs"
check python3 "optional: brew install python"

if command -v gh >/dev/null 2>&1; then
  if gh auth status >/dev/null 2>&1; then
    echo "ok       GitHub login: $(gh api user --jq .login 2>/dev/null)"
  else
    echo "TODO     run: gh auth login   (then: gh auth setup-git)"
  fi
fi

echo
echo "Setting commit identity for this repo..."
git config user.name "Satyam Tiwari"
git config user.email "34920689+Satyam2701@users.noreply.github.com"
echo "ok       $(git config user.name) <$(git config user.email)>"

echo
if command -v node >/dev/null 2>&1; then
  echo "Installing the skill for your user account..."
  node bin/install.js
else
  echo "Skipped skill install: Node.js is missing."
fi

echo
if [ "$missing" -eq 1 ]; then
  echo "Install the missing tools above, then run this script again."
else
  echo "Done. Next: run 'claude' in this folder (use /login if asked), and read CLAUDE.md."
fi
