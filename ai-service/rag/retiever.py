# Lightweight RAG (no ML dependencies)

def retrieve(query, k=3):
    try:
        with open("data/insurance_knowledge.txt", "r") as f:
            chunks = f.read().split("\n")

        # simple keyword match (cheap but works)
        results = [c for c in chunks if any(word.lower() in c.lower() for word in query.split())]

        return results[:k] if results else chunks[:k]

    except Exception:
        return ["Insurance protects against financial loss."]