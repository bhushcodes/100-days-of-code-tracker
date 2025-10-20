#!/usr/bin/env python3
"""Aggregate user logs and rebuild leaderboard artifacts.

This script parses JSON logs in ``logs/users`` and produces three outputs:

1. ``data/leaderboard.json``: machine-friendly data with user metrics
2. ``docs/LEADERBOARD.md``: Markdown table for quick browsing in GitHub
3. ``website/data/leaderboard.json``: data source for the web dashboard

Run locally before opening a pull request whenever you modify logs. The script
is idempotent, fast, and only relies on Python's standard library.
"""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from textwrap import shorten
from typing import Iterable, List

REPO_ROOT = Path(__file__).resolve().parents[1]
LOGS_DIR = REPO_ROOT / "logs" / "users"
DATA_DIR = REPO_ROOT / "data"
DOCS_DIR = REPO_ROOT / "docs"
WEBSITE_DATA_DIR = REPO_ROOT / "website" / "data"
DATE_FMT = "%Y-%m-%d"


class TrackerError(Exception):
    """Raised when a log file is malformed."""


@dataclass
class Entry:
    day: int
    date_value: date
    summary: str


@dataclass
class UserStats:
    user: str
    total_days: int
    current_streak: int
    longest_streak: int
    active_streak: bool
    last_update: date | None
    first_day: date | None
    highlight: str
    days_since_update: int | None

    def to_dict(self) -> dict:
        return {
            "user": self.user,
            "total_days": self.total_days,
            "current_streak": self.current_streak,
            "longest_streak": self.longest_streak,
            "active_streak": self.active_streak,
            "last_update": self.last_update.isoformat() if self.last_update else None,
            "first_day": self.first_day.isoformat() if self.first_day else None,
            "highlight": self.highlight,
            "days_since_update": self.days_since_update,
        }


def main() -> None:
    try:
        stats = load_all_stats(LOGS_DIR.glob("*.json"))
    except TrackerError as exc:  # pragma: no cover - fatal errors show clearly
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)

    if not stats:
        print("No logs found. Add files to logs/users/ and rerun.")
        return

    stats.sort(
        key=lambda item: (
            -item.current_streak,
            -item.longest_streak,
            item.days_since_update if item.days_since_update is not None else float("inf"),
            item.user.lower(),
        )
    )

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    WEBSITE_DATA_DIR.mkdir(parents=True, exist_ok=True)

    write_json(DATA_DIR / "leaderboard.json", stats)
    write_json(WEBSITE_DATA_DIR / "leaderboard.json", stats)
    write_markdown(DOCS_DIR / "LEADERBOARD.md", stats)

    print(f"Updated leaderboard for {len(stats)} participant(s).")
    for index, item in enumerate(stats, start=1):
        status = "active" if item.active_streak else "paused"
        last_update = item.last_update.isoformat() if item.last_update else "n/a"
        print(f"{index:>2}. {item.user:<20} days={item.total_days:<3} current={item.current_streak:<2} longest={item.longest_streak:<2} status={status:<6} last={last_update}")


def load_all_stats(files: Iterable[Path]) -> List[UserStats]:
    stats: List[UserStats] = []
    for json_path in sorted(files):
        if json_path.stat().st_size == 0:
            raise TrackerError(f"Log file is empty: {json_path.relative_to(REPO_ROOT)}")
        data = json.loads(json_path.read_text(encoding="utf-8"))
        user = extract_user(data, json_path)
        entries = extract_entries(data, json_path)
        stats.append(compute_stats(user, entries))
    return stats


def extract_user(raw: dict, path: Path) -> str:
    try:
        user = raw["user"].strip()
    except KeyError as exc:
        raise TrackerError(f"Missing 'user' key in {path.relative_to(REPO_ROOT)}") from exc

    if not user:
        raise TrackerError(f"User value is empty in {path.relative_to(REPO_ROOT)}")
    return user


