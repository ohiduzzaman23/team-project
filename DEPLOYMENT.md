# Deployment Guide

## Option 1: Deploy to Vercel (Recommended - FREE)

Vercel is the easiest way to deploy Next.js applications and it's FREE for personal projects.

### Steps:

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Push your code to GitHub**
   ```bash
   cd marketplace
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/marketplace.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" and use your GitHub account
   - Click "Import Project"
   - Select your `marketplace` repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - Your site will be live at: `https://your-project-name.vercel.app`

### That's it! Your site is now live! 🎉

---

## Option 2: Deploy to Netlify (FREE)

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

---

## Option 3: Deploy to Railway (FREE tier available)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect and deploy

---

## Option 4: Manual Deployment (VPS/Server)

If you have your own server:

```bash
# 1. Build the project
npm run build

# 2. Start the production server
npm start
```

The app will run on port 3000 by default.

---

## Environment Variables

Currently, this project doesn't require any environment variables. If you add API keys or secrets later, add them in your deployment platform's settings.

---

## Custom Domain

After deployment, you can add a custom domain:

**Vercel:**
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

---

## Troubleshooting

### Build fails?
- Make sure all dependencies are in package.json
- Check that Node.js version is 18+
- Run `npm run build` locally first to catch errors

### Images not loading?
- Check that `next.config.ts` has the correct image domains
- Verify image URLs are accessible

### Need help?
- Check Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
