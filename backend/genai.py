from openai import OpenAI
from  ytTranscript import extractTranscript
from dotenv import load_dotenv
import os


load_dotenv()
client = OpenAI(
    api_key=os.getenv("APP_CHATAPI_KEY")
)


video_Id = "VdrEq0cODu4"
transcript = extractTranscript(video_Id)
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Summarize the YouTube video with the transcript: " + transcript}
    ]
)
print(response.choices[0].message.content)
