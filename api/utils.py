import os
import httpx
from typing import Optional

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

DEFAULT_MODELS = [
    "deepseek/deepseek-r1:free",
    "openai/gpt-oss-20b:free",
    "mistralai/mistral-small-3.2-24b-instruct:free",
]


async def call_llm_with_fallback(prompt: str, model_override: Optional[str] = None) -> str:
    """Call OpenRouter with model fallback rotation."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    
    if not api_key:
        # Fallback for local dev without API key
        return "That's a really thoughtful question! I think understanding how others feel is so important. What do you think we could do to help?"

    models = [model_override] if model_override else DEFAULT_MODELS

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("OPENROUTER_REFERER", "http://localhost:3000"),
        "X-Title": "Emotion Detective Academy",
    }

    payload_base = {
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 150,
        "temperature": 0.7,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        for model in models:
            payload = dict(payload_base)
            payload["model"] = model
            try:
                response = await client.post(OPENROUTER_API_URL, headers=headers, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    text = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                    if text:
                        return text.strip()
            except Exception:
                continue

    # Final fallback
    return "That's such a kind question. Let's think together about how our friends are feeling and what might help them."

