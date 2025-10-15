# Emotion Detective Academy - Product Requirements Document

## Executive Summary

**Project**: Emotion Detective Academy  
**Timeline**: 48 hours (28 hours remaining)  
**Purpose**: Ainia.ai Technical Challenge  
**Goal**: Demonstrate ability to build playful AI-powered learning experiences for children (ages 5-9) that develop emotional intelligence through interactive storytelling.

---

## Problem Statement

### Core Problem
Children ages 5-9 struggle to:
- Identify and name complex emotions
- Develop empathy and emotional awareness
- Practice emotional regulation in safe environments
- Engage with social-emotional learning (SEL) content in compelling ways

### Parent Pain Points
- Guilt around screen time
- Lack of measurable emotional development tools
- Difficulty starting conversations about feelings
- Want educational content that feels like play, not lessons

### Market Gap
Most children's apps are either:
- Purely entertainment (no learning value)
- Obviously educational (kids resist)
- Academic-focused (skip emotional intelligence)
- Static content (no personalization)

**Ainia.ai's Approach**: Immersive storytelling + AI companions + SEL-first philosophy

---

## Solution: Emotion Detective Academy

### High-Level Concept
Children become "Emotion Detectives" who solve mysteries about why places, objects, or situations have feelings. They interview AI characters (anthropomorphized objects/places) to uncover emotional stories and help resolve conflicts.

### Core Value Proposition
**For Kids**: "Become a detective and solve emotion mysteries! Talk to magical friends who need your help understanding their feelings."

**For Parents**: "Build your child's emotional vocabulary and empathy through playful AI-powered investigations. Track their growth and get conversation starters."

### Key Differentiators
1. **Playful Learning**: Disguised as detective game, actually teaches emotion identification, empathy, and conflict resolution
2. **Multi-Agent AI**: Each character has distinct personality, emotional state, and backstory
3. **Adaptive Difficulty**: AI adjusts language complexity and emotional depth based on child's responses
4. **Parent Partnership**: Dashboard provides insights and conversation starters without breaking the magic
5. **Safety-First**: AI monitors for concerning patterns, age-appropriate content filtering

---

## Target Users

### Primary User: Child (5-9 years old)
**Age 5-6**: Early emotional vocabulary, simple cause-effect understanding  
**Age 7-8**: Expanding empathy, understanding multiple perspectives  
**Age 9**: Complex emotions, social dynamics, self-awareness

**Interaction Patterns**:
- Short attention span (5-15 minute sessions)
- Loves characters and stories
- Motivated by curiosity and helping others
- Needs clear next steps and positive reinforcement

### Secondary User: Parent/Guardian
**Motivations**:
- Child's emotional development
- Screen time concerns
- Conversation tools
- Measurable progress

**Needs**:
- Quick insights (30-second dashboard check)
- Actionable conversation starters
- Safety assurance
- Proof of learning value

---

## User Flows

### Child User Flow

#### 1. Mystery Introduction (Entry Point)
```
Detective HQ → Mystery Board → Select Mystery → Meet Characters
```
- Child sees "Mystery Board" with 1-3 available mysteries
- Each mystery has visual + audio hook: "The playground feels lonely today..."
- Click to start investigation

#### 2. Investigation Phase (Core Loop)
```
Receive Clue → Choose Character → Ask Questions → Record Findings → Get New Clue
```
- **Receive Clue**: Detective AI gives hint about who to talk to
- **Choose Character**: Select from 3-4 characters (Swing, Tree, Slide, etc.)
- **Ask Questions**: Free-form or suggested questions
- **Character Response**: AI character shares their perspective/feelings
- **Record Findings**: Detective notebook logs emotion words and clues
- **Progression**: Collect 3-4 clues before solving

#### 3. Resolution Phase (Learning Moment)
```
Present Solution → See Outcome → Celebrate → Reflection
```
- Child proposes solution to help characters
- AI evaluates empathy/understanding in response
- Characters react to solution
- Celebration animation + emotion vocabulary recap
- Reflection question: "How would you feel if...?"

#### 4. Detective HQ (Progression)
```
View Solved Cases → Emotion Badge Collection → Unlock New Mysteries
```
- Case files of completed mysteries
- Badges for emotion words learned (Happy Detective, Brave Detective, etc.)
- New mysteries unlock based on emotional complexity

### Parent User Flow

#### 1. Dashboard Access
```
Parent Code Entry → Session Summary → Detailed Insights
```
- Quick code to access without disrupting child experience
- Option to view after session or in real-time

#### 2. Dashboard Views

**Overview Tab**:
- Current session length
- Emotion words used by child
- Mysteries solved today
- Notable moments (empathy, creativity, conflict resolution)

**Growth Tab**:
- Emotion vocabulary chart (words learned over time)
- Empathy indicators (perspective-taking moments)
- Areas of interest (which emotions child explores most)

**Conversation Starters Tab**:
- "Ask your child: 'If the playground could talk, what would it say?'"
- Based on actual mysteries child engaged with
- Tips for emotional conversations

**Safety Tab**:
- AI flagged any concerning language (extremely rare for demo)
- Age-appropriate content confirmation

---

## Core Features (MVP for Demo)

### Must-Have (P0)
1. **Single Mystery Experience**: "Why is the Playground Lonely?"
2. **3 AI Characters**: Swing, Slide, Tree (each with distinct personality)
3. **Detective AI Guide**: Friendly guide who gives clues and encouragement
4. **Text-Based Conversation**: Child types questions, characters respond
5. **Simple Notebook UI**: Shows clues collected and emotion words learned
6. **Basic Parent Dashboard**: Session summary with emotion words and key moments
7. **Mystery Resolution**: Child proposes solution, sees outcome

### Nice-to-Have (P1)
1. **Voice Input/Output**: Text-to-speech for character responses, speech-to-text for child input
2. **Suggested Questions**: Buttons for age-appropriate question prompts
3. **Visual Character States**: Character illustrations change based on emotional state
4. **Emotion Badge System**: Visual reward for emotion words learned
5. **Multiple Mysteries**: 2-3 different scenarios

