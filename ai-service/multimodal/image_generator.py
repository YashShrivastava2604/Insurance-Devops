import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}"
}


def generate_image(prompt):

    full_prompt = f"""
    Modern clean infographic illustration about: {prompt}

    Style:
    - flat design
    - vector illustration
    - clean layout
    - icons and shapes
    - minimal or no text
    - corporate style
    - blue and orange color theme
    - white background

    IMPORTANT:
    - no readable text
    - no words
    - no letters
    - only visuals and icons
    """

    payload = {
        "inputs": full_prompt,
        "parameters": {
            "negative_prompt": "text, letters, words, blurry, messy, watermark",
            "width": 512,
            "height": 512,
            "num_inference_steps": 20
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        print(response.text)
        return None

    if "image" not in response.headers.get("content-type", ""):
        print(response.text)
        return None

    import base64
    return base64.b64encode(response.content).decode("utf-8")

    full_prompt = f"""
    Create a structured infographic with clear sections.

    Topic: {prompt}

    Layout:
    - Title at top
    - 3 to 5 sections with icons
    - minimal text
    - clean layout
    - white background
    """

    payload = {
        "inputs": full_prompt,
        "parameters": {
            "negative_prompt": "blurry, messy, too much text, distorted text",
            "width": 1024,
            "height": 1024,
            "guidance_scale": 7.5
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        print("Image API error:", response.text)
        return None

    if "image" not in response.headers.get("content-type", ""):
        print("Invalid image response:", response.text)
        return None

    return base64.b64encode(response.content).decode("utf-8")