import os
import base64
import io
from huggingface_hub import InferenceClient
from PIL import Image

HF_TOKEN = os.getenv("HF_TOKEN")

# -----------------------------
# CLIENT SETUP
# -----------------------------
client = InferenceClient(
    provider="hf-inference",
    api_key=HF_TOKEN,
)


# -----------------------------
# PROMPT ENGINEERING (IMPORTANT)
# -----------------------------
def build_prompt(query: str) -> str:
    return f"""
Create a clean, modern infographic illustration about: {query}.

Style:
- minimal flat design
- professional UI style
- vector illustration
- soft colors
- white background

Content:
- include icons related to insurance
- show concepts visually (coverage, protection, health, risk)
- simple layout like a presentation slide

Avoid:
- text-heavy images
- clutter
- dark backgrounds
"""


# -----------------------------
# IMAGE GENERATION
# -----------------------------
def generate_insurance_image(query: str):
    try:
        prompt = build_prompt(query)

        print("[IMAGE] Generating with SDXL...")

        image = client.text_to_image(
            prompt,
            model="stabilityai/stable-diffusion-xl-base-1.0",
        )

        if image is None:
            print("[IMAGE ERROR] No image returned")
            return None

        # -----------------------------
        # CONVERT TO BASE64 (CRITICAL)
        # -----------------------------
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        base64_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

        return f"data:image/png;base64,{base64_image}"

    except Exception as e:
        print("[IMAGE ERROR]:", repr(e))
        return None