from agents.intent_agent import detect_intent
from schemas.response_schema import text_response, error_response

from flows.explain_flow import explain_flow
from flows.buy_flow import start_buy_flow, continue_buy_flow

from core.logger import logger
from core.validation import validate_query, is_domain_relevant
from core.guardrails import detect_injection


def is_greeting(query: str):
    greetings = [
        "hi", "hello", "hey", "hii", "heyy",
        "good morning", "good evening", "good afternoon"
    ]
    return query.lower().strip() in greetings


async def handle_query(query: str, session: dict) -> dict:
    try:
        logger.info(f"Incoming query: {query}")

        # VALIDATION
        is_valid, result = validate_query(query)
        if not is_valid:
            return text_response(result)

        query = result

        # GREETING
        if is_greeting(query):
            return text_response(
                "Hey! I'm your insurance advisor 🤝\n"
                "Ask me anything about insurance or buying plans."
            )

        # GUARD
        if detect_injection(query):
            return text_response("I can't process that request.")

        # DOMAIN
        if not is_domain_relevant(query):
            return text_response(
                "I can help with insurance-related queries like health, car, or life insurance."
            )

        # CONTINUE FLOW
        if session.get("stage"):
            logger.info(f"Continuing flow: {session.get('stage')}")
            return await continue_buy_flow(query, session)

        # INTENT
        intent_data = detect_intent(query)
        intent = intent_data.get("intent")

        logger.info(f"Detected intent: {intent}")

        if intent == "EXPLAIN":
            return explain_flow(query, session)

        elif intent == "BUY":
            return await start_buy_flow(query, session)

        return text_response("I didn't fully understand. Can you rephrase?")

    except Exception:
        import traceback
        logger.error("Router error")
        traceback.print_exc()
        return error_response()