# Contributing to 100 Days of Code Tracker

Thanks for helping build a welcoming space for everyone joining the 100 Days of Code challenge. These guidelines keep contributions smooth, transparent, and friendly for newcomers.

## How to contribute
1. **Fork** the repository and create a new branch (`feature/amazing-idea`).
2. **Sync** with `main` regularly to avoid merge conflicts.
3. **Follow** the project conventions described below.
4. **Run** the leaderboard script when you update logs or data.
5. **Open** a pull request (PR) with a clear description of your change and screenshots when helpful.

## Project conventions
- Write logs as JSON using the structure in [`templates/user-log-template.json`](templates/user-log-template.json).
- Keep dates in ISO 8601 format (`YYYY-MM-DD`).
- Update documentation when behavior or workflows change.
- Keep code comments short and focused on intent when the logic is not obvious.
- Prefer descriptive commit messages (e.g., `Add day 07 log` instead of `Update file`).

## Pull request checklist
- [ ] All tests or scripts that you touched still run successfully (`python scripts/update_leaderboard.py`).
- [ ] `docs/LEADERBOARD.md` and `data/leaderboard.json` were regenerated if logs changed.
- [ ] Documentation was updated if necessary.
- [ ] The PR description links to related issues (if any).

## Reporting issues or proposing features
- Use the GitHub issue tracker with the templates in the `.github/ISSUE_TEMPLATE/` folder.
- Provide context: what problem are you solving? How would success look?
- Tag issues with labels such as `good first issue`, `help wanted`, or `enhancement` to help others explore.

## Community expectations
All participants must follow our [Code of Conduct](CODE_OF_CONDUCT.md). If you notice behavior that violates the policy, please contact the maintainers at `maintainers@100daysofcode-tracker.dev`.

## Development setup
- Python 3.10+
- Optional: Node.js 18+ if you plan to extend the website dashboard
- Recommended: `pre-commit` hooks to catch formatting issues locally

Once your PR is merged, celebrate your progress and keep coding!