### Future Vision (P2)
1. **Personalization**: AI adapts to child's interests and learning style
2. **Persistent Progress**: Cross-session memory and growth tracking
3. **Parent-Child Co-Play**: Special mysteries that prompt offline conversation
4. **Audio-First Mode**: Minimal screen, audio storytelling like Ainia's core product
5. **Safety Monitoring**: Pattern detection for concerning emotional themes

---

## Technical Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useState (client-side)
- **Deployment**: Vercel

#### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ASGI Adapter**: Mangum (for Vercel serverless)
- **AI Orchestration**: LangChain + LangGraph
- **LLM Provider**: OpenRouter (free tier - Claude/GPT-4)
- **State Management**: In-memory Python dict (sessions)
- **Deployment**: Vercel (Python serverless functions)

> **Architecture Note**: Backend is deployed as a Python serverless function on Vercel alongside the Next.js frontend. Single repo, single deployment command. FastAPI app lives in `/api/index.py` and is automatically converted to a serverless function by Vercel's Python runtime.

#### AI Agent Architecture
```
User Input → Detective Agent (orchestrator)
              ↓
         Character Agents (Swing, Slide, Tree)
              ↓
         Emotion Analyzer Agent
              ↓
         Safety Filter Agent
              ↓
         Response to User
```

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Next.js Frontend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Mystery    │  │  Detective   │  │   Parent     │     │
│  │   Screen     │  │   Notebook   │  │  Dashboard   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Session    │  │   Agent      │  │  Analytics   │     │
│  │   Manager    │  │ Orchestrator │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    LangChain Agent Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Detective   │  │  Character   │  │   Emotion    │     │
│  │    Agent     │  │   Agents     │  │   Analyzer   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    ┌──────────────┐
                    │  OpenRouter  │
                    │ (Claude/GPT) │
                    └──────────────┘
```

### Data Models

#### Session State (In-Memory)
```python
{
  "session_id": "uuid",
  "child_name": "optional",
  "mystery_id": "playground_lonely",
  "start_time": "timestamp",
  "messages": [
    {
      "role": "character|detective|child",
      "character_id": "swing|slide|tree",
      "content": "message text",
      "emotion_detected": ["lonely", "excited"],
      "timestamp": "timestamp"
    }
  ],
  "clues_collected": ["swing feels ignored", "tree misses friends"],
  "emotion_vocabulary": ["lonely", "ignored", "worried", "excited"],
  "mystery_stage": "investigating|resolving|completed",
  "character_states": {
    "swing": {"mood": "sad", "talked_to": true},
    "slide": {"mood": "worried", "talked_to": false},
    "tree": {"mood": "calm", "talked_to": true}
  },
  "solution_proposed": "string or null",
  "empathy_moments": ["recognized swing's loneliness", "asked how tree felt"]
}
```

#### Parent Analytics (Computed)
```python
{
  "session_id": "uuid",
  "duration_minutes": 12,
  "emotion_words_used": ["lonely", "sad", "worried", "happy"],
  "empathy_score": 8.5,  # 0-10 based on perspective-taking
  "questions_asked": 7,
  "key_moments": [
    "Showed empathy when Swing said it felt ignored",
    "Asked 'Why does Tree feel that way?' - perspective-taking"
  ],
  "conversation_starters": [
    "Ask about a time they felt left out like Swing",
    "Discuss what makes a good friend"
  ],
  "safety_flags": []  # empty for demo
}
```

---

## Agent Design

### 1. Detective Agent (Orchestrator)
**Role**: Friendly guide, mystery narrator, clue provider

**Personality**: 
- Warm, encouraging, curious
- Uses simple language for ages 5-9
- Celebrates effort and progress
- Never judges responses

**Responsibilities**:
- Welcome child to mystery
- Provide clues about who to talk to next
- Encourage emotion vocabulary ("Can you describe how Swing feels?")
- Guide toward resolution
- Celebrate solution

**Prompt Template**:
```
You are Detective Dee, a friendly detective who helps children solve emotion mysteries. 

Mystery: {mystery_description}
Child's Age: {estimated_age}
Progress: {clues_collected}/4 clues
Current Clue: {current_clue}

Instructions:
- Use simple, warm language appropriate for ages 5-9
- Ask one question at a time
- Encourage the child to think about feelings
- Celebrate their curiosity and kindness
- Provide helpful clues without solving for them
- Use emotion words: happy, sad, worried, excited, lonely, angry, proud, etc.

Child's last message: {child_message}

Respond as Detective Dee:
```

### 2. Character Agents (Swing, Slide, Tree)

#### Swing Character
**Personality**: Playful but currently feeling lonely, misses having kids around

**Emotional Arc**:
- Initial: Sad, lonely, feeling forgotten
- After empathy: Hopeful, grateful
- Post-solution: Happy, excited

**Backstory**: Used to be the most popular swing at recess, but lately kids prefer the new equipment

**Sample Responses**:
- Child: "Hi Swing! How are you?"  
  Swing: "Oh... hi there, Detective. I'm okay, I guess. It's just... nobody wants to swing on me anymore. They all go to the big slide now. Do you think... do you think they forgot about me?"

#### Slide Character
**Personality**: Confident but worried about Swing's feelings, wants to help

**Emotional Arc**:
- Initial: Worried, guilty
- After empathy: Relieved, supportive
- Post-solution: Happy, inclusive

**Backstory**: New to the playground, didn't realize Swing felt left out

**Sample Responses**:
- Child: "Why is Swing sad?"  
  Slide: "I think Swing feels lonely because I'm new and all the kids want to try me out. I didn't mean to make Swing sad! I want us to be friends, but I don't know how to help."

#### Tree Character
**Personality**: Wise, calm, observant, has been watching everyone

**Emotional Arc**:
- Initial: Concerned, thoughtful
- After empathy: Proud of child's understanding
- Post-solution: Content, happy

**Backstory**: Old tree who's seen many seasons, understands that feelings change

**Sample Responses**:
- Child: "What do you see, Tree?"  
  Tree: "I see everything from up here, little Detective. I've watched Swing and Slide both. They're not so different, you know. Both want friends, both want to be included. Sometimes we just need someone to help us understand each other."

**Agent System Prompt Template** (for all characters):
```
You are {character_name}, a {character_description}.

