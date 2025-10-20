#!/usr/bin/env python3
"""
Smart logging tool for 100 Days of Code
Prevents cheating, validates data, and auto-commits to GitHub
"""

import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
import subprocess

# Color codes for terminal
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
BOLD = '\033[1m'
RESET = '\033[0m'

class CodeLogger:
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.logs_dir = self.project_root / 'logs' / 'users'
        self.data_dir = self.project_root / 'data'
        
    def print_header(self):
        print(f"\n{BOLD}{BLUE}{'='*60}{RESET}")
        print(f"{BOLD}{BLUE}🔥 100 Days of Code Logger 🔥{RESET}")
        print(f"{BOLD}{BLUE}{'='*60}{RESET}\n")
    
    def get_username(self):
        """Get and validate GitHub username"""
        username = input(f"{BOLD}Enter your GitHub username: {RESET}").strip()
        
        if not username:
            print(f"{RED}❌ Username cannot be empty!{RESET}")
            sys.exit(1)
        
        # Check if username exists on GitHub
        print(f"{YELLOW}⏳ Validating GitHub username...{RESET}")
        result = subprocess.run(
            ['curl', '-s', f'https://api.github.com/users/{username}'],
            capture_output=True,
            text=True
        )
        
        if '"message": "Not Found"' in result.stdout:
            print(f"{RED}❌ GitHub username '{username}' not found!{RESET}")
            sys.exit(1)
        
        print(f"{GREEN}✅ Username validated!{RESET}")
        return username
    
    def load_user_log(self, username):
        """Load existing user log or create new one"""
        log_file = self.logs_dir / f'{username}.json'
        
        if log_file.exists():
            with open(log_file, 'r') as f:
                return json.load(f)
        else:
            return {
                "user": username,
                "entries": []
            }
    
    def check_already_logged_today(self, log_data):
        """Check if user already logged today"""
        today = datetime.now().date().isoformat()
        
        for entry in log_data['entries']:
            if entry['date'] == today:
                return True
        return False
    
    def check_streak(self, log_data):
        """Check and warn about streak status"""
        if not log_data['entries']:
            return True
        
        last_entry = log_data['entries'][-1]
        last_date = datetime.fromisoformat(last_entry['date']).date()
        today = datetime.now().date()
        
        days_since = (today - last_date).days
        
        if days_since > 1:
            print(f"\n{YELLOW}⚠️  WARNING: Your last log was {days_since} days ago!{RESET}")
            print(f"{YELLOW}   Your streak will be reset.{RESET}")
            response = input(f"\n{BOLD}Continue anyway? (yes/no): {RESET}").strip().lower()
            if response != 'yes':
                print(f"{BLUE}👋 Come back when you're ready!{RESET}")
                sys.exit(0)
        
        return True
    
    def get_log_entry(self, day_number):
        """Interactive entry collection"""
        print(f"\n{BOLD}{GREEN}📝 Day {day_number} Entry{RESET}\n")
        
        # Summary
        while True:
            summary = input(f"{BOLD}What did you code today? (min 20 chars):\n{RESET}").strip()
            if len(summary) >= 20:
                break
            print(f"{RED}❌ Please write at least 20 characters!{RESET}")
        
        # Technologies
        while True:
            tech_input = input(f"\n{BOLD}Technologies used (comma-separated):\n{RESET}").strip()
            technologies = [t.strip() for t in tech_input.split(',') if t.strip()]
            if technologies:
                break
            print(f"{RED}❌ Please add at least one technology!{RESET}")
        
        # Links
        links_input = input(f"\n{BOLD}Project/Repo link (optional, press Enter to skip):\n{RESET}").strip()
        links = [links_input] if links_input else []
        
        # Highlight
        highlight = input(f"\n{BOLD}Today's highlight! 🎉\n{RESET}").strip()
        if not highlight:
            highlight = "Another day of progress!"
        
        return {
            "day": day_number,
            "date": datetime.now().date().isoformat(),
            "summary": summary,
            "technologies": technologies,
            "links": links,
            "highlight": highlight,
            "timestamp": datetime.now().isoformat()
        }
    
    def save_log(self, username, log_data):
        """Save log to file"""
        log_file = self.logs_dir / f'{username}.json'
        
        # Ensure directory exists
        self.logs_dir.mkdir(parents=True, exist_ok=True)
        
        with open(log_file, 'w') as f:
            json.dump(log_data, f, indent=2)
        
        print(f"\n{GREEN}✅ Log saved to: {log_file}{RESET}")
    
    def update_leaderboard(self):
        """Run the leaderboard update script"""
        print(f"\n{YELLOW}⏳ Updating leaderboard...{RESET}")
        
        update_script = self.project_root / 'scripts' / 'update_leaderboard.py'
        result = subprocess.run(['python3', str(update_script)])
        
        if result.returncode == 0:
            print(f"{GREEN}✅ Leaderboard updated!{RESET}")
            return True
        else:
            print(f"{RED}❌ Failed to update leaderboard{RESET}")
            return False
    
    def git_commit_and_push(self, username, day):
        """Automatically commit and push to GitHub"""
        print(f"\n{YELLOW}⏳ Committing to GitHub...{RESET}")
        
        try:
            # Check if git is initialized
            result = subprocess.run(
                ['git', 'rev-parse', '--git-dir'],
                cwd=self.project_root,
                capture_output=True
            )
            
            if result.returncode != 0:
                print(f"{RED}❌ Not a git repository!{RESET}")
                return False
            
            # Add files
            subprocess.run(['git', 'add', 'logs/', 'data/', 'website/data/', 'docs/'], cwd=self.project_root)
            
            # Commit
            commit_message = f"Day {day}: {username} logged progress"
            subprocess.run(['git', 'commit', '-m', commit_message], cwd=self.project_root)
            
            # Push
            result = subprocess.run(['git', 'push'], cwd=self.project_root, capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"{GREEN}✅ Pushed to GitHub!{RESET}")
                return True
            else:
                print(f"{YELLOW}⚠️  Could not push to GitHub (you may need to push manually){RESET}")
                print(f"{BLUE}💡 Run: git push origin main{RESET}")
                return False
                
        except Exception as e:
            print(f"{RED}❌ Git error: {e}{RESET}")
            return False
    
    def run(self):
        """Main execution flow"""
        self.print_header()
        
        # Get username
        username = self.get_username()
        
        # Load user log
        log_data = self.load_user_log(username)
        
        # Check if already logged today
        if self.check_already_logged_today(log_data):
            print(f"\n{RED}❌ You already logged today!{RESET}")
            print(f"{BLUE}💡 Come back tomorrow to continue your streak!{RESET}")
            sys.exit(1)
        
        # Check streak status
        self.check_streak(log_data)
        
        # Get next day number
        day_number = len(log_data['entries']) + 1
        
        if day_number > 100:
            print(f"\n{GREEN}🎉 Congratulations! You've completed 100 days!{RESET}")
            print(f"{GREEN}🏆 Start a new challenge or keep coding!{RESET}")
            sys.exit(0)
        
        # Collect entry
        entry = self.get_log_entry(day_number)
        
        # Add to log
        log_data['entries'].append(entry)
        
        # Save
        self.save_log(username, log_data)
        
        # Update leaderboard
        if not self.update_leaderboard():
            print(f"{YELLOW}⚠️  You may need to update leaderboard manually{RESET}")
        
        # Git commit and push
        print(f"\n{BOLD}🚀 Auto-commit to GitHub?{RESET}")
        response = input(f"{BOLD}(yes/no): {RESET}").strip().lower()
        
        if response == 'yes':
            self.git_commit_and_push(username, day_number)
        else:
            print(f"\n{BLUE}💡 Don't forget to commit manually:{RESET}")
            print(f"{BLUE}   git add .{RESET}")
            print(f"{BLUE}   git commit -m 'Day {day_number}: Logged progress'{RESET}")
            print(f"{BLUE}   git push origin main{RESET}")
        
        # Success message
        print(f"\n{GREEN}{BOLD}{'='*60}{RESET}")
        print(f"{GREEN}{BOLD}🎉 SUCCESS! Day {day_number} logged!{RESET}")
        print(f"{GREEN}{BOLD}🔥 Current streak: {day_number} days{RESET}")
        print(f"{GREEN}{BOLD}💪 Keep going! Only {100 - day_number} days left!{RESET}")
        print(f"{GREEN}{BOLD}{'='*60}{RESET}\n")

if __name__ == '__main__':
    logger = CodeLogger()
    try:
        logger.run()
    except KeyboardInterrupt:
        print(f"\n\n{YELLOW}👋 Cancelled. See you tomorrow!{RESET}\n")
        sys.exit(0)
    except Exception as e:
        print(f"\n{RED}❌ Error: {e}{RESET}\n")
        sys.exit(1)