def extract_entries(raw: dict, path: Path) -> List[Entry]:
    entries_raw = raw.get("entries")
    if entries_raw is None:
        raise TrackerError(f"Missing 'entries' array in {path.relative_to(REPO_ROOT)}")
    if not isinstance(entries_raw, list):
        raise TrackerError(f"'entries' must be a list in {path.relative_to(REPO_ROOT)}")

    entries: List[Entry] = []
    for index, item in enumerate(entries_raw, start=1):
        try:
            day = int(item["day"])
            date_str = item["date"]
            summary = str(item.get("summary", "")).strip()
        except KeyError as exc:
            raise TrackerError(
                f"Entry #{index} missing required field in {path.relative_to(REPO_ROOT)}"
            ) from exc
        except (TypeError, ValueError) as exc:
            raise TrackerError(
                f"Entry #{index} has invalid data in {path.relative_to(REPO_ROOT)}"
            ) from exc

        if not summary:
            raise TrackerError(
                f"Entry #{index} summary is empty in {path.relative_to(REPO_ROOT)}"
            )

        try:
            entry_date = datetime.strptime(date_str, DATE_FMT).date()
        except ValueError as exc:
            raise TrackerError(
                f"Entry #{index} has an invalid date (expected YYYY-MM-DD) in {path.relative_to(REPO_ROOT)}"
            ) from exc

        entries.append(Entry(day=day, date_value=entry_date, summary=summary))

    if not entries:
        raise TrackerError(f"No entries found in {path.relative_to(REPO_ROOT)}")

    return entries


def compute_stats(user: str, entries: List[Entry]) -> UserStats:
    # Sort by date to keep calculations consistent regardless of file order.
    entries.sort(key=lambda item: item.date_value)

    dates = [item.date_value for item in entries]
    highlight = shorten(entries[-1].summary, width=80, placeholder="…")
    total_days = len(entries)
    first_day = dates[0]
    last_update = dates[-1]
    current_streak = determine_current_streak(dates)
    longest_streak = determine_longest_streak(dates)

    today = datetime.now(timezone.utc).date()
    days_since_update = (today - last_update).days if last_update else None
    active_streak = days_since_update is not None and days_since_update <= 1

    return UserStats(
        user=user,
        total_days=total_days,
        current_streak=current_streak,
        longest_streak=longest_streak,
        active_streak=active_streak,
        last_update=last_update,
        first_day=first_day,
        highlight=highlight,
        days_since_update=days_since_update,
    )


def determine_current_streak(dates: List[date]) -> int:
    if not dates:
        return 0

    streak = 1
    for index in range(len(dates) - 2, -1, -1):
        if (dates[index + 1] - dates[index]).days == 1:
            streak += 1
        else:
            break
    return streak


def determine_longest_streak(dates: List[date]) -> int:
    longest = 0
    current = 0
    previous: date | None = None
    for current_date in dates:
        if previous and (current_date - previous).days == 1:
            current += 1
        else:
            current = 1
        longest = max(longest, current)
        previous = current_date
    return longest


def write_json(path: Path, stats: List[UserStats]) -> None:
    now_utc = datetime.now(timezone.utc).replace(microsecond=0)
    payload = {
        "generated_at": now_utc.isoformat(),
        "users": [item.to_dict() for item in stats],
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def write_markdown(path: Path, stats: List[UserStats]) -> None:
    lines = [
        "# Community Leaderboard",
        "",
        f"Last updated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z')}",
        "",
        "| Rank | User | Days Logged | Current Streak | Longest Streak | Last Activity | Status | Highlight |",
        "| ---- | ---- | ----------- | -------------- | -------------- | ------------- | ------ | --------- |",
    ]

    for index, item in enumerate(stats, start=1):
        last_update = item.last_update.isoformat() if item.last_update else "n/a"
        status = "active" if item.active_streak else "paused"
        highlight = item.highlight.replace("|", "\\|")
        lines.append(
            f"| {index} | {item.user} | {item.total_days} | {item.current_streak} | {item.longest_streak} | {last_update} | {status} | {highlight} |"
        )

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