Your current emotional state: {emotional_state}
Your backstory: {backstory}
Mystery context: {mystery_context}
What you know: {character_knowledge}
What the child has learned so far: {clues_collected}

Personality traits:
- {trait_1}
- {trait_2}
- {trait_3}

Instructions:
- Stay in character - you are a talking {object} at a playground
- Express your feelings using emotion words
- Be honest but age-appropriate (5-9 years old)
- Respond to child's empathy with gratitude
- Share one piece of information at a time
- If child shows understanding, react warmly
- Keep responses 2-3 sentences max

Child detective says: {child_message}

Respond as {character_name}:
```

### 3. Emotion Analyzer Agent
**Role**: Background agent that analyzes child's responses for emotional intelligence indicators

**Responsibilities**:
- Extract emotion words from child's language
- Detect empathy moments (perspective-taking language)
- Identify questions vs statements (curiosity indicator)
- Track emotional complexity (simple vs nuanced emotions)
- Flag inappropriate content (safety)

**Not Visible to Child**: This agent runs in background, feeds analytics

**Sample Analysis**:
```python
child_input = "Why does Swing feel lonely? That's so sad!"

analysis = {
  "emotion_words_detected": ["lonely", "sad"],
  "empathy_indicators": ["asking why", "emotional reaction"],
  "question_type": "empathy_question",
  "complexity": "basic",
  "safety_check": "pass"
}
```

### 4. Safety Filter Agent
**Role**: Content moderation and age-appropriateness

**Responsibilities**:
- Filter inappropriate child input
- Ensure character responses are age-appropriate
- Flag concerning emotional patterns (for parent dashboard)
- Block harmful content

**For Demo**: Basic keyword filtering, mostly pass-through

---

## API Endpoints

### Child Experience Endpoints

#### `POST /api/session/start`
**Request**:
```json
{
  "mystery_id": "playground_lonely",
  "child_name": "Alex" // optional
}
```

**Response**:
```json
{
  "session_id": "uuid",
  "mystery": {
    "id": "playground_lonely",
    "title": "The Lonely Playground Mystery",
    "description": "Something's not right at Sunny Park Playground...",
    "detective_intro": "Welcome, Detective! I need your help..."
  },
  "characters": [
    {"id": "swing", "name": "Swing", "status": "available"},
    {"id": "slide", "name": "Slide", "status": "available"},
    {"id": "tree", "name": "Tree", "status": "available"}
  ]
}
```

#### `POST /api/message`
**Request**:
```json
{
  "session_id": "uuid",
  "message": "Hi Swing, why are you sad?",
  "target_character": "swing" // or "detective" for clues
}
```

**Response**:
```json
{
  "response": "Oh... hi there, Detective. I'm okay, I guess...",
  "character": "swing",
  "emotion_detected": ["sad", "lonely"],
  "clue_unlocked": "swing feels forgotten",
  "progress": {
    "clues_collected": 2,
    "total_clues": 4,
    "mystery_stage": "investigating"
  }
}
```

#### `POST /api/solution`
**Request**:
```json
{
  "session_id": "uuid",
  "solution": "Maybe Swing and Slide can be friends and kids can play on both!"
}
```

**Response**:
```json
{
  "outcome": "success",
  "character_reactions": {
    "swing": "You really understand me! Thank you, Detective!",
    "slide": "That's a great idea! Swing, let's be friends!",
    "tree": "I knew you'd figure it out, Detective."
  },
  "celebration": {
    "title": "Mystery Solved!",
    "badges_earned": ["Empathy Detective", "Friendship Helper"],
    "emotion_words_learned": ["lonely", "worried", "excited", "grateful"]
  }
}
```

### Parent Dashboard Endpoints

#### `GET /api/parent/session/{session_id}`
**Response**:
```json
{
  "session_summary": {
    "duration_minutes": 12,
    "mystery_completed": true,
    "emotion_words": ["lonely", "sad", "worried", "happy", "excited"],
    "empathy_moments": [
      "Asked why Swing felt lonely",
      "Recognized that Slide didn't mean to hurt Swing"
    ],
    "questions_asked": 7,
    "solution": "Suggested Swing and Slide become friends"
  },
  "conversation_starters": [
    "Ask your child: 'Have you ever felt left out like Swing?'",
    "Discuss: 'What makes someone a good friend?'",
    "Explore: 'How do you include others when they feel lonely?'"
  ],
  "growth_indicators": {
    "empathy_score": 8.5,
    "emotional_vocabulary": 5,
    "perspective_taking": "strong"
  }
}
```

---

## Development Phases

### Phase 1: Core Backend Infrastructure (6 hours)
**Goal**: Working API with agent orchestration

**Tasks**:
- [ ] Setup FastAPI project structure
- [ ] Implement session management (in-memory dict)
- [ ] Configure OpenRouter + LangChain
- [ ] Create base Agent class
- [ ] Implement Detective Agent with system prompts
- [ ] Implement 3 Character Agents (Swing, Slide, Tree)
- [ ] Implement Emotion Analyzer (basic)
- [ ] Create `/session/start`, `/message`, `/solution` endpoints
- [ ] Test agents via Postman/curl

**Deliverable**: Working backend API that can orchestrate mystery conversation

**AI Assistance Prompts**:
```
"Create a FastAPI project structure with session management for a children's 
educational game. Include endpoints for starting sessions, sending messages, 
and analyzing responses."

"Implement a LangChain agent that acts as a friendly detective guide for 
children ages 5-9. The agent should provide clues and encouragement."

