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

Check out the live leaderboard: **[100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)**

---

## 🚀 How to Join the Challenge

### **Option 1: Quick Start with OAuth (Recommended)** 🚀

1. **Visit the Website**: [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)
2. **Click "Login with GitHub"** - Secure OAuth authentication
3. **Authorize the app** - We only need access to create files in your repo
4. **Start logging!** - Simple web form to track your daily progress

**Benefits:**
- ✅ No manual setup required
- ✅ Automatic commits to your repository
- ✅ Beautiful web interface
- ✅ Instant updates to leaderboard

---

### **Option 2: Manual Setup (For Advanced Users)** 💻

#### **Step 1: Fork & Clone**

```bash
git clone https://github.com/YOUR-USERNAME/100-days-of-code-tracker.git
cd 100-days-of-code-tracker
```

#### **Step 2: Create Your Log File**

```bash
cp templates/user-log-template.json logs/users/your-username.json
```

#### **Step 3: Add Your First Entry**

Edit `logs/users/your-username.json`:

```json
{
  "user": "your-username",
  "entries": [
    {
      "day": 1,
      "date": "2025-10-20",
      "summary": "Started my 100 Days of Code journey!",
      "technologies": ["JavaScript", "Git"],
      "links": ["https://github.com/your-username/my-project"],
      "highlight": "Completed my first challenge! 🎉"
    }
  ]
}
```

#### **Step 4: Update Leaderboard & Push**

```bash
python3 scripts/update_leaderboard.py
git add -A
git commit -m "Day 1: Started my journey!"
git push origin main
```

#### **Step 5: Submit Pull Request**

Open a PR to add your progress to the main leaderboard!

---

## 📝 Logging Daily Progress

### **Via Web Interface (Easiest)** 🌐

1. Go to [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)
2. Login with GitHub
3. Fill out the daily log form
4. Click submit - Done! ✨

**Your progress automatically:**
- ✅ Saves to your GitHub repository
- ✅ Updates the leaderboard
- ✅ Calculates your streak
- ✅ Commits with a clean message

### **Via Manual Edit** 💻

Add to your `logs/users/your-username.json`:

```json
{
  "day": 2,
  "date": "2025-10-21",
  "summary": "Built a React todo app",
  "technologies": ["React", "JavaScript"],
  "links": ["https://github.com/your-username/react-todo"],
  "highlight": "useEffect cleanup finally clicked! 💡"
}
```

Then:
```bash
python3 scripts/update_leaderboard.py
git add -A && git commit -m "Day 2: React todo app" && git push
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

## 📁 Project Structure

```text
100-days-of-code-tracker/
├── 📄 README.md                  # You are here!
├── 📄 OAUTH_SETUP.md             # OAuth setup guide
├── 📄 CONTRIBUTING.md            # Contribution guidelines
├── 📄 LICENSE                    # MIT License
│
├── 🌐 Website (Frontend)
│   ├── index.html                # Main leaderboard
│   ├── styles-custom.css         # Neobrutalism styling
│   ├── app-enhanced.js           # Interactive features
│   ├── log-oauth-login.html      # OAuth login page
│   ├── log-oauth.html            # Logging interface
│   └── log-form-advanced.html    # Advanced logging form
│
├── ⚡ Netlify Functions
│   └── netlify/functions/
│       ├── auth-start.js         # OAuth flow start
│       └── auth-callback.js      # OAuth callback handler
│
├── 🐍 Scripts
│   └── scripts/
│       └── update_leaderboard.py # Leaderboard generator
│
├── 📊 Data
│   ├── data/leaderboard.json     # Generated rankings
│   └── logs/users/               # User progress logs
│       └── *.json                # Individual user files
│
└── 📋 Templates
    ├── user-log-template.json    # Log file template
    └── daily-log-template.md     # Daily entry template
```

---

## 🎨 Design & Tech Stack

### **Neobrutalism UI** 🎨
Why we chose this bold aesthetic:
- 🎯 **Eye-Catching** - Thick borders, bright colors, brutal shadows
- 💥 **Energizing** - Makes you WANT to code!
- 🎪 **Fun** - Because coding shouldn't be boring
- 🚀 **Modern Retro** - 90s meets 2025

### **Features** ✨
- 🌟 Animated particle background
- 📜 Smooth full-screen scrolling
- 🔄 Real-time leaderboard updates
- 🎯 Interactive user toggles
- 📱 Fully responsive design
- 🔔 Toast notifications
- 🔐 Secure OAuth authentication

### **Tech Stack** 💻
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Neobrutalism + NES.css + Custom CSS
- **Backend**: Netlify Serverless Functions
- **Auth**: GitHub OAuth 2.0
- **Hosting**: Netlify (with automatic deploys)
- **Data**: JSON files (Git-based storage)

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

**Current Features:**
- ✅ OAuth GitHub login
- ✅ Real-time leaderboard
- ✅ Streak tracking
- ✅ Web-based logging interface
- ✅ Automatic GitHub commits
- ✅ Responsive design
- ✅ Neobrutalism UI

**Coming Soon:**
- [ ] GitHub Actions auto-updates
- [ ] Calendar heatmap visualization
- [ ] Achievement badges system
- [ ] Weekly/Monthly statistics
- [ ] Dark mode toggle
- [ ] Export progress as PDF
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)

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

**Built with ❤️ + ☕ by [Bhushan Pawar](https://bhushan-pawar.vercel.app/)**

Connect with me: [GitHub](https://github.com/bhushcodes) • [LinkedIn](https://www.linkedin.com/in/bhushcodes) • [Instagram](https://www.instagram.com/unfiltered.bhushan/)

Questions? Found a bug? [Open an issue](https://github.com/bhushcodes/100-days-of-code-tracker/issues) - we're here to help!

Star ⭐ this repo if it's helping your coding journey!
