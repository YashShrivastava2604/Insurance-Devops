# In-memory session store
from typing import Dict, Any

SESSIONS: Dict[str, Dict[str, Any]] = {}


def get_session(session_id: str) -> Dict:
    if session_id not in SESSIONS:
        SESSIONS[session_id] = {
            "stage": None,
            "intent": None,
            "data": {}
        }
    return SESSIONS[session_id]


def update_session(session_id: str, updates: Dict):
    session = get_session(session_id)
    session.update(updates)
    SESSIONS[session_id] = session

def add_message(session, role, content):
    if "history" not in session:
        session["history"] = []

    session["history"].append({
        "role": role,
        "content": content
    })

    # keep last 5 messages
    session["history"] = session["history"][-5:]