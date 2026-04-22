from schemas.response_schema import text_response, cards_response
from tools.backend_client import get_plans
from core.extractor import extract_insurance_type


# -----------------------------
# START BUY FLOW
# -----------------------------
async def start_buy_flow(query: str, session: dict) -> dict:
    insurance_type = extract_insurance_type(query)

    # MEMORY fallback
    if not insurance_type:
        insurance_type = session.get("last_topic")

    if insurance_type:
        session["stage"] = "SHOW_PLANS"
        session["data"] = {"type": insurance_type}

        print("[MEMORY] Using type:", insurance_type)

        return await fetch_and_return_plans(insurance_type)

    # fallback → ask
    session["stage"] = "ASK_TYPE"
    session["data"] = {}

    return text_response(
        "What type of insurance are you looking for? (health, car, life...)"
    )


# -----------------------------
# CONTINUE BUY FLOW
# -----------------------------
async def continue_buy_flow(query: str, session: dict) -> dict:
    insurance_type = extract_insurance_type(query)

    if not insurance_type:
        insurance_type = session.get("last_topic")

    if insurance_type:
        session["data"]["type"] = insurance_type
        session["stage"] = "SHOW_PLANS"

        print("[MEMORY] Continuing with type:", insurance_type)

        return await fetch_and_return_plans(insurance_type)

    return text_response(
        "I didn’t catch the type. Are you looking for health, car, or life insurance?"
    )


# -----------------------------
# FETCH PLANS
# -----------------------------
async def fetch_and_return_plans(insurance_type: str):
    plans = await get_plans(insurance_type)

    if not plans:
        return text_response("No plans found for this type.")

    cards = []
    for plan in plans:
        cards.append({
            "title": plan.get("title") or plan.get("planName") or "Insurance Plan",

            "price": (
                plan.get("basePremium")
                or plan.get("premium")
                or "N/A"
            ),

            "coverage": (
                plan.get("coverage")
                or plan.get("sumInsured")
            ),

            "action": f"/plans/{plan.get('_id')}"
        })

    return cards_response(cards)