from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

# Load environmental variables from .env file
load_dotenv(r"J:\\Assignment software lab\\PROJECTNEW\\Backend\\.env")

# Access the API token
api_token  = os.getenv("API_TOKEN_GEMINI")


def get_answer(prompt:str)->str:
    client = genai.Client(api_key=api_token)


    # getting response from gemini API
    response = client.models.generate_content(
    model="gemini-2.0-flash-lite",
    config=types.GenerateContentConfig(
        system_instruction="You are a reputed script writer in creative industry and wrote popular twisted storyline shows. wrtie in under '300' words"),
    contents=f"{prompt}"
    )

    return response.text
