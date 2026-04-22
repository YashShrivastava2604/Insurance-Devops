import httpx

# CHANGE this to your backend URL
BASE_URL = "http://localhost:5000/api"


async def get_plans(insurance_type: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/plans",
                params={"type": insurance_type}
            )

            if response.status_code != 200:
                print("[BACKEND ERROR]:", response.text)
                return []

            return response.json()

    except Exception as e:
        print("[BACKEND EXCEPTION]:", repr(e))
        return []