# Contributing to 100 Days of Code Tracker

Thanks for helping build a welcoming space for everyone joining the 100 Days of Code challenge! These guidelines keep contributions smooth, transparent, and friendly for newcomers.

## 🚀 Quick Start

### **For Logging Your Progress (Easy)**
1. **Use the Web Interface**: Visit [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)
2. **Login with GitHub**: OAuth authentication
3. **Submit your daily log**: The web form handles everything automatically!

### **For Code Contributions**
1. **Fork** the repository
2. **Create a branch**: `feature/your-amazing-idea`
3. **Make your changes**
4. **Test locally** (see Development Setup below)
5. **Open a Pull Request** with clear description and screenshots

---

## 📝 Types of Contributions

### **1. Daily Log Entries** 📅
**Via Web Interface (Recommended):**
- Login at [100-days-of-code-tracker.netlify.app](https://100-days-of-code-tracker.netlify.app/)
- Use the logging form
- Automatic commit to your fork

**Via Manual Edit:**
- Edit `logs/users/your-username.json`
- Follow the template structure
- Run `python3 scripts/update_leaderboard.py`
- Commit and push

### **2. Bug Fixes** 🐛
- Check existing issues first
- Create a bug report if needed
- Reference the issue in your PR

### **3. New Features** ✨
- Open an issue to discuss first
- Get approval before major changes
- Include tests if applicable

### **4. Documentation** 📚
- Fix typos or clarify instructions
- Add examples
- Update outdated information

### **5. Design/UI Improvements** 🎨
- Must maintain Neobrutalism aesthetic
- Test on mobile and desktop
- Include before/after screenshots

---

## 🛠️ Development Setup

### **Prerequisites**
- **Python 3.10+** (for leaderboard script)
- **Node.js 18+** (for Netlify functions)
- **Git** (obviously!)

### **Local Setup**
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/100-days-of-code-tracker.git
cd 100-days-of-code-tracker

# Install Python dependencies (if needed)
pip install -r requirements.txt

# Install Node dependencies (for Netlify functions)
npm install

# Test locally
python3 -m http.server 8080
# Visit http://localhost:8080
```

### **Testing Netlify Functions Locally**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

---

## 📋 Project Conventions

### **Code Style**
- **JavaScript**: ES6+, no semicolons, 2-space indent
- **Python**: PEP 8, 4-space indent
- **HTML/CSS**: 2-space indent, semantic markup
- **JSON**: 2-space indent, ISO 8601 dates (`YYYY-MM-DD`)

### **Commit Messages**
✅ **Good:**
- `Add Day 7 log for bhushcodes`
- `Fix: Streak calculation bug for edge cases`
- `Feature: Add dark mode toggle`

❌ **Avoid:**
- `Update file`
- `Fix bug`
- `Changes`

### **File Structure**
```
logs/users/your-username.json  # Your daily logs
data/leaderboard.json          # Generated (don't edit manually)
docs/                          # Documentation
netlify/functions/             # Serverless functions
```

---

## ✅ Pull Request Checklist

Before submitting your PR:

- [ ] Code follows project conventions
- [ ] Tested locally (functions work, no console errors)
- [ ] If logs changed: Ran `python3 scripts/update_leaderboard.py`
- [ ] If functions changed: Tested with `netlify dev`
- [ ] Documentation updated (if needed)
- [ ] PR description is clear and includes:
  - What changed
  - Why it changed
  - Screenshots (for UI changes)
  - Related issue links

---

## 🐛 Reporting Issues

Use GitHub Issues with:
- **Clear title**: "Bug: Streak not updating" not "It's broken"
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if UI-related)
- **Browser/OS info** (if relevant)

**Labels:**
- `bug` - Something isn't working
- `enhancement` - New feature request
- `good first issue` - Great for newcomers
- `documentation` - Docs improvements

---

## 🤝 Community Guidelines

- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Be respectful and constructive
- Help newcomers
- Celebrate progress, not perfection!

**Questions?** Open an issue or reach out to [@bhushcodes](https://github.com/bhushcodes)

---

## 🎉 Recognition

All contributors will be:
- Listed in our Contributors section
- Mentioned in release notes
- Given a virtual high-five! ✋

**Thank you for making this project better!** 💻🔥
