# 🚀 Deploy to Vercel - Final Step

## Your Project is Ready!

All code is complete and tested. Follow these steps to deploy:

---

## Option 1: Vercel CLI (Fastest)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** [Your account]
- **Link to existing project?** No
- **Project name?** emotion-detective-academy
- **Directory?** ./
- **Override settings?** No

### 4. Deploy to Production
```bash
vercel --prod
```

### 5. Set Environment Variable (Optional)
```bash
vercel env add OPENROUTER_API_KEY
```
Paste your OpenRouter API key when prompted.

**Note**: App works without API key using canned responses.

---

## Option 2: GitHub + Vercel Dashboard

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Emotion Detective Academy"
git branch -M main
git remote add origin [your-github-repo-url]
git push -u origin main
```

### 2. Deploy via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel auto-detects Next.js and Python
5. Click "Deploy"

### 3. Add Environment Variable (Optional)
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add `OPENROUTER_API_KEY` with your key

---

## After Deployment

### 1. Get Your Live URL
Vercel will provide a URL like: `https://emotion-detective-academy.vercel.app`

### 2. Test the Deployment
```bash
# Test API
curl https://your-app.vercel.app/api/session/start \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"mystery_id": "playground_lonely"}'

# Should return JSON with session_id
```

### 3. Update README
Add your live URL to `README.md`:
```markdown
## 🌐 Live Demo
Visit: https://your-app.vercel.app
```

### 4. Test Full Flow
1. Visit your live URL
2. Click "Start Investigation"
3. Talk to Swing, Slide, Tree
4. Collect 3 clues
5. Submit solution
6. View celebration
7. Check parent dashboard at `/parent/[session-id]`

---

## Troubleshooting

### Deployment Failed?
- Check `vercel.json` is present
- Ensure `requirements.txt` and `package.json` are valid
- Review build logs in Vercel dashboard

### API Returns 404?
- Verify `vercel.json` routes configuration
- Check that `api/index.py` exists
- Review function logs in Vercel dashboard

### Cold Start Timeout?
- First request may take 2-5 seconds
- This is normal for serverless functions
- Subsequent requests are faster

---

## What to Share with Ainia Team

### 1. Live Demo URL
`https://your-app.vercel.app`

### 2. GitHub Repository
`https://github.com/your-username/emotion-detective-academy`

### 3. Key Documents
- `README.md` - Project overview
- `WRITEUP.md` - Technical write-up (2 pages)
- `QUICKSTART.md` - Quick start guide

### 4. Demo Flow
1. Start mystery
2. Talk to characters
3. Solve mystery
4. View parent dashboard

---

## Submission Checklist

- [ ] Deploy to Vercel
- [ ] Test live demo (full flow)
- [ ] Update README with live URL
- [ ] Push final changes to GitHub
- [ ] Share links with Ainia team:
  - Live demo URL
  - GitHub repository
  - Brief description

---

## Email Template for Submission

```
Subject: Emotion Detective Academy - Technical Challenge Submission

Hi [Ainia Team],

I've completed the technical challenge! Here's my submission:

🌐 Live Demo: https://your-app.vercel.app
📦 GitHub Repo: https://github.com/your-username/emotion-detective-academy

📋 What I Built:
- AI-powered mystery game for children ages 5-9
- 3 distinct character agents (Swing, Slide, Tree)
- Parent dashboard with insights and conversation starters
- Single Vercel deployment (Next.js + FastAPI serverless)
- OpenRouter integration with 3-model rotation

⏱️ Development Time: ~8 hours with AI co-pilots (Cursor/Claude)

📚 Documentation:
- README.md - Setup and architecture
- WRITEUP.md - Technical write-up (2 pages)
- DEPLOYMENT.md - Deployment guide
- QUICKSTART.md - Quick start for reviewers

🎯 Key Features:
- Playful learning through mystery format
- Age-appropriate AI responses (5-9 years)
- Emotion vocabulary tracking
- Empathy moment detection
- Parent partnership dashboard

Looking forward to your feedback!

Best regards,
[Your Name]
```

---

## Next Steps After Submission

1. **Wait for feedback** from Ainia team
2. **Iterate based on feedback** if needed
3. **Consider enhancements**:
   - Voice input/output
   - Multiple mysteries
   - Visual character illustrations
   - Mobile app version

---

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **OpenRouter Docs**: [openrouter.ai/docs](https://openrouter.ai/docs)
- **Project README**: See `README.md` in this repo

---

**You're almost there! Just run `vercel` and you're done! 🎉**

---

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# Done! 🚀
```

---

*Good luck with your submission!* 🍀

