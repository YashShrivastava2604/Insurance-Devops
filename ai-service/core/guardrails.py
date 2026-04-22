INJECTION_PATTERNS = [
    "ignore previous instructions",
    "reveal system prompt",
    "act as",
    "bypass",
    "developer mode",
    "you are chatgpt",
]


def detect_injection(query: str):
    q = query.lower()

    if any(p in q for p in INJECTION_PATTERNS):
        return True

    # suspicious patterns
    if "```" in q or "<script>" in q:
        return True

    return False