def extract_insurance_type(text: str):
    text = text.lower()

    if "health" in text:
        return "health"
    if "car" in text or "vehicle" in text:
        return "car"
    if "life" in text:
        return "life"
    if "travel" in text:
        return "travel"
    if "family" in text:
        return "family"

    return None