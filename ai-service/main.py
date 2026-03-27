from fastapi import FastAPI
from pydantic import BaseModel
from agents.crew_agents import run_agents
from multimodal.image_generator import generate_image
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 🔥 CORS (required for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RequestBody(BaseModel):
    query: str


@app.get("/")
def health():
    return {"status": "AI service running"}


@app.post("/generate")
def generate(req: RequestBody):
    query = req.query

    # Step 1: text (CrewAI + RAG)
    result = run_agents(query)

    # Step 2: image
    image_base64 = generate_image(query)

    return {
        "text": str(result),
        "image": image_base64
    }