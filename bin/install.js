#!/usr/bin/env node
// FlowGuard installer: copies the Claude Code skill into a skills folder.
// No dependencies. Never overwrites an existing install unless --force is given,
// and even then the old copy is kept as a backup.

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL = "flowguard";
const source = path.join(__dirname, "..", ".claude", "skills", SKILL);
const pkg = require(path.join(__dirname, "..", "package.json"));

const args = process.argv.slice(2);
const has = (...flags) => flags.some((f) => args.includes(f));

const HELP = `FlowGuard ${pkg.version}: catch missing paths before development.

Usage:
  npx ${pkg.name}              Install for you, in every project (~/.claude/skills)
  npx ${pkg.name} --project    Install into this project only (./.claude/skills)
  npx ${pkg.name} --force      Replace an existing install (the old copy is backed up)
  npx ${pkg.name} --uninstall  Remove FlowGuard (add --project for the project copy)
  npx ${pkg.name} --help       Show this help
`;

function fail(message) {
  console.error(`\nFlowGuard: ${message}\n`);
  process.exit(1);
}

if (has("--help", "-h")) {
  console.log(HELP);
  process.exit(0);
}

const unknown = args.filter((a) => !["--project", "-p", "--force", "-f", "--uninstall"].includes(a));
if (unknown.length) fail(`unknown option ${unknown.join(" ")}\n\n${HELP}`);

const project = has("--project", "-p");
const base = project ? path.join(process.cwd(), ".claude", "skills") : path.join(os.homedir(), ".claude", "skills");
const target = path.join(base, SKILL);
const where = project ? "this project" : "your user account";

function readVersion(dir) {
  try {
    const text = fs.readFileSync(path.join(dir, "SKILL.md"), "utf8");
    const m = text.match(/^\s*version:\s*([^\s]+)/m);
    return m ? m[1] : "unknown";
  } catch {
    return null;
  }
}

// Backups live outside the skills folder, so Claude Code never loads them as a second skill.
function backupName() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(base, "..", `${SKILL}-backups`, stamp);
}

if (!fs.existsSync(path.join(source, "SKILL.md"))) {
  fail("the skill files are missing from this package. Please reinstall the package.");
}

try {
  if (has("--uninstall")) {
    if (!fs.existsSync(target)) {
      console.log(`\nFlowGuard is not installed for ${where} (${target}). Nothing to remove.\n`);
      process.exit(0);
    }
    fs.rmSync(target, { recursive: true });
    console.log(`\nRemoved FlowGuard from ${target}.\n`);
    process.exit(0);
  }

  const installed = readVersion(target);
  if (installed !== null) {
    if (!has("--force", "-f")) {
      console.log(
        `\nFlowGuard ${installed} is already installed at ${target}.\n` +
          `Nothing was changed. To replace it with ${pkg.version}, run:\n\n  npx ${pkg.name}${project ? " --project" : ""} --force\n\n` +
          `Your current copy will be kept as a backup.\n`
      );
      process.exit(0);
    }
    const backup = backupName();
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.renameSync(target, backup);
    console.log(`Backed up the existing copy to ${backup}`);
  }

  fs.mkdirSync(base, { recursive: true });
  fs.cpSync(source, target, { recursive: true });
} catch (err) {
  fail(`could not write to ${target}.\n${err.message}`);
}

console.log(`
FlowGuard ${pkg.version} installed for ${where}:
  ${target}

Next:
  1. Start a new Claude Code session (skills load when a session starts).
  2. Type /flowguard followed by what to review, for example:
     /flowguard Review ./designs/checkout.pdf against ./docs/prd.md
`);
