from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from uuid import uuid4
from datetime import datetime
import os

app = FastAPI(title="Emotion Detective Academy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session store
SESSIONS: Dict[str, Dict[str, Any]] = {}

# Import utilities
from .utils import call_llm_with_fallback
from .prompts import get_character_prompt


class SessionStartRequest(BaseModel):
    mystery_id: str = Field(default="playground_lonely")
    child_name: Optional[str] = None


class MessageRequest(BaseModel):
    session_id: str
    message: str
    target_character: str


class SolutionRequest(BaseModel):
    session_id: str
    solution: str


@app.get("/")
async def root():
    return {"message": "Emotion Detective Academy API"}


@app.post("/api/session/start")
async def start_session(req: SessionStartRequest):
    session_id = str(uuid4())
    session = {
        "session_id": session_id,
        "child_name": req.child_name,
        "mystery_id": req.mystery_id,
        "start_time": datetime.utcnow().isoformat(),
        "messages": [],
        "clues_collected": [],
        "emotion_vocabulary": [],
        "mystery_stage": "investigating",
        "character_states": {
            "swing": {"mood": "sad", "talked_to": False},
            "slide": {"mood": "worried", "talked_to": False},
            "tree": {"mood": "calm", "talked_to": False},
        },
        "solution_proposed": None,
        "empathy_moments": [],
    }
    SESSIONS[session_id] = session

    return {
        "session_id": session_id,
        "mystery": {
            "id": "playground_lonely",
            "title": "The Lonely Playground Mystery",
            "description": "Something's not right at Sunny Park Playground...",
            "detective_intro": "Welcome, Detective! I need your help solving a mystery. The playground feels lonely today, and I think our friends Swing, Slide, and Tree know what's going on. Can you help me find out?",
        },
        "characters": [
            {"id": "swing", "name": "Swing", "status": "available"},
            {"id": "slide", "name": "Slide", "status": "available"},
            {"id": "tree", "name": "Tree", "status": "available"},
        ],
    }


@app.post("/api/message")
async def send_message(req: MessageRequest):
    session = SESSIONS.get(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Get character prompt
    system_prompt = get_character_prompt(req.target_character)
    
    # Build conversation context
    recent_messages = session["messages"][-4:] if len(session["messages"]) > 4 else session["messages"]
    context = "\n".join([f"{m['role']}: {m['content']}" for m in recent_messages])
    
    prompt = f"{system_prompt}\n\nConversation so far:\n{context}\n\nChild says: {req.message}\n\nRespond in 2-3 short sentences:"

    # Call LLM
    llm_response = await call_llm_with_fallback(prompt)

    # Update session
    session["messages"].append({
        "role": "child",
        "content": req.message,
        "timestamp": datetime.utcnow().isoformat(),
    })
    session["messages"].append({
        "role": req.target_character,
        "character_id": req.target_character,
        "content": llm_response,
        "emotion_detected": [],
        "timestamp": datetime.utcnow().isoformat(),
    })

    # Update character state
    if req.target_character in session["character_states"]:
        session["character_states"][req.target_character]["talked_to"] = True

    # Collect clues
    clue = None
    if req.target_character == "swing" and not any("swing feels forgotten" in c for c in session["clues_collected"]):
        clue = "Swing feels forgotten and lonely"
        session["clues_collected"].append(clue)
    elif req.target_character == "slide" and not any("slide is worried" in c for c in session["clues_collected"]):
        clue = "Slide is worried about Swing's feelings"
        session["clues_collected"].append(clue)
    elif req.target_character == "tree" and not any("tree sees both" in c for c in session["clues_collected"]):
        clue = "Tree sees both friends want to be included"
        session["clues_collected"].append(clue)

    # Extract emotion words (simple keyword detection)
    emotion_words = ["lonely", "sad", "worried", "happy", "excited", "grateful", "forgotten", "left out"]
    for word in emotion_words:
        if word in req.message.lower() or word in llm_response.lower():
            if word not in session["emotion_vocabulary"]:
                session["emotion_vocabulary"].append(word)

    # Detect empathy moments
    empathy_keywords = ["why", "feel", "how", "understand", "help"]
    if any(kw in req.message.lower() for kw in empathy_keywords):
        session["empathy_moments"].append(f"Asked: '{req.message}'")

    progress = {
        "clues_collected": len(session["clues_collected"]),
        "total_clues": 3,
        "mystery_stage": session["mystery_stage"],
    }

    return {
        "response": llm_response,
        "character": req.target_character,
        "emotion_detected": [],
        "clue_unlocked": clue,
        "progress": progress,
    }


@app.post("/api/solution")
async def submit_solution(req: SolutionRequest):
    session = SESSIONS.get(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    session["solution_proposed"] = req.solution
    session["mystery_stage"] = "completed"

    character_reactions = {
        "swing": "You really understand me! Thank you, Detective! I feel so much better knowing someone cares.",
        "slide": "That's a wonderful idea! Swing, let's be friends and play together!",
        "tree": "I knew you'd figure it out, Detective. You have a kind heart.",
    }

    celebration = {
        "title": "Mystery Solved!",
        "badges_earned": ["Empathy Detective", "Friendship Helper"],
        "emotion_words_learned": session["emotion_vocabulary"],
    }

    return {
        "outcome": "success",
        "character_reactions": character_reactions,
        "celebration": celebration,
    }


@app.get("/api/parent/session/{session_id}")
async def parent_session(session_id: str):
    session = SESSIONS.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Calculate duration
    start = datetime.fromisoformat(session["start_time"])
    duration = (datetime.utcnow() - start).seconds // 60

    emotion_words = session.get("emotion_vocabulary", [])
    empathy_moments = session.get("empathy_moments", [])[:5]  # Top 5

    return {
        "session_summary": {
            "duration_minutes": duration,
            "mystery_completed": session.get("mystery_stage") == "completed",
            "emotion_words": emotion_words,
            "empathy_moments": empathy_moments,
            "questions_asked": len([m for m in session.get("messages", []) if m.get("role") == "child"]),
            "solution": session.get("solution_proposed", ""),
        },
        "conversation_starters": [
            "Ask your child: 'Have you ever felt left out like Swing?'",
            "Discuss: 'What makes someone a good friend?'",
            "Explore: 'How do you include others when they feel lonely?'",
        ],
        "growth_indicators": {
            "empathy_score": min(10, len(empathy_moments) * 2),
            "emotional_vocabulary": len(emotion_words),
            "perspective_taking": "strong" if len(empathy_moments) > 3 else "developing",
        },
    }


# Vercel serverless handler
try:
    from mangum import Mangum
    handler = Mangum(app)
except ImportError:
    handler = None

