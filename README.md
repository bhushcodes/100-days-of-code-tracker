# 🔥 100 Days of Code Tracker

> **Making the #100DaysOfCode challenge more fun, competitive, and motivating!**

**⚡ TL;DR:** Visit [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/), login with GitHub, start logging! | [Quick Start Guide →](QUICKSTART.md)

---

A **beautiful, community-driven leaderboard** that transforms #100DaysOfCode from a solo grind into an engaging, competitive experience. Track streaks, compete with friends, and stay motivated! 🏆

**Live Demo:** [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)

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

## 🎨 Features

- 🔐 **OAuth Login** - One-click GitHub authentication
- 🏆 **Live Leaderboard** - Real-time rankings
- 🔥 **Streak Tracking** - Current & best streaks
- 📊 **Progress Charts** - Visualize your journey
- 🎨 **Neobrutalism UI** - Bold, fun, energizing design
- 📱 **Fully Responsive** - Works on any device

**Tech:** HTML5, CSS3, JavaScript, Netlify Functions, GitHub OAuth

---

## 🤝 Contributing

Want to help? Check out [`CONTRIBUTING.md`](CONTRIBUTING.md)

- Add your logs
- Fix bugs
- Improve UI
- Suggest features

---

## 📜 License

MIT License - Use it however you want!

---

**Built by [Bhushan Pawar](https://bhushan-pawar.vercel.app/)** • [GitHub](https://github.com/bhushcodes) • [LinkedIn](https://www.linkedin.com/in/bhushcodes)

**Questions?** [Open an issue](https://github.com/bhushcodes/100-days-of-code-tracker/issues) • **Enjoying it?** Star ⭐ the repo!
