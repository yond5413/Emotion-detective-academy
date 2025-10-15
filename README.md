# Emotion Detective Academy

An AI-powered mystery game where children ages 5-9 develop emotional intelligence by solving mysteries about feelings. Built for the Ainia.ai technical challenge.

## 🎯 Overview

Children become "Emotion Detectives" who solve mysteries by talking to AI-powered characters (Swing, Slide, Tree) at a playground. Through natural conversation, they learn to identify emotions, practice empathy, and develop conflict resolution skills.

## 🏗️ Architecture

**Single-Repo Vercel Deployment**
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: FastAPI (Python serverless function via Vercel)
- **AI**: OpenRouter with free model rotation (DeepSeek R1, GPT-OSS-20B, Mistral Small)

```
Vercel Deployment
├── Next.js Frontend (/)
├── FastAPI Backend (/api/*)
└── LangChain Agents
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Vercel CLI (optional for local dev)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd emotion-detective-academy

# Install Node dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Set environment variable (optional - works without for demo)
echo "OPENROUTER_API_KEY=your_key_here" > .env.local

# Run locally
npm run dev
# OR with Vercel dev server (recommended)
npx vercel dev
```

Visit `http://localhost:3000`

### Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard
vercel env add OPENROUTER_API_KEY
```

## 📁 Project Structure

```
emotion-detective-academy/
├── api/                      # Python FastAPI backend
│   ├── index.py             # Main API endpoints
│   ├── utils.py             # LLM call with model fallback
│   └── prompts.py           # Character system prompts
├── app/                      # Next.js frontend
│   ├── page.tsx             # Home page
│   ├── mystery/page.tsx     # Mystery investigation screen
│   ├── solution/page.tsx    # Solution submission
│   ├── parent/[id]/page.tsx # Parent dashboard
│   └── components/          # React components
├── vercel.json              # Vercel configuration
├── requirements.txt         # Python dependencies
└── package.json             # Node dependencies
```

## 🎮 User Flow

1. **Start Mystery**: Child begins "The Lonely Playground Mystery"
2. **Investigate**: Talk to Swing, Slide, and Tree to collect clues
3. **Collect Emotions**: Learn emotion vocabulary through conversation
4. **Solve Mystery**: Propose solution showing empathy
5. **Celebrate**: Earn badges and see character reactions
6. **Parent Insights**: Parents view session analytics and conversation starters

## 🤖 AI Agent Design

### Character Agents
- **Swing**: Playful but lonely, feeling forgotten
- **Slide**: Confident but worried about Swing's feelings
- **Tree**: Wise observer who understands both perspectives

### Model Rotation
Uses OpenRouter free tier with automatic fallback:
1. `deepseek/deepseek-r1:free`
2. `openai/gpt-oss-20b:free`
3. `mistralai/mistral-small-3.2-24b-instruct:free`

If no API key is set, uses safe canned responses for demo.

## 📊 API Endpoints

- `POST /api/session/start` - Initialize new mystery session
- `POST /api/message` - Send message to character
- `POST /api/solution` - Submit mystery solution
- `GET /api/parent/session/{id}` - Get parent dashboard data

## 🎨 Design Principles

- **Playful Learning**: Mystery format makes emotional learning feel like play
- **Age-Appropriate**: Simple language (2-3 sentences), emotion words for 5-9 year olds
- **Parent Partnership**: Dashboard provides insights without breaking the magic
- **Safety-First**: Content filtering and empathy moment tracking

## 🔧 Technical Decisions

### Why Vercel Serverless for FastAPI?
- **Single deployment**: One command deploys both frontend and backend
- **No CORS issues**: Same origin
- **Free hosting**: No infrastructure costs
- **Faster development**: Simplified architecture

### Trade-offs
- Cold start: 2-5s on first request (mitigated with loading states)
- No persistent state: In-memory sessions (acceptable for MVP demo)

## 📈 Success Metrics

- ✅ One complete mystery experience
- ✅ 3 distinct AI character personalities
- ✅ Natural conversation flow
- ✅ Parent dashboard with actionable insights
- ✅ Deployed and accessible via URL

## 🎯 Alignment with Ainia.ai

- **Playful Learning**: Mystery format disguises SEL education
- **Character-Driven**: Anthropomorphized characters like Ainia's "Dot"
- **Parent Partnership**: Transparent insights without breaking magic
- **SEL-First**: Empathy, emotion identification, conflict resolution
- **AI-Powered**: Multi-agent orchestration for rich conversations

## 🚧 Future Enhancements

- Voice input/output (text-to-speech, speech-to-text)
- Multiple mysteries with different emotional themes
- Persistent progress tracking across sessions
- Visual character state changes
- Integration with Ainia's existing character universe

## 📝 License

Built for Ainia.ai Technical Challenge - October 2025

## 🙏 Acknowledgments

- Ainia.ai for the challenge opportunity
- OpenRouter for free tier AI models
- Vercel for seamless deployment platform