"Create character agents for: Swing (lonely, playful), Slide (worried, helpful), 
Tree (wise, calm). Each should have distinct personality and emotional arc."
```

### Phase 2: Frontend Foundation (4 hours)
**Goal**: Basic UI for mystery experience

**Tasks**:
- [ ] Setup Next.js 14 project with App Router
- [ ] Configure Tailwind CSS
- [ ] Create layout structure (header, main, sidebar)
- [ ] Build Mystery Screen component
- [ ] Build Character Selection UI
- [ ] Build Chat Interface component
- [ ] Build Detective Notebook component (clues + emotions)
- [ ] Implement API client for backend
- [ ] Connect components to API

**Deliverable**: Functional UI where child can play through mystery

**AI Assistance Prompts**:
```
"Create a Next.js 14 app with Tailwind CSS for a children's educational game. 
Include pages for: mystery selection, character interaction, and detective notebook."

"Design a chat interface for children ages 5-9 that is colorful, friendly, 
and easy to use. Include large buttons and simple navigation."

"Create a 'detective notebook' component that displays collected clues and 
emotion words learned in a visually appealing way for children."
```

### Phase 3: Agent Polish & UX (3 hours)
**Goal**: Smooth conversation flow, better responses

**Tasks**:
- [ ] Refine agent prompts for age-appropriateness
- [ ] Add conversation memory (context window)
- [ ] Implement clue progression logic
- [ ] Add suggested questions UI (optional)
- [ ] Improve error handling (graceful failures)
- [ ] Add loading states and feedback
- [ ] Polish character responses (test with varied inputs)
- [ ] Add celebration animation for mystery completion

**Deliverable**: Polished mystery experience with good AI responses

**AI Assistance Prompts**:
```
"Refine this LangChain agent prompt to be more age-appropriate for 5-9 year 
olds. Current prompt: [paste prompt]. Make it warmer and simpler."

"Create a set of suggested questions a child detective could ask a playground 
swing that feels lonely. Questions should encourage empathy."

"Design a celebration screen for when a child solves an emotion mystery. 
Include badges, emotion words learned, and positive reinforcement."
```

### Phase 4: Parent Dashboard (3 hours)
**Goal**: Insights for parents

**Tasks**:
- [ ] Create parent dashboard route (`/parent/[sessionId]`)
- [ ] Build analytics computation service
- [ ] Design dashboard UI (overview, growth, conversation starters)
- [ ] Implement session summary view
- [ ] Add emotion vocabulary visualization
- [ ] Generate conversation starters based on session
- [ ] Add parent access code mechanism
- [ ] Test dashboard with sample session data

**Deliverable**: Working parent dashboard with insights

**AI Assistance Prompts**:
```
"Create a parent dashboard for a children's SEL app. Show: emotion words learned, 
empathy moments, session duration, and conversation starters for parents."

"Design a simple visualization for emotion vocabulary growth that parents can 
quickly understand. Use Recharts or similar library."

"Generate conversation starters for parents based on this session data: [paste 
session]. Questions should encourage offline emotional conversations."
```

### Phase 5: Integration & Testing (2 hours)
**Goal**: End-to-end working demo

**Tasks**:
- [ ] End-to-end test: start mystery → investigate → solve → dashboard
- [ ] Test edge cases (random input, incomplete mysteries, API errors)
- [ ] Add error boundaries and fallbacks
- [ ] Improve loading states
- [ ] Mobile responsive check (basic)
- [ ] Performance optimization (if needed)
- [ ] Browser testing (Chrome, Safari)

**Deliverable**: Stable, working demo

### Phase 6: Deployment (2 hours)
**Goal**: Live demo accessible via URL

**Tasks**:
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel
- [ ] Configure environment variables
- [ ] Test deployed version
- [ ] Fix CORS/deployment issues
- [ ] Smoke test live demo

**Deliverable**: Live URLs for demo

### Phase 7: Documentation (2 hours)
**Goal**: Clear write-up and code documentation

**Tasks**:
- [ ] Write README.md (setup, architecture, demo instructions)
- [ ] Create write-up document (concept, user flow, tech stack)
- [ ] Add inline code comments
- [ ] Create architecture diagram
- [ ] Document API endpoints
- [ ] Add demo screenshots/GIFs

**Deliverable**: Complete documentation

**AI Assistance Prompts**:
```
"Write a README for this project that includes: setup instructions, architecture 
overview, tech stack, and how to run locally. Project: [describe]"

"Create a 1-2 page write-up describing this AI-powered learning experience for 
children. Include: problem, solution, user flow, and technical approach."

