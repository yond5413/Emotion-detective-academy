# Quick Start Guide

## For Reviewers / Demo

### Option 1: View Live Demo (Fastest)
Visit the deployed URL: `[TO BE ADDED AFTER DEPLOYMENT]`

### Option 2: Run Locally

```bash
# 1. Clone repository
git clone [repo-url]
cd emotion-detective-academy

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

**Note**: Backend API will use canned responses without OpenRouter API key (works fine for demo).

---

## User Flow Demo

### 1. Start Mystery
- Click "Start Investigation" on home page
- Session automatically created

### 2. Talk to Characters
- Click "Talk to Swing" (lonely playground swing)
- Type question: "How do you feel?"
- See AI response and collect clue
- Repeat with Slide and Tree

### 3. Solve Mystery
- After collecting 3 clues, click "Propose Solution"
- Type solution showing empathy
- See character reactions and celebration

### 4. Parent Dashboard
- Copy session ID from URL
- Visit `/parent/[session-id]`
- View emotion words learned, empathy moments, and conversation starters

---

## Testing the AI

### Suggested Questions to Ask Characters

**To Swing**:
- "How do you feel?"
- "Why are you sad?"
- "What would make you feel better?"
- "Do you miss the children?"

**To Slide**:
- "Are you worried about something?"
- "How do you feel about Swing?"
- "What can we do to help?"

**To Tree**:
- "What do you see from up there?"
- "Can you help us understand?"
- "What should we do?"

### Example Solutions

**Good solutions showing empathy**:
- "Maybe Swing and Slide can be friends and kids can play on both!"
- "We could ask kids to take turns so everyone gets to play"
- "Swing and Slide should talk to each other about their feelings"

---

## Architecture Highlights

### Single Vercel Deployment
- Frontend (Next.js) and Backend (FastAPI) in one repo
- One command deploy: `vercel`
- No CORS issues (same origin)

### AI Model Rotation
- Uses OpenRouter free tier
- Rotates between 3 models if rate-limited
- Falls back to canned responses if needed

### Character Agents
- Each character has distinct personality
- System prompts enforce age-appropriate language (5-9 years)
- 2-3 sentence responses with simple emotion words

---

## Key Features to Notice

### For Children
✅ Playful mystery format (not obvious education)  
✅ Simple, encouraging language  
✅ Visual progress tracking (detective notebook)  
✅ Celebration and badges on completion  
✅ Suggested questions if stuck  

### For Parents
✅ Session insights (duration, questions asked)  
✅ Emotion vocabulary learned  
✅ Empathy moments tracked  
✅ Conversation starters for offline discussion  
✅ Growth indicators (empathy score, perspective-taking)  

### Technical
✅ Serverless FastAPI backend  
✅ Multi-agent AI orchestration  
✅ Model fallback rotation  
✅ In-memory session management  
✅ Real-time emotion detection  

---

## Files to Review

### Backend
- `api/index.py` - Main FastAPI endpoints
- `api/prompts.py` - Character system prompts
- `api/utils.py` - LLM call with fallback

### Frontend
- `app/mystery/page.tsx` - Main mystery screen
- `app/components/ChatInterface.tsx` - Chat UI
- `app/components/DetectiveNotebook.tsx` - Progress tracking
- `app/parent/[id]/page.tsx` - Parent dashboard

### Configuration
- `vercel.json` - Deployment config
- `requirements.txt` - Python dependencies
- `package.json` - Node dependencies

### Documentation
- `README.md` - Project overview
- `WRITEUP.md` - Technical write-up (1-2 pages)
- `DEPLOYMENT.md` - Deployment guide

---

## Troubleshooting

### "Session not found" error
- Refresh page to start new session
- Sessions are in-memory (reset on server restart)

### Slow AI responses
- First request has ~2-5s cold start (serverless)
- Subsequent requests are faster
- Loading state shows "Thinking..."

### No API key configured
- App works without API key
- Uses safe canned responses
- Set `OPENROUTER_API_KEY` env var for real AI

---

## Next Steps

1. **Test full flow**: Start → Investigate → Solve → Dashboard
2. **Try different questions**: See how AI adapts
3. **Check parent dashboard**: View insights and starters
4. **Review code**: See agent prompts and architecture
5. **Deploy**: `vercel` to get live URL

---

**Questions?** Check `README.md` or `DEPLOYMENT.md`

**Ready to deploy?** Run `vercel` in project root

