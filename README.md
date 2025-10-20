# 🔥 100 Days of Code Tracker

> **Making the #100DaysOfCode challenge more fun, competitive, and motivating!**

Hey there, fellow coder! 👋 Welcome to your new favorite way to track your coding journey.

Ever started the #100DaysOfCode challenge and lost motivation after a few weeks? Or wished you could see how your friends are progressing? That's exactly why this exists!

## 🎯 What's This All About?

This is a **beautiful, community-driven leaderboard** that transforms the #100DaysOfCode challenge from a solo grind into an engaging, competitive experience.

### Why You'll Love It:

- 📊 **See Your Progress** - Real-time leaderboard with rankings
- 🔥 **Track Your Streaks** - Current streak & personal best
- 🏆 **Compete with Friends** - Friendly competition keeps you motivated
- 💪 **Stay Accountable** - Public progress = better commitment
- 🎨 **Stunning Design** - Neobrutalism UI that makes you WANT to log your progress
- 📱 **Works Everywhere** - Fully responsive, works on any device

## ✨ Live Demo

Check out the live leaderboard: **[bhushcodes.github.io/100-days-of-code-tracker](https://bhushcodes.github.io/100-days-of-code-tracker/)**

---

## 🚀 How to Join the Challenge

### **Step 1: Fork This Repository**

1. Click the **"Fork"** button at the top right of this page
2. This creates your own copy of the tracker

### **Step 2: Clone Your Forked Repository**

```bash
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/100-days-of-code-tracker.git
cd 100-days-of-code-tracker
```

**Example:** If your username is `johndoe`:
```bash
git clone https://github.com/johndoe/100-days-of-code-tracker.git
cd 100-days-of-code-tracker
```

### **Step 3: Create Your Log File**

```bash
# Replace 'your-username' with your GitHub username
cp templates/user-log-template.json logs/users/your-username.json
```

**Example:** If your username is `johndoe`:
```bash
cp templates/user-log-template.json logs/users/johndoe.json
```

### **Step 4: Edit Your Log File**

Open `logs/users/your-username.json` in any text editor (VS Code, Sublime, Notepad++, etc.)

**Add your first entry:**

```json
{
  "user": "your-username",
  "entries": [
    {
      "day": 1,
      "date": "2025-10-20",
      "summary": "Started my 100 Days of Code journey! Set up my environment and learned about...",
      "technologies": ["JavaScript", "Git"],
      "links": ["https://github.com/your-username/project"],
      "highlight": "Completed my first coding challenge! 🎉"
    }
  ]
}
```

**Important:**
- ✅ Use **today's date** in `YYYY-MM-DD` format
- ✅ Replace `"your-username"` with your actual GitHub username
- ✅ Fill in what you learned/built today
- ✅ Add technologies you used
- ✅ Share your best moment in the `highlight` field

### **Step 5: Update the Leaderboard**

```bash
# Run the Python script to update rankings
python3 scripts/update_leaderboard.py
```

**What this does:**
- ✅ Reads all user logs
- ✅ Calculates your streaks
- ✅ Updates the leaderboard rankings
- ✅ Generates the website data

### **Step 6: Commit and Push Your Changes**

```bash
git add logs/users/your-username.json data/ website/data/
git commit -m "Day 1: Started my coding journey!"
git push origin main
```

### **Step 7: Open a Pull Request (Optional)**

If you want to add your progress to the main leaderboard:

1. Go to your forked repository on GitHub
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Add a title: `Add [your-username] - Day 1`
5. Submit the pull request

---

## 📝 Logging Daily Progress

**Every day, add a new entry to your log file:**

```json
{
  "day": 2,
  "date": "2025-10-21",
  "summary": "Built a todo app with React hooks. Learned about useState and useEffect.",
  "technologies": ["React", "JavaScript", "CSS"],
  "links": ["https://github.com/your-username/react-todo"],
  "highlight": "Finally understood how useEffect cleanup works! 💡"
}
```

**Then update and push:**

```bash
python3 scripts/update_leaderboard.py
git add -A
git commit -m "Day 2: Built a React todo app"
git push origin main
```

---

## 💡 Pro Tips for Success

### **1. Log Every Day**
- Even if you code for 30 minutes, log it!
- Consistency beats intensity

### **2. Use Proper Date Format**
- Always use `YYYY-MM-DD` (like `2025-10-20`)
- The script needs this to calculate streaks

### **3. Be Specific in Your Summary**
- ❌ "Learned JavaScript"
- ✅ "Learned about async/await, built a weather API fetch function"

### **4. Share Resources**
- Add links to tutorials, docs, or your projects
- Help others learn from what you found useful

### **5. Celebrate Small Wins**
- Use the `highlight` field to capture "aha!" moments
- These make the leaderboard more fun and motivating

### **6. Don't Break the Chain**
- If you miss a day, don't give up!
- Just log the next day and keep going
- Progress > Perfection

---

## 📁 What's Inside?

```text
100-days-of-code-tracker/
├── 📄 README.md              # You are here!
├── 📄 CONTRIBUTING.md        # How to contribute
├── 📄 LICENSE                # MIT License
├── 🐍 scripts/
│   └── update_leaderboard.py # Updates rankings and stats
├── 📊 data/
│   └── leaderboard.json      # Generated leaderboard data
├── 📝 logs/
│   └── users/                # All user logs go here
│       └── your-username.json
├── 📋 templates/             # Templates to get you started
│   ├── user-log-template.json
│   └── daily-log-template.md
└── 🌐 Website files          # The beautiful UI
    ├── index.html
    ├── styles-custom.css
    └── app-enhanced.js
```

---

## 🎨 The Design

We went with **Neobrutalism** because:
- 🎯 **Bold & Eye-Catching** - Thick borders, bright colors, brutal shadows
- 💥 **Energizing** - Makes coding feel exciting!
- 🎪 **Fun** - Why should design be serious?
- 🚀 **Modern Retro** - 90s nostalgia meets 2025

**Features:**
- Animated particle background
- Smooth scroll between sections
- Interactive toggle for active users
- Toast notifications
- Full-screen sections
- Mobile-friendly

---

## 🤝 Contributing

Want to make this better? We'd love your help!

**Easy contributions:**
- Add your log (helps others see examples!)
- Fix typos or improve docs
- Report bugs or suggest features

**Code contributions:**
- Improve the Python script
- Enhance the UI/UX
- Add new features
- Optimize performance

Check out [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.

---

## 🗺️ Roadmap

**Coming Soon:**
- [ ] GitHub Actions for auto-updates
- [ ] Calendar heatmap view
- [ ] Achievement badges
- [ ] Weekly/Monthly stats
- [ ] Dark mode toggle
- [ ] Export data as PDF

**Have an idea?** [Open an issue](https://github.com/bhushcodes/100-days-of-code-tracker/issues)!

---

## 🙌 Perfect For

- **Coding Bootcamps** - Track your entire cohort
- **Study Groups** - Keep each other accountable
- **Solo Developers** - Visualize your progress
- **Teams** - Level up skills together
- **Anyone** - Who wants to code daily!

---

## 📜 License

MIT License - Use it however you want! Fork it, remix it, make it yours.

Just maybe give us a ⭐ if it helped you stay consistent? 😊

---

## 💬 Final Words

Remember: **Progress over perfection.**

You don't need to build the next Facebook. You just need to show up and code.

This tracker makes that easier and more fun.

**Now go write some code!** 💻🔥

---

**Built with ❤️ by developers, for developers**

Questions? Found a bug? [Open an issue](https://github.com/bhushcodes/100-days-of-code-tracker/issues) - we're here to help!

Star ⭐ this repo if it's helping your coding journey!