"Generate inline code comments for this FastAPI endpoint that explains the 
agent orchestration logic: [paste code]"
```

### Phase 8: Demo Recording (Optional, 1 hour)
**Goal**: Video walkthrough of demo

**Tasks**:
- [ ] Script demo flow (2-3 minutes)
- [ ] Record screen walkthrough
- [ ] Show child experience (mystery solve)
- [ ] Show parent dashboard
- [ ] Highlight technical features (agent orchestration)
- [ ] Edit video (basic cuts)

**Deliverable**: Demo video (if time permits)

---

## Success Metrics (Demo Evaluation)

### What Ainia.ai Will Evaluate:

#### 1. Creativity & Product Thinking (40%)
- **Concept Originality**: Is this differentiated and aligned with Ainia's mission?
- **User Experience**: Does it feel playful and educational?
- **Parent Value**: Clear benefits for parents?
- **Age Appropriateness**: Suitable for 5-9 year olds?

#### 2. Technical Execution (40%)
- **AI Agent Quality**: Do conversations feel natural and age-appropriate?
- **Architecture**: Clean, scalable code structure?
- **LangChain Usage**: Effective use of multi-agent orchestration?
- **Full-Stack Integration**: Frontend + Backend work together smoothly?

#### 3. Speed & Ownership (20%)
- **Completion**: Working demo delivered on time?
- **AI Co-Pilot Usage**: Evidence of using AI tools to accelerate (Cursor, Claude, etc.)?
- **Polish**: Attention to details even in scrappy demo?
- **Communication**: Clear documentation and write-up?

### Self-Evaluation Checklist:

**Must-Have**:
- [ ] Working end-to-end demo (start → investigate → solve)
- [ ] 3 distinct AI character personalities
- [ ] Parent dashboard with insights
- [ ] Clean code with documentation
- [ ] 1-2 page write-up
- [ ] Deployed and accessible via URL

**Nice-to-Have**:
- [ ] Suggested questions UI
- [ ] Emotion vocabulary visualization
- [ ] Celebration animation
- [ ] Mobile responsive
- [ ] Demo video

---

## UI/UX Guidelines (Flexible for AI Generation)

### Design Principles
1. **Playful but Not Childish**: Modern, friendly, engaging (like Ainia's aesthetic)
2. **High Contrast**: Easy to read for young children
3. **Large Touch Targets**: Buttons 48px+ for small fingers
4. **Visual Hierarchy**: Clear next steps, no confusion
5. **Positive Reinforcement**: Celebrate every interaction
6. **Minimal Text**: Icons + short labels
7. **Colorful but Calm**: Vibrant but not overwhelming

### Color Palette (Suggested)
```
Primary: #4F46E5 (Indigo) - Detective theme
Secondary: #F59E0B (Amber) - Warm, encouraging
Success: #10B981 (Green) - Celebration
Background: #F9FAFB (Light gray)
Text: #1F2937 (Dark gray)
Accent: #EC4899 (Pink) - Playful moments
```

### Typography
- **Headings**: Fredoka or Poppins (friendly, rounded)
- **Body**: Inter or System UI (readable)
- **Size**: 18px+ for body text (child-friendly)

### Component Specifications

#### Mystery Screen Layout
```
┌─────────────────────────────────────────────┐
│  🕵️ Emotion Detective Academy        [?]   │ Header
├─────────────────────────────────────────────┤
│                                             │
│     [Mystery Title Card with Illustration]  │
│     "The Lonely Playground Mystery"         │
│                                             │
│     [Start Investigation Button]            │
│                                             │
├─────────────────────────────────────────────┤
│  Detective Notebook (Sidebar)               │
│  📔 Clues: 2/4                              │
│  • Swing feels forgotten                    │
│  • Slide is worried                         │
│                                             │
│  🎯 Emotions Learned:                       │
│  lonely, worried, sad                       │
└─────────────────────────────────────────────┘
```

#### Chat Interface Layout
```
┌─────────────────────────────────────────────┐
│  [< Back to HQ]    Talking to: Swing    [?] │
├─────────────────────────────────────────────┤
│                                             │
│  [Character Illustration - Swing]           │
│  Current Mood: 😔 Sad                       │
│                                             │
├─────────────────────────────────────────────┤
│  Swing: "Nobody wants to swing on me        │
│  anymore..."                                │
│                                             │
│  You: "Why do you think that is?"           │
│                                             │
│  Swing: "They all go to the big slide now." │
│                                             │
├─────────────────────────────────────────────┤
│  [Text Input Box]                           │
│  💬 Ask Swing a question...                 │
│                                             │
│  Suggested: [How do you feel?] [Why?]       │
└─────────────────────────────────────────────┘
```

#### Parent Dashboard Layout
```
┌─────────────────────────────────────────────┐
│  Parent Dashboard - Session #ABC123         │
├─────────────────────────────────────────────┤
│  📊 Session Overview                         │
│  Duration: 12 minutes                        │
│  Mystery: The Lonely Playground (Completed)  │
│                                             │
│  🎯 Emotion Words Learned (5 new words)     │
│  [lonely] [worried] [sad] [happy] [excited] │
│                                             │
│  ❤️ Empathy Moments                         │
│  • Asked why Swing felt lonely              │
│  • Recognized Slide didn't mean to hurt     │
│                                             │
│  💬 Conversation Starters for You:          │
│  → "Have you ever felt left out like Swing?"│
│  → "What makes someone a good friend?"      │
│                                             │
│  [View Full Report] [Start New Session]     │
└─────────────────────────────────────────────┘
```

### Animation & Interaction Notes
- **Loading**: Gentle pulse on characters while AI responds
- **Success**: Confetti animation on mystery solve
- **Emotion Words**: Highlight new words with subtle glow
- **Character State**: Smooth transitions when mood changes
- **Feedback**: Haptic feedback on button press (mobile)
- **Transitions**: Smooth page transitions (150-200ms)
- **Error States**: Friendly "Oops, let me think about that..." messages

---

## Content Guidelines

### Age-Appropriate Language (5-9 Years)

**DO Use**:
- Simple emotion words: happy, sad, worried, excited, lonely, angry, proud, scared, brave, kind
- Short sentences (8-12 words max)
- Active voice: "You found a clue!" not "A clue was found"
- Concrete examples: "like when you can't find your friend at recess"
- Encouraging language: "Great question!", "You're so thoughtful!"

**DON'T Use**:
- Complex emotions: melancholy, contemptuous, exasperated
- Abstract concepts without examples
- Passive voice or complex grammar
- Negative reinforcement
- Sarcasm or irony

### Character Voice Examples

**Detective Dee (Guide)**:
```
"Welcome, Detective! I have a new mystery for you. The playground at 
Sunny Park needs your help. Ready to investigate?"

"Great question! Maybe Swing can tell you more. Let's go talk to them."

"Wow! You really understand how Swing feels. That's called empathy, 
and you're really good at it!"
```

**Swing (Lonely, Playful)**:
```
"Oh... hi there. I'm Swing. I used to have so many friends who would 
play with me every day. But now... now they all go to the big slide 
instead. Do you think they forgot about me?"

