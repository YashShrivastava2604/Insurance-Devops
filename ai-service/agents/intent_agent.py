import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "llama-3.3-70b-versatile"


def detect_intent(query: str) -> dict:
    try:
        prompt = f"""
Classify the user's intent.

Possible intents:
- EXPLAIN → asking about insurance
- BUY → wants to purchase insurance
- GREETING → hello, hi
- UNKNOWN → anything else

User Query:
{query}

Return ONLY one word: EXPLAIN, BUY, GREETING, or UNKNOWN
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are an intent classifier."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        intent = response.choices[0].message.content.strip().upper()

        if intent not in ["EXPLAIN", "BUY", "GREETING", "UNKNOWN"]:
            intent = "UNKNOWN"

        return {"intent": intent}

    except Exception as e:
        print("Intent error:", repr(e))
        return {"intent": "UNKNOWN"}