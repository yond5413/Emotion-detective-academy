import os
import httpx
from typing import Optional

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

DEFAULT_MODELS = [
    "arliai/qwq-32b-arliai-rpr-v1:free", # role playing model could be fun                                                                        │
      "openai/gpt-oss-20b:free",                                           
         "tencent/hunyuan-a13b-instruct:free"
]

def parse_llm_response(raw_text: str) -> str:
    """Cleans up raw LLM output to get only the character's dialogue."""
    text = raw_text.strip()

    # Remove common assistant markers
    if text.startswith("<｜assistant｜>"):
        text = text[len("<｜assistant｜>"):].strip()

    # Remove any remaining XML-like tags (e.g., <Slide>)
    # This is a simple implementation. A regex would be more robust.
    while "<" in text and ">" in text:
        start = text.find("<")
        end = text.find(">")
        if start < end:
            text = text[:start] + text[end+1:]
        else:
            break
            
    # Remove action asterisks
    text = text.replace("*", "").strip()

    return text


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
            print(f"Attempting to call model: {model}")
            try:
                response = await client.post(OPENROUTER_API_URL, headers=headers, json=payload)
                print(f"Response status code: {response.status_code}")
                if response.status_code == 200:
                    data = response.json()
                    message = data.get("choices", [{}])[0].get("message", {})
                    text = message.get("content", "")

                    if not text:
                        # Some models return the response in the 'reasoning' field
                        text = message.get("reasoning", "")

                    if text:
                        clean_text = parse_llm_response(text)
                        if clean_text:
                            print("Successfully got response from model.")
                            return clean_text
                        else:
                            print(f"Empty response after parsing from model: {model}. Raw data: {data}")
                    else:
                        print(f"Empty response from model: {model}. Response data: {data}")
                else:
                    print(f"Request failed for model {model}. Response text: {response.text}")
            except Exception as e:
                print(f"Exception occurred for model {model}: {e}")
                continue

    # Final fallback
    return "That's such a kind question. Let's think together about how our friends are feeling and what might help them."


