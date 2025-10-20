# 📂 Logs Directory

This folder stores all user logs for the #100DaysOfCode challenge. Each user's progress is tracked in their own JSON file.

## 🚀 How to Add Your Logs

### **Option 1: Web Interface (Easiest)** 🌐
1. Visit [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)
2. Click "Login with GitHub"
3. Fill out the daily log form
4. Submit - Your log is automatically created/updated!

**This creates:** `logs/users/your-username.json`

---

### **Option 2: Manual Creation** 💻

#### **Step 1: Create Your File**
```bash
cp templates/user-log-template.json logs/users/your-username.json
```

#### **Step 2: Follow the JSON Schema**
```json
{
  "user": "your-github-handle",
  "entries": [
    {
      "day": 1,
      "date": "2025-10-20",
      "summary": "Built a weather app with React. Learned about API integration and state management.",
      "technologies": ["React", "JavaScript", "REST APIs"],
      "links": ["https://github.com/your-username/weather-app"],
      "highlight": "Finally understood useEffect! 💡"
    }
  ]
}
```

---

## 📋 Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `day` | Number | ✅ | Sequential day counter (1-100) |
| `date` | String | ✅ | ISO 8601 format: `YYYY-MM-DD` |
| `summary` | String | ✅ | What you built/learned (1-2 sentences) |
| `technologies` | Array | ✅ | Tools/languages used |
| `links` | Array | ⚠️ Optional | Project repos, tutorials, resources |
| `highlight` | String | ⚠️ Optional | Your "aha!" moment of the day |

---

## ✅ Best Practices

### **File Naming**
- Use your GitHub username: `your-username.json`
- Lowercase only
- Hyphens for multi-word names: `john-doe.json`

### **Date Format**
✅ **Correct:** `2025-10-20`  
❌ **Wrong:** `10/20/2025`, `20-10-2025`, `Oct 20, 2025`

### **Entry Order**
- Keep entries sorted by date (oldest first)
- Maintain sequential day numbers (1, 2, 3...)
- If you miss a day, just continue with the next day's number

### **Commit Messages**
✅ **Good:**
- `Add Day 7 log`
- `Day 14: Built Todo App`
- `Update Day 5: Add project link`

❌ **Avoid:**
- `Update`
- `Log`
- `Changes`

---

## 🔄 Updating the Leaderboard

After adding/editing your log:

```bash
# Update rankings
python3 scripts/update_leaderboard.py

# Commit changes
git add logs/users/your-username.json data/
git commit -m "Day X: Your achievement"
git push origin main
```

The script automatically:
- ✅ Calculates your current streak
- ✅ Tracks your best streak
- ✅ Updates your ranking
- ✅ Generates leaderboard data

---

## 📁 Directory Structure

```
logs/
├── README.md           # This file
├── users/              # All user logs
│   ├── bhushcodes.json
│   ├── your-username.json
│   └── ...
└── archives/           # Historical logs (if any)
```

---

## 💡 Tips for Success

1. **Log daily** - Even 30 minutes counts!
2. **Be specific** - "Built REST API with Express" > "Learned backend"
3. **Share links** - Help others learn from your resources
4. **Use highlights** - Capture your best moments
5. **Stay consistent** - The streak tracker rewards daily commitment
6. **Don't give up** - If you miss a day, just continue!

---

## 🤝 Need Help?

- Check the [main README](../README.md)
- See [CONTRIBUTING.md](../CONTRIBUTING.md)
- View the [template file](../templates/user-log-template.json)
- Open an [issue on GitHub](https://github.com/bhushcodes/100-days-of-code-tracker/issues)

**Happy coding!** 💻🔥