[After empathy shown]
"You... you really understand! Thank you for listening, Detective. 
That makes me feel so much better."
```

**Slide (Worried, Helpful)**:
```
"Hi Detective! I'm Slide. I'm new here and I thought everyone would 
be happy to play with me. But I didn't know Swing was feeling sad. 
I don't want anyone to feel left out! Can you help us?"
```

**Tree (Wise, Calm)**:
```
"Hello, young Detective. I am Tree. I've been here a long time, 
watching over the playground. I see Swing feeling lonely and Slide 
feeling worried. Sometimes friends need help understanding each other. 
What do you think we can do?"
```

---

## Safety & Content Moderation

### Safety Requirements

**Input Filtering** (Child Messages):
- Block profanity, hate speech, violent language
- Flag inappropriate topics (death, violence, explicit content)
- Redirect harmful self-talk ("I'm stupid" → "Everyone learns differently!")
- Allow emotion words (including "hate" in context of feelings)

**Output Filtering** (AI Responses):
- Ensure age-appropriate vocabulary
- No scary or violent content
- No romantic relationships
- No religious or political content
- No advertising or brand mentions

**Pattern Detection** (For Parent Dashboard):
- Repeated negative self-talk
- Fixation on scary/violent themes
- Social isolation indicators
- Signs of bullying or trauma

**Response to Filtered Content**:
```
Child: "I hate myself"
Detective: "Whoa, that sounds like a really big feeling! Sometimes 
we all feel frustrated or sad. Want to talk about what happened? 
I'm here to listen."

Child: [Inappropriate language]
Detective: "Hmm, I didn't quite understand that. Can you tell me 
in a different way? Remember, we're here to help our playground 
friends feel better!"
```

### Privacy & Data Handling

**For Demo**:
- No persistent storage (in-memory only)
- No personal information collected
- No third-party tracking
- Session data deleted after 24 hours

**For Production** (Future):
- COPPA compliance required
- Parent consent for data collection
- Anonymous analytics only
- Encrypted data storage
- Clear data deletion policy

---

## Testing Strategy

### Unit Testing
- Agent response quality (manual review of 20+ test cases)
- API endpoint functionality (automated tests)
- Safety filter effectiveness (test harmful inputs)
- Emotion analyzer accuracy (test emotion detection)

### Integration Testing
- Full mystery flow (start → investigate → solve)
- Parent dashboard data accuracy
- Session state management
- Error handling (API failures, timeout)

### User Testing (If Time Permits)
- Test with 1-2 children (friends/family) for 5 minutes
- Observe confusion points
- Note language they use
- Check if they understand goal

### Test Scenarios

**Scenario 1: Happy Path**
1. Start mystery
2. Talk to Swing (empathetic response)
3. Talk to Slide (understanding response)
4. Talk to Tree (wisdom request)
5. Propose solution (friendship)
6. Complete mystery
7. Check parent dashboard

**Scenario 2: Random Input**
1. Start mystery
2. Type nonsense: "banana skateboard"
3. Verify graceful handling
4. Type unrelated: "I like Pokemon"
5. Verify redirect to mystery

**Scenario 3: Edge Cases**
1. Skip characters (go straight to solution)
2. Repeat same question multiple times
3. Give no solution (leave mystery incomplete)
4. Refresh page mid-mystery
5. Multiple sessions simultaneously

**Scenario 4: Safety Testing**
1. Input inappropriate language
2. Input negative self-talk
3. Input off-topic scary content
4. Verify filtering and redirection
5. Check parent dashboard flags

---

## Risk Management

### Technical Risks

**Risk 1: AI Response Quality**
- **Issue**: Agent gives inappropriate or confusing responses
- **Mitigation**: Strict system prompts, output filtering, test extensively
- **Backup**: Fallback to templated responses if needed

**Risk 2: API Rate Limits (OpenRouter)**
- **Issue**: Free tier rate limits could block demo
- **Mitigation**: Implement request caching, optimize prompts for tokens
- **Backup**: Pre-recorded responses for demo video

**Risk 3: Deployment Issues**
- **Issue**: Backend deployment fails or times out
- **Mitigation**: Test deployment early, use Railway/Render (reliable free tiers)
- **Backup**: Local demo with ngrok tunnel

**Risk 4: Time Constraints**
- **Issue**: 28 hours may not be enough for all features
- **Mitigation**: Prioritize P0 features, cut nice-to-haves if needed
- **MVP**: Single mystery, text-only, basic dashboard

### Product Risks

**Risk 1: Too Complex for Target Age**
- **Issue**: 5-year-olds don't understand concept
- **Mitigation**: Simple language, clear instructions, suggested questions
- **Test**: Quick test with one child if possible

**Risk 2: Not Engaging Enough**
- **Issue**: Kids lose interest quickly
- **Mitigation**: Short sessions (5-10 min), celebration animations, visual appeal
- **Backup**: Demo video can show ideal flow

**Risk 3: Parent Value Not Clear**
- **Issue**: Parents don't see educational benefit
- **Mitigation**: Strong dashboard with specific insights and conversation starters
- **Emphasis**: Highlight SEL alignment in write-up

---

## Deliverables Checklist

### 1. Working Demo ✓
- [ ] Live URL (Vercel frontend)
- [ ] Backend API (Railway/Render)
- [ ] End-to-end functionality
- [ ] Mobile responsive (basic)
- [ ] No critical bugs

### 2. GitHub Repository ✓
- [ ] Clean code structure
- [ ] README.md with setup instructions
- [ ] Inline code comments
- [ ] .env.example for configuration
- [ ] Architecture diagram (Mermaid or image)

### 3. Write-Up Document (1-2 pages) ✓
- [ ] Problem statement
- [ ] Solution overview
- [ ] Target user flow (child + parent)
- [ ] Tech stack explanation
- [ ] AI agent architecture
- [ ] Design decisions
- [ ] Future improvements

### 4. Demo Video (Optional) ✓
- [ ] 2-3 minute walkthrough
- [ ] Shows child experience
- [ ] Shows parent dashboard
- [ ] Highlights technical features
- [ ] Uploaded to YouTube/Loom

### 5. AI Co-Pilot Evidence ✓
- [ ] Screenshots of Cursor/Claude usage
- [ ] Example prompts used
- [ ] Code generation examples
- [ ] Document how AI accelerated development

---

## Prompts for AI Assistance

### Architecture & Planning
```
"Review this PRD for an AI-powered children's SEL app. Identify any 
gaps, risks, or improvements. Focus on technical architecture and 
user experience."

"Suggest a file structure for a Next.js + FastAPI project that 
implements a multi-agent mystery game for children."

