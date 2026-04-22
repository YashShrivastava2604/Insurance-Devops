from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid
from core.state import get_session, add_message
from core.router import handle_query
from core.state import get_session


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RequestBody(BaseModel):
    query: str
    session_id: str = None


@app.get("/")
def health():
    return {"status": "AI service running"}

@app.post("/chat")
async def chat(req: RequestBody):
    session_id = req.session_id or str(uuid.uuid4())
    session = get_session(session_id)

    # ✅ store user message
    add_message(session, "user", req.query)

    response = await handle_query(req.query, session)

    # ✅ store AI response text only
    if isinstance(response, dict):
        text = response.get("content", {}).get("text")
        if text:
            add_message(session, "assistant", text)

    return {
        "session_id": session_id,
        "response": response
    }