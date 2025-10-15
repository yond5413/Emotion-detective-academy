# Architecture Overview - Emotion Detective Academy

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENT                            │
│                    (Single Repository)                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────────┐                    ┌──────────────────────┐
│   NEXT.JS 14      │                    │   FASTAPI BACKEND    │
│   (Frontend)      │◄───────────────────│   (Serverless)       │
│                   │    REST API        │                      │
│  Port: 3000       │                    │  /api/*              │
└───────────────────┘                    └──────────────────────┘
        │                                           │
        │                                           │
        ▼                                           ▼
┌───────────────────┐                    ┌──────────────────────┐
│   PAGES/ROUTES    │                    │   API ENDPOINTS      │
│                   │                    │                      │
│  / (Home)         │                    │  POST /session/start │
│  /mystery         │                    │  POST /message       │
│  /solution        │                    │  POST /solution      │
│  /parent/[id]     │                    │  GET /parent/session │
└───────────────────┘                    └──────────────────────┘
        │                                           │
        │                                           │
        ▼                                           ▼
┌───────────────────┐                    ┌──────────────────────┐
│   COMPONENTS      │                    │   AGENT SYSTEM       │
│                   │                    │                      │
│  ChatInterface    │                    │  Detective Agent     │
│  DetectiveNotebook│                    │  Character Agents:   │
│  (Inline Parent)  │                    │    - Swing           │
└───────────────────┘                    │    - Slide           │
                                         │    - Tree            │
                                         └──────────────────────┘
                                                    │
                                                    │
                                                    ▼
                                         ┌──────────────────────┐
                                         │   OPENROUTER API     │
                                         │                      │
                                         │  Model Rotation:     │
                                         │  1. DeepSeek R1      │
                                         │  2. GPT-OSS-20B      │
                                         │  3. Mistral Small    │
                                         │  4. Canned Fallback  │
                                         └──────────────────────┘
```

---

## Data Flow

### 1. Session Start Flow

```
User clicks "Start Investigation"
    │
    ▼
Frontend: POST /api/session/start
    │
    ▼
Backend: Create session in SESSIONS dict
    │
    ├─ Generate UUID
    ├─ Initialize character states
    ├─ Set mystery stage = "investigating"
    └─ Return session_id + mystery details
    │
    ▼
Frontend: Store session_id, render mystery screen
```

### 2. Message Flow

```
User types message to character
    │
    ▼
Frontend: POST /api/message
    │
    ├─ session_id
    ├─ message
    └─ target_character (swing/slide/tree)
    │
    ▼
Backend: Process message
    │
    ├─ Get character prompt from prompts.py
    ├─ Build conversation context
    ├─ Call OpenRouter with model rotation
    │   │
    │   ├─ Try DeepSeek R1
    │   ├─ If rate-limited → Try GPT-OSS-20B
    │   ├─ If rate-limited → Try Mistral Small
    │   └─ If all fail → Canned response
    │
    ├─ Update session state
    │   ├─ Add message to history
    │   ├─ Mark character as talked_to
    │   ├─ Collect clue if new
    │   └─ Track emotion words
    │
    └─ Return response + clue + progress
    │
    ▼
Frontend: Display response, update notebook
```

### 3. Solution Flow

```
User submits solution
    │
    ▼
Frontend: POST /api/solution
    │
    ├─ session_id
    └─ solution text
    │
    ▼
Backend: Process solution
    │
    ├─ Update session.solution_proposed
    ├─ Set mystery_stage = "completed"
    └─ Generate character reactions
    │
    ▼
Frontend: Show celebration screen
    │
    ├─ Character reactions
    ├─ Badges earned
    └─ Emotion words recap
```

### 4. Parent Dashboard Flow

```
Parent visits /parent/[session-id]
    │
    ▼
Frontend: GET /api/parent/session/{id}
    │
    ▼
Backend: Compute analytics
    │
    ├─ Calculate duration
    ├─ Extract emotion words
    ├─ Identify empathy moments
    ├─ Generate conversation starters
    └─ Compute growth indicators
    │
    ▼
Frontend: Display insights
    │
    ├─ Session summary
    ├─ Emotion vocabulary
    ├─ Empathy moments
    ├─ Conversation starters
    └─ Growth indicators
```

---

## Component Architecture

### Frontend Components

```
app/
├── layout.tsx                    # Root layout with header
│
├── page.tsx                      # Home page
│   └── Link to /mystery
│
├── mystery/page.tsx              # Main investigation screen
│   ├── State: sessionId, selectedCharacter, clues, emotions
│   ├── useEffect: startSession() on mount
│   └── Components:
│       ├── DetectiveNotebook (sidebar)
│       └── ChatInterface (main)
│
├── solution/page.tsx             # Solution submission
│   ├── State: solution, submitted, result
│   └── Renders: Form → Celebration
│
├── parent/[id]/page.tsx          # Parent dashboard
│   ├── useEffect: fetchSessionData()
│   └── Displays: Summary, Emotions, Empathy, Starters
│
└── components/
    ├── ChatInterface.tsx         # Chat UI with character
    │   ├── Props: sessionId, character, callbacks
    │   ├── State: messages, input, loading
    │   └── Features: Suggested questions, auto-scroll
    │
    └── DetectiveNotebook.tsx     # Progress tracker
        ├── Props: clues, emotions
        └── Displays: Clues (0/3), Emotion badges
```

### Backend Structure

```
api/
├── index.py                      # Main FastAPI app
│   ├── SESSIONS: Dict[str, Dict] # In-memory store
│   ├── Routes:
│   │   ├── POST /api/session/start
│   │   ├── POST /api/message
│   │   ├── POST /api/solution
│   │   └── GET /api/parent/session/{id}
│   └── handler = Mangum(app)     # Serverless adapter
│
├── utils.py                      # LLM utilities
│   └── call_llm_with_fallback()
│       ├── Try model 1 (DeepSeek R1)
│       ├── Try model 2 (GPT-OSS-20B)
│       ├── Try model 3 (Mistral Small)
│       └── Fallback to canned response
│
└── prompts.py                    # Character prompts
    ├── DETECTIVE_PROMPT
    ├── SWING_PROMPT
    ├── SLIDE_PROMPT
    ├── TREE_PROMPT
    └── get_character_prompt(name)
```

---

## Session State Schema

```python
{
  "session_id": "uuid",
  "child_name": "optional",
  "mystery_id": "playground_lonely",
  "start_time": "2025-10-15T12:00:00Z",
  
  "messages": [
    {
      "role": "child" | "character",
      "character_id": "swing" | "slide" | "tree",
      "content": "message text",
      "emotion_detected": ["lonely", "sad"],
      "timestamp": "2025-10-15T12:01:00Z"
    }
  ],
  
  "clues_collected": [
    "Swing feels forgotten and lonely",
    "Slide is worried about Swing's feelings",
    "Tree sees both friends want to be included"
  ],
  
  "emotion_vocabulary": [
    "lonely", "sad", "worried", "happy", "excited"
  ],
  
  "mystery_stage": "investigating" | "completed",
  
  "character_states": {
    "swing": {"mood": "sad", "talked_to": true},
    "slide": {"mood": "worried", "talked_to": false},
    "tree": {"mood": "calm", "talked_to": true}
  },
  
  "solution_proposed": "Maybe they can be friends!",
  
  "empathy_moments": [
    "Asked: 'Why do you feel that way?'",
    "Asked: 'How can I help?'"
  ]
}
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.1
- **State**: React hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Build**: Webpack (via Next.js)

### Backend
- **Framework**: FastAPI 0.104.1
- **Language**: Python 3.11+
- **ASGI Adapter**: Mangum 0.17.0
- **HTTP Client**: httpx 0.25.2
- **Validation**: Pydantic 2.5.0
- **Runtime**: Vercel Python serverless

### AI/ML
- **Provider**: OpenRouter
- **Models**: 
  - DeepSeek R1 (free tier)
  - GPT-OSS-20B (free tier)
  - Mistral Small 3.2 (free tier)
- **Orchestration**: Custom rotation logic

### Deployment
- **Platform**: Vercel
- **Frontend**: Static + SSR
- **Backend**: Python serverless functions
- **CDN**: Vercel Edge Network
- **SSL**: Automatic HTTPS

---

## Security & Safety

### Input Validation
- Pydantic models for request validation
- Type checking with TypeScript
- SQL injection: N/A (no database)
- XSS: React auto-escapes

### Content Safety
- Age-appropriate prompts (5-9 years)
- Emotion keyword detection
- Empathy moment tracking
- Canned fallback responses

### Privacy
- No persistent storage (demo)
- No personal data collection
- Sessions expire on server restart
- No third-party tracking

---

## Performance Characteristics

### Frontend
- **Initial Load**: ~500ms (Next.js optimized)
- **Route Transitions**: ~100ms (client-side)
- **Bundle Size**: ~200KB gzipped

### Backend
- **Cold Start**: 2-5 seconds (first request)
- **Warm Request**: 100-300ms
- **LLM Response**: 1-3 seconds (depends on model)
- **Total Response**: 1.5-8 seconds

### Optimization
- React component memoization
- Tailwind CSS purging
- Next.js automatic code splitting
- Loading states for UX

---

## Scalability Considerations

### Current (MVP)
- In-memory sessions (single instance)
- No database
- Serverless auto-scaling
- Free tier limits

### Production Path
- Add Redis for session storage
- Add PostgreSQL for persistence
- Implement rate limiting
- Add monitoring (Sentry, LogRocket)
- CDN caching for static assets

---

## Deployment Architecture

```
GitHub Repository
    │
    ▼
Vercel Build System
    │
    ├─ Detect Next.js → Build frontend
    ├─ Detect Python → Build serverless functions
    └─ Generate routes from vercel.json
    │
    ▼
Vercel Edge Network
    │
    ├─ Static assets → CDN
    ├─ Next.js pages → Edge functions
    └─ Python API → Serverless functions
    │
    ▼
Production URL
    │
    └─ https://emotion-detective-academy.vercel.app
```

---

## Error Handling

### Frontend
- Try/catch for API calls
- Fallback UI for errors
- Loading states
- User-friendly error messages

### Backend
- HTTPException for API errors
- Model fallback rotation
- Canned response fallback
- Graceful degradation

---

## Monitoring & Observability

### Available (Vercel)
- Function logs
- Performance metrics
- Error tracking
- Build logs

### Future (Production)
- Sentry for error tracking
- LogRocket for session replay
- Custom analytics dashboard
- User behavior tracking

---

## Summary

**Architecture Type**: Serverless Full-Stack  
**Deployment Model**: Single-repo monolith  
**State Management**: In-memory (MVP)  
**AI Integration**: Multi-model rotation  
**Scalability**: Horizontal (serverless)  
**Cost**: Free tier (Vercel + OpenRouter)

---

*This architecture balances simplicity, speed, and production-readiness for an MVP demo.*

