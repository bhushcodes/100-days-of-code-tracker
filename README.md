# 100 Days of Code Tracker

A community-driven hub for logging your 100 Days of Code journey. This repository makes it easy for developers to record daily progress, visualize streaks, and collaborate with others undertaking the challenge.

## Why this project exists
- Keep a persistent public log that motivates you to ship code every day
- Share highlights and resources with fellow participants
- Celebrate streaks with an automatically generated leaderboard
- Learn from starter templates and example logs contributed by the community

## Quick start
1. Fork this repository to your GitHub account.
2. Create a new branch for your contributions.
3. Add your log using the templates in [`templates/`](templates).
4. Run the tracker script to refresh the shared leaderboard (optional but encouraged).
5. Open a pull request with your updates.

### Requirements
- Python 3.10 or newer (for the automation script)
- `pip` for installing optional dependencies listed in [`requirements.txt`](requirements.txt)

### Setup at a glance
```bash
# Clone your fork
$ git clone https://github.com/<your-handle>/100-Days-of-Code-Tracker.git
$ cd 100-Days-of-Code-Tracker

# (Optional) work inside a virtual environment
$ python3 -m venv .venv
$ source .venv/bin/activate

# Install optional dependencies
$ pip install -r requirements.txt
```

## Repository layout
```text
.
├── README.md                 # Project overview and onboarding
├── CONTRIBUTING.md           # Contribution process
├── CODE_OF_CONDUCT.md        # Community expectations
├── LICENSE                   # MIT license
├── requirements.txt          # Python dependencies for scripts
├── scripts/
│   └── update_leaderboard.py # Aggregates logs and rebuilds the leaderboard
├── data/
│   └── leaderboard.json      # Script output consumed by docs and the website
├── docs/
│   └── LEADERBOARD.md        # Human-friendly leaderboard refreshed by the script
├── logs/
│   ├── users/                # Community progress logs (JSON format)
│   └── README.md             # Tips for maintaining logs
├── templates/                # Starter templates for logs and pull requests
└── website/                  # Lightweight dashboard that visualizes progress
```

## Logging your progress
1. Create a new JSON file in `logs/users/` named after your GitHub handle.
2. Copy the structure from [`templates/user-log-template.json`](templates/user-log-template.json).
3. Add or update entries as you complete each day. Include summaries, technologies, and any helpful resources.
4. Commit the file and submit a pull request.

Every log file is a single JSON document with two top-level keys:
- `user`: your GitHub username or preferred display name
- `entries`: an array of daily updates ordered chronologically

The tracker script computes statistics from these files, so keep dates in ISO 8601 format (`YYYY-MM-DD`).

## Leaderboard automation
Run the leaderboard refresher whenever you add or update logs:
```bash
$ python scripts/update_leaderboard.py
```
The script parses all files in `logs/users/`, calculates streaks, total days logged, last activity, and longest streak, then:
- Regenerates [`data/leaderboard.json`](data/leaderboard.json)
- Rebuilds [`docs/LEADERBOARD.md`](docs/LEADERBOARD.md)
- Updates the website dashboard data source

The script is idempotent and safe to re-run locally or in CI. You can wire it up with GitHub Actions later if your fork needs automated refreshes.

## Contributing
We love community contributions! Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for the workflow, coding standards, and review expectations. You'll also find:
- Issue templates and pull request guidelines
- Advice for keeping your log consistent
- Suggestions for adding new features or automation

Everyone participating agrees to follow our [Code of Conduct](CODE_OF_CONDUCT.md). If you witness or experience inappropriate behavior, reach out to the maintainers listed there.

## Roadmap
- GitHub Action to auto-run the leaderboard script on merged pull requests
- Optional RSS feed and social share integration for daily highlights
- Additional visualization layers (calendar heatmaps, tag clouds, etc.)

## License
Licensed under the [MIT License](LICENSE). Feel free to fork, remix, and build new experiences atop this tracker.
