# 🔥 100 Days of Code Tracker

> **Making the #100DaysOfCode challenge more fun, competitive, and motivating!**

Hey there, fellow coder! 👋 Welcome to your new favorite way to track your coding journey.

Ever started the #100DaysOfCode challenge and lost motivation after a few weeks? Or wished you could see how your friends are progressing? That's exactly why this exists!

## 🎯 What's This All About?

This is a **beautiful, community-driven leaderboard** that transforms the #100DaysOfCode challenge from a solo grind into an engaging, competitive experience. Think of it as your coding journey's social network.

### Why You'll Love It:

- 📊 **See Your Progress** - Real-time leaderboard with rankings
- 🔥 **Track Your Streaks** - Current streak & personal best
- 🏆 **Compete with Friends** - Friendly competition keeps you motivated
- 💪 **Stay Accountable** - Public progress = better commitment
- 🎨 **Stunning Design** - Neobrutalism UI that makes you WANT to log your progress
- 📱 **Works Everywhere** - Fully responsive, check it on any device

## ✨ Live Demo

Check out the live leaderboard: **[bhushcodes.github.io/100-days-of-code-tracker](https://bhushcodes.github.io/100-days-of-code-tracker/)**

## 🚀 Quick Start (Super Simple!)

### Step 1: Fork This Repo
Click the **Fork** button at the top right of this page. This creates your own copy.

### Step 2: Clone Your Fork
```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/100-days-of-code-tracker.git
cd 100-days-of-code-tracker
```

**Example:** If your username is `bhushcodes`, use:
```bash
git clone https://github.com/bhushcodes/100-days-of-code-tracker.git
cd 100-days-of-code-tracker
```

### Step 3: Create Your Log File
```bash
# Replace 'your-github-username' with your actual username
cp templates/user-log-template.json logs/users/your-github-username.json

# Edit it with your info
# Use any text editor - VS Code, Sublime, even Notepad works!
```

**Example:** If your username is `bhushcodes`:
```bash
cp templates/user-log-template.json logs/users/bhushcodes.json
```

### Step 4: Update the Leaderboard
```bash
# Need Python 3.10+ installed
python scripts/update_leaderboard.py
```

### Step 5: Push Your Changes
```bash
git add .
git commit -m "Day 1: Started my coding journey!"
git push origin main
```

That's it! You're officially tracking your progress. 🎉

## 📋 What You Need

- **Git** - To clone and push changes
- **Python 3.10+** - For the leaderboard script
- **A code editor** - VS Code, Sublime, or whatever you prefer
- **15 minutes** - That's all it takes to set up!

## 📁 What's Inside?

```text
100-days-of-code-tracker/
├── 📄 README.md              # You are here!
├── 📄 CONTRIBUTING.md        # How to contribute
├── 📄 LICENSE                # MIT License
├── 🐍 scripts/
│   └── update_leaderboard.py # Magic script that updates everything
├── 📊 data/
│   └── leaderboard.json      # Leaderboard data (auto-generated)
├── 📝 logs/
│   └── users/                # Your daily logs go here
├── 📋 templates/             # Templates to get you started
└── 🌐 website/               # The beautiful UI you'll see
    ├── index.html
    ├── styles-custom.css     # Neobrutalism magic ✨
    └── app-enhanced.js       # Interactive features
```

## 📝 How to Log Your Daily Progress

### Option 1: The Simple Way (Recommended for Beginners)

1. **Open your log file** (`logs/users/your-username.json`)
2. **Add today's entry:**
```json
{
  "date": "2025-01-20",
  "day": 1,
  "duration": 2,
  "focus": "JavaScript basics",
  "summary": "Learned about array methods and practiced map/filter/reduce",
  "resources": ["https://javascript.info/array-methods"],
  "highlight": "Finally understood how reduce works!"
}
```
3. **Save and commit:**
```bash
git add logs/users/your-username.json
git commit -m "Day 1: JavaScript array methods"
git push
```

### Option 2: Use the Template

Check out [`templates/user-log-template.json`](templates/user-log-template.json) for the full structure with examples!

### 💡 Pro Tips:

- **Date Format**: Always use `YYYY-MM-DD` (like `2025-01-20`)
- **Be Honest**: Missed a day? That's okay! Just keep going
- **Share Resources**: Help others learn from what you found useful
- **Add Highlights**: Your "aha!" moments make the leaderboard more fun

## 🔄 Updating the Leaderboard

After you log your progress, run this to update the leaderboard:

```bash
python scripts/update_leaderboard.py
```

**What this does:**
- ✅ Reads all user logs
- ✅ Calculates streaks (current & best)
- ✅ Ranks everyone
- ✅ Updates the website data
- ✅ Generates the markdown leaderboard

**When to run it:**
- After adding your daily log
- Before pushing changes
- Any time you want to see updated rankings

## 🎨 The Design

We went with **Neobrutalism** because:
- 🎯 **Bold & Eye-Catching** - Thick borders, bright colors, brutal shadows
- 💥 **Energizing** - Makes coding feel exciting, not boring
- 🎪 **Fun** - Why should design be serious all the time?
- 🚀 **Modern Retro** - 90s nostalgia meets 2025 web design

Features include:
- Animated particle background
- Smooth scroll between sections
- Interactive toggle for active users
- Toast notifications
- Hover effects and transitions
- Full-screen sections on desktop
- Mobile-friendly responsive design

## 🤝 Contributing

Want to make this even better? We'd love your help!

**Easy contributions:**
- Fix typos or improve docs
- Add your own log (it helps others see examples!)
- Report bugs or suggest features

**Code contributions:**
- Improve the Python script
- Enhance the UI/UX
- Add new features to the leaderboard
- Optimize performance

Check out [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

## 🗺️ Roadmap

**Coming Soon:**
- [ ] GitHub Actions for auto-updates
- [ ] Calendar heatmap view
- [ ] Social sharing features
- [ ] Achievement badges
- [ ] Weekly/Monthly stats
- [ ] Dark mode toggle
- [ ] Export your data as PDF

**Have an idea?** Open an issue! We're always looking for cool features.

## 🙌 Perfect For

- **Coding Bootcamps** - Track your entire cohort
- **Study Groups** - Keep each other accountable
- **Solo Developers** - Visualize your own progress
- **Teams** - Level up skills together
- **Anyone** - Seriously, anyone who wants to code daily!

## 🎯 Tips for Success

1. **Start Small** - Even 30 minutes counts
2. **Be Consistent** - Daily progress > marathon sessions
3. **Share Your Journey** - Tweet with #100DaysOfCode
4. **Don't Break the Chain** - But if you do, don't give up!
5. **Learn in Public** - Your highlights help others

## 📜 License

MIT License - Use it however you want! Fork it, remix it, make it yours.

Just maybe give us a ⭐ if it helped you stay consistent? 😊

---

## 💬 Final Words

Remember: **Progress over perfection.**

You don't need to build the next Facebook. You don't need perfect commits. You just need to show up and code.

This tracker is here to make that easier and more fun.

Now go write some code! 💻🔥

---

**Built with ❤️ by developers, for developers**

Star ⭐ this repo if it's helping your coding journey!

Questions? Found a bug? [Open an issue](https://github.com/bhushcodes/100-days-of-code-tracker/issues) - we're here to help!
