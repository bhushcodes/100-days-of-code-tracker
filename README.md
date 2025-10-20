# 🔥 100 Days of Code Tracker

> **Making the #100DaysOfCode challenge more fun, competitive, and motivating!**

**⚡ TL;DR:** Visit [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/), login with GitHub, start logging! | [Quick Start Guide →](QUICKSTART.md)

---

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

## 🚀 How to Start (3 Steps!)

### **1. Visit the Website**
Go to: **[100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)**

### **2. Click "Login with GitHub"**
Authorize the app (we only need access to save your progress)

### **3. Start Logging!**
Fill the form daily with:
- What you built/learned
- Technologies used
- Your highlight

**Done!** Your progress automatically saves to GitHub and appears on the leaderboard. 🎉

---

### **Advanced: Manual Logging** 💻
<details>
<summary>Click if you prefer editing JSON files directly</summary>

```bash
# 1. Fork and clone
git clone https://github.com/YOUR-USERNAME/100-days-of-code-tracker.git

# 2. Create your log
cp templates/user-log-template.json logs/users/your-username.json

# 3. Edit the JSON file with your entries

# 4. Update and push
python3 scripts/update_leaderboard.py
git add -A && git commit -m "Day X" && git push

# 5. Open a Pull Request
```
</details>

---

## 📝 Daily Logging

**Just visit the website and fill the form!** That's it.

Your progress automatically:
- ✅ Saves to your GitHub repository
- ✅ Updates the leaderboard
- ✅ Calculates your streak
- ✅ Shows your ranking

**No manual steps needed!** 🎉

---

## 💡 Tips for Success

1. **Log daily** - Even 30 minutes counts!
2. **Be specific** - "Built REST API" > "Learned backend"
3. **Share your wins** - Use the highlight field
4. **Don't break the chain** - Miss a day? Just continue!
5. **Progress > Perfection** - Keep going! 💪

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
