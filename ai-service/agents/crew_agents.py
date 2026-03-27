from crewai import Agent, Task, Crew, LLM
from google import genai
import os
from dotenv import load_dotenv
from rag.retiever import retrieve

# Load API key
load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# Create LLM
gemini_llm = LLM(model="gemini-2.5-flash")


def gemini_call(self, prompt, **kwargs):
    if isinstance(prompt, list):
        prompt = "\n".join(
            msg.get("content", "") for msg in prompt if isinstance(msg, dict)
        )
    elif isinstance(prompt, dict):
        prompt = prompt.get("content", "")

    try:
        response = client.models.generate_content(
            model=self.model,
            contents=prompt
        )

        if hasattr(response, "text") and response.text:
            return response.text

        return str(response)

    except Exception as e:
        return f"LLM Error: {str(e)}"


# Bind to CrewAI
gemini_llm.call = gemini_call.__get__(gemini_llm, LLM)


def run_agents(query):
    # 🔥 RAG retrieval
    retrieved_chunks = retrieve(query)
    context = "\n".join(retrieved_chunks)

    researcher = Agent(
        role="Researcher",
        goal="Find key points",
        backstory="Expert in insurance domain",
        llm=gemini_llm
    )

    teacher = Agent(
        role="Insurance Advisor",
        goal="Explain insurance concepts clearly and professionally for users",
        backstory="Experienced insurance expert who explains things in a clean, concise, and user-friendly way",
        llm=gemini_llm
    )

    task1 = Task(
        description=f"""
        Extract key facts about: {query}

        Context:
        {context}
        """,
        expected_output="Bullet point key facts",
        agent=researcher
    )

    task2 = Task(
        description=f"""
        Explain the following in a professional, clear, and user-friendly tone:

        {query}

        Rules:
        - No classroom tone
        - No phrases like "Alright class"
        - Keep it concise and practical
        - Use simple but professional language
        - Your motto is to explain what is benefit/purpose of insurance(specify if type of insurance)
        """,
        expected_output="Clear professional explanation",
        agent=teacher,
        context=[task1]
    )

    crew = Crew(
        agents=[researcher, teacher],
        tasks=[task1, task2],
        verbose=True
    )

    return crew.kickoff()