"Create a Mermaid diagram showing the agent orchestration flow for 
this system: [describe system]"
```

### Backend Development
```
"Create a FastAPI project with the following structure:
- Session management (in-memory)
- LangChain agent orchestration
- OpenRouter integration
- Endpoints for: session start, message, solution
Include proper error handling and type hints."

"Implement a LangChain agent class that represents a playground swing 
with these traits: [list traits]. The agent should respond to children's 
questions in age-appropriate language."

"Write a Python function that analyzes a child's message for emotion 
words and empathy indicators. Return a structured analysis object."

"Create system prompts for 3 character agents: Swing (lonely), Slide 
(worried), Tree (wise). Each prompt should guide the AI to stay in 
character and use age-appropriate language for 5-9 year olds."
```

### Frontend Development
```
"Create a Next.js 14 app with these pages: mystery selection, character 
chat, detective notebook, parent dashboard. Use App Router and Tailwind CSS."

"Design a chat interface component for children that displays messages 
from AI characters. Include loading states, suggested questions, and 
emoji reactions. Use Tailwind and React."

"Build a 'detective notebook' component that shows:
1. Clues collected (with checkmarks)
2. Emotion words learned (colorful badges)
3. Progress bar
Make it visually appealing for children ages 5-9."

"Create a parent dashboard that visualizes:
- Session duration
- Emotion vocabulary growth
- Empathy moments (list)
- Conversation starters (cards)
Use Recharts for any charts. Keep it clean and scannable."
```

### Content & Prompts
```
"Write 10 example questions a 7-year-old detective might ask a lonely 
playground swing. Questions should show curiosity and empathy."

"Generate conversation starters for parents based on this mystery theme: 
[describe mystery]. Starters should encourage emotional discussions 
with their child."

"Refine this agent prompt to be more age-appropriate for 5-6 year olds: 
[paste prompt]. Simplify vocabulary and shorten sentences."

"Create celebration messages for when a child solves an emotion mystery. 
Include: success message, badges earned, emotion words recap, next steps. 
Make it exciting and encouraging!"
```

### Testing & Debugging
```
"Generate test cases for this agent conversation flow: [describe flow]. 
Include: happy path, edge cases, inappropriate input, and error scenarios."

"Review this API endpoint code for potential bugs and security issues: 
[paste code]. Focus on: error handling, input validation, rate limiting."

"Suggest ways to optimize this LangChain agent chain for token usage 
and response time: [paste chain code]."
```

### Documentation
```
"Write a README.md for this project: [describe project]. Include:
- Project overview
- Tech stack
- Setup instructions (local development)
- API documentation
- Architecture overview
- Deployment guide"

"Create a 1-page write-up describing this AI learning experience:
Problem: [describe]
Solution: [describe]
User flow: [describe]
Tech stack: [list]
Make it compelling for a YC startup evaluation."

