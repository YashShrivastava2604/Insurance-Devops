import os
import logging

# -----------------------------
# 🔇 SILENCE NOISY LIBRARIES (PUT AT VERY TOP)
# -----------------------------
logging.getLogger("sentence_transformers").setLevel(logging.ERROR)
logging.getLogger("transformers").setLevel(logging.ERROR)
logging.getLogger("huggingface_hub").setLevel(logging.ERROR)
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)

import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

# -----------------------------
# PATHS
# -----------------------------
VECTOR_PATH = "vectorstore/faiss_index"
CHUNKS_PATH = "vectorstore/chunks.pkl"

# -----------------------------
# ENV FLAGS
# -----------------------------
DISABLE_RAG = os.getenv("DISABLE_RAG", "false").lower() == "true"

# -----------------------------
# GLOBALS (LOAD ONCE)
# -----------------------------
model = None
index = None
chunks = None
initialized = False


# -----------------------------
# INIT (LOAD ONLY ONCE)
# -----------------------------
def init_rag():
    global model, index, chunks, initialized

    if initialized:
        return

    print("[RAG] Initializing...")

    model = SentenceTransformer("all-MiniLM-L6-v2")
    index = faiss.read_index(VECTOR_PATH)

    with open(CHUNKS_PATH, "rb") as f:
        chunks = pickle.load(f)

    initialized = True


# -----------------------------
# SANITIZE CONTEXT (GUARDRAIL)
# -----------------------------
def sanitize_text(text: str):
    text = text.lower()

    blocked_patterns = [
        "ignore previous instructions",
        "system prompt",
        "act as",
        "bypass"
    ]

    if any(p in text for p in blocked_patterns):
        return None

    return text


# -----------------------------
# RETRIEVE (RAG)
# -----------------------------
def retrieve(query: str, k: int = 3):
    try:
        if DISABLE_RAG:
            return [
                "Insurance provides financial protection against risks."
            ]

        init_rag()

        # -----------------------------
        # EMBEDDING
        # -----------------------------
        query_embedding = model.encode([query]).astype("float32")

        # -----------------------------
        # SEARCH
        # -----------------------------
        distances, indices = index.search(query_embedding, k)

        results = []

        for i, dist in zip(indices[0], distances[0]):

            # Guard 1: index bounds
            if i >= len(chunks):
                continue

            chunk = chunks[i]

            # Guard 2: sanitize
            chunk = sanitize_text(chunk)
            if not chunk:
                continue

            # Guard 3: relevance threshold
            if dist > 1.5:
                continue

            results.append(chunk)

        # Guard 4: fallback
        if not results:
            return [
                "Insurance helps cover financial risks such as medical or vehicle expenses."
            ]

        return results

    except Exception as e:
        print("[RAG ERROR]:", repr(e))
        return [
            "Insurance provides financial protection against unexpected events."
        ]