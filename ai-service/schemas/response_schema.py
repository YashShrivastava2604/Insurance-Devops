def multi_response(text=None, cards=None, image=None, metadata=None):
    return {
        "type": "multi",
        "content": {
            "text": text,
            "cards": cards,
            "image": image
        },
        "metadata": metadata or {}
    }


def text_response(text):
    return multi_response(text=text)


def cards_response(cards, text=None):
    return multi_response(text=text, cards=cards)


def error_response(message="Something went wrong"):
    return multi_response(
        text=message,
        metadata={"error": True}
    )