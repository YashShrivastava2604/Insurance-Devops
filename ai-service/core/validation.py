import re

# Regex for basic sanitization
ALLOWED_CHARS_REGEX = re.compile(r"^[a-zA-Z0-9\s.,!?'-]+$")

INSURANCE_KEYWORDS = [
    "insurance", "health", "car", "vehicle", "life",
    "policy", "premium", "claim", "coverage", "plan",
    "medical", "hospital"
]

def validate_query(query: str):
    if not query or not query.strip():
        return False, "Query cannot be empty."

    query = query.strip()

    if len(query) > 300:
        return False, "Query too long."

    # reject weird / unsafe characters
    if not ALLOWED_CHARS_REGEX.match(query):
        return False, "Invalid characters in query."

    # repeated spam like aaaaaaa or !!!!!!!
    if re.search(r"(.)\1{6,}", query):
        return False, "Query looks like spam."

    # very weak query
    if len(query.split()) < 1:
        return False, "Please provide more detail."

    return True, query

# Domain specific Input Validation
def is_domain_relevant(query: str):
    query = query.lower()
    return any(word in query for word in INSURANCE_KEYWORDS)