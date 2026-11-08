# Decision log

All entries VERIFIED from the build conversation and git history.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-10-19 | Build as a project skill at `.claude/skills/flowguard/` with references loaded on demand | Official skill convention; keeps SKILL.md short |
| 2026-10-19 | Four evidence labels and capped priorities (no P0 on guesses) | Spec requires honesty about static evidence |
| 2026-10-19 | MIT license | Spec asked for a common permissive license when none existed |
| 2026-10-19 | Markdown manual test suite; 20 scenarios with expectations written before runs | Spec allows manual suite; reduces grading bias |
| 2026-10-19 | Round 1 tests run by hand when the skill could not load mid-session; documented as such | Never claim untested results |
| 2026-10-19 | Fixes from tests: recount summary counts; JSON exports must be complete; version all export files together | T12 and T15 defects |
| 2026-10-20 | Private GitHub repo under `Satyam2701`; commits use the GitHub no-reply email | Owner's choice; GitHub blocked pushes exposing the private email |
| 2026-10-20 | Remove AI co-author lines from history (amended and force-pushed the single commit, with approval) | Owner request |
| 2026-10-27 | Add shareable report page as default Step 6, private by default, ask first for confidential material, local HTML fallback | Owner wants findings shareable; not every environment can publish |
| 2026-10-27 | Do not web-fetch Figma links; skip the page when nothing could be read | Observed in fresh-session T11 run |
| 2026-10-28 | npm installer `flowguard-skill` (zero dependencies), backups outside the skills folder | Copy-folder install was too hard; a backup inside skills would load as a duplicate skill |
| 2026-10-28 | Published `flowguard-skill@1.0.0` to npm (by owner) and made the repo public | Release |
| 2026-10-28 | GitHub CLI uses only the `Satyam2701` account; global git email set to the no-reply address | Owner request |
| 2026-10-28 | Kept "Claude Code" platform mentions; reworded test notes that implied an AI author | Owner asked to remove the assistant's name; platform names are needed for users |
