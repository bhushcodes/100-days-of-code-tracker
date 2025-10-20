# 🔐 OAuth Setup Guide

This guide will help you deploy your 100 Days of Code Tracker with GitHub OAuth authentication.

## 🚀 Quick Deploy to Netlify (5 minutes)

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `100 Days of Code Tracker`
   - **Homepage URL**: `https://your-site-name.netlify.app` (temporary, we'll update)
   - **Application description**: `Track my #100DaysOfCode journey`
   - **Authorization callback URL**: `https://your-site-name.netlify.app/.netlify/functions/auth-callback`
4. Click "Register application"
5. **Save** your `Client ID`
6. Click "Generate a new client secret"
7. **Save** your `Client Secret` (you won't see it again!)

### Step 2: Deploy to Netlify

#### Option A: One-Click Deploy (Easiest)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the button above
2. Connect your GitHub account
3. Choose this repository
4. Netlify will automatically deploy

#### Option B: Manual Deploy

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select your `100-days-of-code-tracker` repository
5. Configure:
   - **Build command**: Leave empty
   - **Publish directory**: `.`
6. Click "Deploy site"

### Step 3: Configure Environment Variables

1. In Netlify, go to **Site settings** → **Environment variables**
2. Add these variables:
   - **Key**: `GITHUB_CLIENT_ID`
     - **Value**: Your Client ID from Step 1
   - **Key**: `GITHUB_CLIENT_SECRET`
     - **Value**: Your Client Secret from Step 1
3. Click "Save"

### Step 4: Update GitHub OAuth App

1. Go back to [GitHub OAuth Apps](https://github.com/settings/developers)
2. Click on your app
3. Update the URLs with your actual Netlify URL:
   - **Homepage URL**: `https://YOUR-SITE-NAME.netlify.app`
   - **Authorization callback URL**: `https://YOUR-SITE-NAME.netlify.app/.netlify/functions/auth-callback`
4. Save changes

### Step 5: Trigger Redeploy

1. In Netlify, go to **Deploys**
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete (1-2 minutes)

### Step 6: Test It Out! 🎉

1. Visit your site: `https://YOUR-SITE-NAME.netlify.app`
2. Click "🚀 Login with GitHub"
3. Authorize the app
4. Start logging your progress!

---

## 🎯 How It Works

```
User clicks "Login with GitHub"
         ↓
Redirected to GitHub OAuth
         ↓
User authorizes app
         ↓
GitHub sends code to callback function
         ↓
Function exchanges code for token
         ↓
User redirected back with token
         ↓
Can now auto-commit to GitHub!
```

---

## 🔒 Security Notes

- **Client Secret**: Never commit to git (use environment variables)
- **Token**: Stored in session only (not persistent)
- **Scope**: Only requests `repo` access
- **Revoke**: Users can revoke access anytime from GitHub settings

---

## 🆘 Troubleshooting

### "OAuth not configured" error
- Check environment variables are set correctly
- Make sure you triggered a redeploy after adding variables

### "Redirect URI mismatch" error
- Verify callback URL in GitHub OAuth app matches Netlify URL exactly
- Format: `https://your-site.netlify.app/.netlify/functions/auth-callback`

### "Repository not found" error
- Make sure your repo is named `100-days-of-code-tracker`
- Or update the hardcoded repo name in `log-oauth-complete.html`

### Functions not working
- Check Netlify Functions logs
- Ensure `netlify.toml` is in repository root
- Verify `node-fetch` is in `package.json`

---

## 🎨 Customization

### Change Repository Name

Edit `log-oauth-complete.html` and replace:
```javascript
`https://api.github.com/repos/${username}/100-days-of-code-tracker/contents/${path}`
```

With your repo name:
```javascript
`https://api.github.com/repos/${username}/YOUR-REPO-NAME/contents/${path}`
```

### Custom Domain

1. In Netlify: **Domain settings** → **Add custom domain**
2. Update GitHub OAuth app URLs with your custom domain
3. Redeploy

---

## 💡 Benefits Over Token Method

- ✅ No manual token creation
- ✅ One-click authorization
- ✅ Better user experience
- ✅ Easy to revoke
- ✅ Professional OAuth flow

---

## 📚 Resources

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [GitHub Apps vs OAuth Apps](https://docs.github.com/en/developers/apps/differences-between-apps)

---

**Need help?** [Open an issue](https://github.com/bhushcodes/100-days-of-code-tracker/issues)