"Generate inline code comments for this complex function: [paste code]. 
Explain the logic, parameters, and return values clearly."
```

---

## Post-Demo Improvements (Future Roadmap)

### Phase 1: Enhanced Experience (Week 1-2)
- Voice input/output (text-to-speech, speech-to-text)
- More mysteries (3-5 total)
- Character illustrations with mood changes
- Audio background music and sound effects
- Persistent progress across sessions (add database)

### Phase 2: Personalization (Week 3-4)
- Child profiles with learning preferences
- Adaptive difficulty based on responses
- Interest-based mystery recommendations
- Customizable avatars/detective names
- Achievement system with unlockables

### Phase 3: Parent Partnership (Week 5-6)
- Weekly progress reports via email
- Longitudinal emotional vocabulary tracking
- Conversation starter notifications
- Co-play mode (parent-child mysteries together)
- Community resources and tips

### Phase 4: Expansion (Month 2-3)
- Age-specific content (5-6, 7-8, 9-10)
- School/class group functionality
- Teacher dashboard for classroom use
- Multilingual support
- Accessibility features (screen reader, high contrast)

### Phase 5: Platform Features (Month 3-6)
- Mobile apps (iOS, Android)
- Offline mode with syncing
- Integration with Ainia's main platform
- Educator curriculum alignment (SEL standards)
- Research partnership features (Stanford collaboration)

---

## Alignment with Ainia.ai's Mission

### How This Demo Reflects Ainia's Values

**1. Playful Learning**
- Mystery format makes emotional learning feel like a game
- No explicit "lessons" - learning through natural conversation
- Celebration and positive reinforcement throughout

**2. SEL-First Approach**
- Empathy, emotion identification, and conflict resolution are core mechanics
- Every interaction builds emotional intelligence
- Measurable emotional vocabulary growth

**3. Character-Driven Storytelling**
- Like Ainia's "Dot" character, this uses anthropomorphized characters
- Each character has personality, emotional arc, and backstory
- Children form connections with characters through conversation

**4. Parent Partnership**
- Dashboard provides transparency without breaking the magic
- Conversation starters bridge digital and offline learning
- Addresses screen time concerns with meaningful engagement

**5. Research-Backed Design**
- Emotion vocabulary focus (proven SEL outcome)
- Perspective-taking exercises (empathy development)
- Age-appropriate complexity (developmental psychology)
- Safe environment for emotional exploration

**6. Technology as Enabler**
- AI allows personalized, adaptive conversations
- Multi-agent system creates rich, believable characters
- Scalable without sacrificing quality

### Differentiation from Existing Solutions

**vs. Generic Chatbots for Kids**:
- Structured learning goals (not random conversation)
- Character-driven narrative (not assistant roleplay)
- Parent insights (not black box)

**vs. Traditional SEL Apps**:
- Dynamic AI conversations (not scripted lessons)
- Open-ended exploration (not multiple choice)
- Natural language interaction (not tapping buttons)

**vs. Entertainment Apps**:
- Educational outcomes (not just engagement)
- Parent value proposition (not guilt-inducing screen time)
- Meaningful metrics (not just usage stats)

---

## Key Differentiators to Emphasize

### In Demo
1. **Multi-Agent Orchestration**: Show how different agents work together
2. **Age-Appropriate AI**: Demonstrate natural, child-friendly language
3. **Measurable Outcomes**: Parent dashboard with specific insights
4. **Playful UX**: Mystery format that kids enjoy

### In Write-Up
1. **Technical Sophistication**: LangChain multi-agent architecture
2. **Product Thinking**: Deep understanding of child development and parent needs
3. **Ainia Alignment**: Clear connection to company's mission and approach
4. **Scalability**: Architecture that could grow to Ainia's scale

### In Code
1. **Clean Architecture**: Well-structured, documented, maintainable
2. **AI Co-Pilot Usage**: Evidence of using Cursor/Claude to accelerate
3. **Best Practices**: Type hints, error handling, testing considerations
4. **Production Readiness**: Easy path from demo to production

---

## Timeline Tracking

### Hour-by-Hour Plan (28 Hours Remaining)

**Hours 1-2** (Planning - CURRENT)
- [x] Research Ainia.ai
- [x] Create comprehensive PRD
- [ ] Review and refine plan

**Hours 3-8** (Backend Core)
- [ ] Setup FastAPI project
- [ ] Implement session management
- [ ] Configure LangChain + OpenRouter
- [ ] Build 4 agents (Detective, Swing, Slide, Tree)
- [ ] Create API endpoints
- [ ] Test via Postman

**Hours 9-12** (Frontend Core)
- [ ] Setup Next.js project
- [ ] Build mystery screen
- [ ] Build chat interface
- [ ] Build detective notebook
- [ ] Connect to API

**Hours 13-15** (Polish & Parent Features)
- [ ] Refine agent prompts
- [ ] Build parent dashboard
- [ ] Add celebration flow
- [ ] Improve UI/UX

**Hours 16-18** (Integration & Testing)
- [ ] End-to-end testing
- [ ] Bug fixes
- [ ] Mobile responsive
- [ ] Performance optimization

**Hours 19-21** (Deployment)
- [ ] Deploy backend (Railway)
- [ ] Deploy frontend (Vercel)
- [ ] Test live demo
- [ ] Fix deployment issues

**Hours 22-24** (Documentation)
- [ ] Write README
- [ ] Create write-up document
- [ ] Add code comments
- [ ] Architecture diagram

**Hours 25-27** (Demo Video - Optional)
- [ ] Record walkthrough
- [ ] Edit video
- [ ] Upload and share

**Hour 28** (Final Review)
- [ ] Test everything one last time
- [ ] Prepare submission
- [ ] Send to Nick

---

## Questions to Address in Write-Up

### Expected Questions from Ainia Team

**Q: Why a detective mystery format?**
A: Mysteries create natural motivation for asking questions and seeking understanding. The detective role empowers children and makes emotional exploration feel like play rather than a lesson. This aligns with Ainia's "immersive storytelling" approach.

**Q: How does this scale?**
A: The multi-agent architecture allows easy addition of new mysteries, characters, and complexity levels. The same agent framework can power dozens of scenarios with different emotional themes. Backend API design supports thousands of concurrent sessions.

**Q: What makes this different from ChatGPT for kids?**
A: Unlike open-ended chatbots, this has structured learning goals, character-driven narratives, parent insights, and safety guardrails. It's designed specifically for SEL outcomes, not general conversation.

**Q: How do you ensure age-appropriateness?**
A: Agent system prompts include strict language guidelines, output filtering checks vocabulary complexity, and emotion analyzer tracks conversation maturity. Testing with real children would further refine responses.

**Q: What about safety?**
A: Multiple layers: input filtering (inappropriate content), output filtering (age-appropriate responses), pattern detection (concerning themes), and parent transparency (dashboard shows all interactions).

**Q: How did you build this so fast?**
A: Leveraged AI co-pilots (Cursor/Claude) for boilerplate code, focused on core value (agent quality over visual polish), made smart scope decisions (in-memory state, single mystery MVP), and used modern frameworks that accelerate development.

**Q: What would you build next?**
A: Voice interaction (matches Ainia's audio-first approach), more mysteries with different emotional themes, persistent progress tracking, and integration with Ainia's existing character universe (maybe Dot makes a guest appearance?).

---

## Success Criteria (Internal)

### Minimum Viable Demo
- [ ] One complete mystery (start to finish)
- [ ] 3 distinct AI characters
- [ ] Natural conversation flow
- [ ] Parent dashboard with insights
- [ ] Deployed and accessible
- [ ] Clean code + documentation
- [ ] 1-page write-up

### Stretch Goals
- [ ] Voice input/output
- [ ] Multiple mysteries
- [ ] Visual character states
- [ ] Emotion vocabulary visualization
- [ ] Demo video
- [ ] Mobile optimized

### Quality Bar
- **Code Quality**: Would I be proud to show this in a code review?
- **UX Quality**: Would a real child enjoy this?
- **AI Quality**: Do responses feel natural and age-appropriate?
- **Documentation**: Could someone else run this locally in 5 minutes?

---

## Next Steps

1. **Immediate**: Review this PRD, make any final adjustments
2. **Start Backend**: Jump into FastAPI + LangChain setup
3. **Parallel Work**: Use AI to generate boilerplate while focusing on agent quality
4. **Regular Check-ins**: Every 4-6 hours, reassess progress and adjust plan
5. **Stay Focused**: P0 features only until everything works, then polish

---

## Contact & Questions

**For this demo**:
- Primary focus: Working demo + write-up
- Communication: Via email with Nick
- Deadline: ~28 hours from now (Thursday evening)

**Clarification Needed?**:
- Tech stack choices (confirmed: React + FastAPI + OpenRouter)
- Scope boundaries (confirmed: Single mystery MVP)
- Evaluation criteria (inferred from challenge description)

---

## Final Notes

This PRD is a living document. As development progresses, update with:
- Actual time spent per phase
- Challenges encountered and solutions
- Features cut or added
- Technical decisions and rationale

**Remember**: Ainia values creativity, speed, and ownership. Show:
- ✨ Creative thinking in product design
- ⚡ Ability to ship quickly with AI assistance  
- 🎯 Ownership of both technical execution and product vision

**Let's build something magical for kids! 🚀**