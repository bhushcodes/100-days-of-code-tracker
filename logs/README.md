# Logs Directory

This folder stores community-submitted 100 Days of Code logs. Each log lives in `logs/users/` and follows the JSON schema described below.

## File naming
- Use your GitHub handle if possible: `logs/users/<handle>.json`.
- Stick to lowercase and hyphenated names to keep things consistent.

## JSON schema
```json
{
  "user": "your-github-handle",
  "entries": [
    {
      "day": 1,
      "date": "2024-01-01",
      "summary": "Short highlight of your work",
      "technologies": ["Python", "FastAPI"],
      "links": ["https://link-to-resources-or-pr.com"]
    }
  ]
}
```

### Field guidance
- `day`: Sequential counter for your challenge progress.
- `date`: ISO 8601 format (`YYYY-MM-DD`).
- `summary`: One or two sentences about what you accomplished.
- `technologies`: Optional list describing the primary tools you used.
- `links`: Optional list of helpful references, repositories, or blog posts.

Keep entries ordered by `date`. The automation script sorts data, but maintaining the order helps during PR reviews.

## Tips
- Add one entry per day. If you miss a day, keep the numbering consistent and continue later.
- Use descriptive commit messages (e.g., `Add day 14 log`).
- Run `python scripts/update_leaderboard.py` before opening your PR so the leaderboard reflects your work.

Happy coding!
