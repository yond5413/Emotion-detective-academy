# Deployment Guide - Emotion Detective Academy

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **OpenRouter API Key** (optional): Get free tier key at [openrouter.ai](https://openrouter.ai)

---

## Local Development

### 1. Install Dependencies

```bash
# Install Node dependencies
npm install

# Install Python dependencies (if testing locally)
pip install -r requirements.txt
```

### 2. Set Environment Variables (Optional)

Create `.env.local`:
```bash
OPENROUTER_API_KEY=your_key_here
```

**Note**: App works without API key using canned responses for demo.

### 3. Run Development Server

```bash
# Option 1: Next.js only (frontend)
npm run dev

# Option 2: Vercel dev (frontend + backend)
npx vercel dev
```

Visit `http://localhost:3000`

---

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - What's your project's name? emotion-detective-academy
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Next.js and Python
5. Click "Deploy"

---

## Environment Variables

### Set in Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key (optional)

### Set via CLI

```bash
vercel env add OPENROUTER_API_KEY
# Paste your key when prompted
# Select: Production, Preview, Development
```

---

## Verify Deployment

### 1. Test Frontend
Visit your Vercel URL: `https://your-app.vercel.app`

### 2. Test Backend API
```bash
curl https://your-app.vercel.app/api/session/start \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"mystery_id": "playground_lonely"}'
```

Should return JSON with `session_id` and mystery details.

### 3. Test Full Flow
1. Click "Start Investigation"
2. Talk to Swing, Slide, or Tree
3. Collect 3 clues
4. Submit solution
5. View celebration
6. Check parent dashboard at `/parent/[session-id]`

---

## Troubleshooting

### Issue: "Module not found" error

**Solution**: Ensure all dependencies are in `package.json` and `requirements.txt`

```bash
npm install
vercel deploy
```

### Issue: API endpoints return 404

**Solution**: Check `vercel.json` routes configuration

```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "api/index.py" }
  ]
}
```

### Issue: Python cold start timeout

**Solution**: Increase function timeout in `vercel.json`

```json
{
  "functions": {
    "api/index.py": {
      "maxDuration": 30
    }
  }
}
```

### Issue: OpenRouter rate limit

**Solution**: App automatically rotates between 3 free models. If all are rate-limited, uses canned responses.

### Issue: CORS errors

**Solution**: Should not occur (same origin). If it does, check CORS middleware in `api/index.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Performance Optimization

### 1. Reduce Cold Starts

**Option A**: Keep function warm (ping every 5 minutes)
```bash
# Use cron job or external service
curl https://your-app.vercel.app/api/session/start -X POST
```

**Option B**: Accept cold start, use loading states

### 2. Optimize Bundle Size

```bash
# Analyze bundle
npm run build
```

### 3. Enable Caching

Add to `next.config.js`:
```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
}
```

---

## Monitoring & Logs

### View Logs in Vercel Dashboard

1. Go to your project
2. Click **Deployments**
3. Select a deployment
4. Click **Functions** tab
5. View logs for `/api/index.py`

### View Logs via CLI

```bash
vercel logs [deployment-url]
```

---

## Custom Domain (Optional)

### Add Custom Domain

1. Go to **Settings** → **Domains**
2. Add your domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

---

## Rollback Deployment

### Via Dashboard

1. Go to **Deployments**
2. Find previous working deployment
3. Click **⋯** → **Promote to Production**

### Via CLI

```bash
vercel rollback
```

---

## Production Checklist

- [ ] All environment variables set
- [ ] OpenRouter API key configured (or canned responses enabled)
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Full mystery flow works (start → investigate → solve → dashboard)
- [ ] Parent dashboard displays data
- [ ] Mobile responsive (basic check)
- [ ] No console errors
- [ ] README updated with live URL

---

## Support

**Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)  
**OpenRouter Documentation**: [openrouter.ai/docs](https://openrouter.ai/docs)  
**Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)  
**FastAPI Documentation**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)

---

## Next Steps After Deployment

1. **Test with real users**: Have a child (ages 5-9) try the mystery
2. **Gather feedback**: Note confusion points and language issues
3. **Refine prompts**: Adjust character responses based on feedback
4. **Monitor usage**: Check Vercel analytics for session data
5. **Iterate**: Add more mysteries and features

---

**Happy Deploying! 🚀**

