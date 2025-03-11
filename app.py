import random
import os
import re
import uvicorn
import google.generativeai as genai
from fastapi import FastAPI
from dotenv import load_dotenv
from fuzzywuzzy import fuzz
from fastapi.middleware.cors import CORSMiddleware  # CORS for frontend-backend communication

# Load API Key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Google Gemini Client
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")

SONGS = [
    {"id": 1, "title": "Ocean Waves", "artist": "Royalty Free Music"},
    {"id": 2, "title": "Dreamscape", "artist": "Kevin MacLeod"},
    {"id": 3, "title": "Adventure Awaits", "artist": "No Copyright Sounds"},
    {"id": 4, "title": "Ethereal Journey", "artist": "Scott Buckley"},
    {"id": 5, "title": "Night Drive", "artist": "MBB"},
    {"id": 6, "title": "Tropical Breeze", "artist": "Ikson"},
    {"id": 7, "title": "Cloud Nine", "artist": "Vexento"},
    {"id": 8, "title": "Serene Vibes", "artist": "Chillhop Music"},
    {"id": 9, "title": "Sunrise", "artist": "Bensound"},
    {"id": 10, "title": "The Voyage", "artist": "White Sand"},
    {"id": 11, "title": "Beyond the Horizon", "artist": "LiQWYD"},
    {"id": 12, "title": "Echoes of Time", "artist": "Audio Library"},
    {"id": 13, "title": "Tranquility", "artist": "Chris Haugen"},
    {"id": 14, "title": "Cosmic Voyage", "artist": "StreamBeats"},
    {"id": 15, "title": "Afterglow", "artist": "Harris Heller"},
    {"id": 16, "title": "Midnight Jazz", "artist": "Markvard"},
    {"id": 17, "title": "Uplifting Spirits", "artist": "LAKEY INSPIRED"},
    {"id": 18, "title": "Lush Dreams", "artist": "Chillhop Records"},
    {"id": 19, "title": "Infinite Horizon", "artist": "Infraction"},
    {"id": 20, "title": "Wanderlust", "artist": "Ikson"}
]

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production (use frontend's URL)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_song = None  # Store the current song globally

def clean_text(text):
    """Normalize text for better matching."""
    return re.sub(r"[^\w\s]", "", text.lower().strip())

@app.get("/generate_lyric_snippet")
async def generate_lyric_snippet():
    """Select a random song and generate lyrics for it."""
    global current_song
    current_song = random.choice(SONGS)
    prompt = f"Generate 2-4 lines of lyrics from the song '{current_song['title']}' by {current_song['artist']} without mentioning its title."

    response = model.generate_content(prompt)
    lyrics_snippet = response.text.strip()

    return {"lyric_snippet": lyrics_snippet}

@app.post("/check_answer/")
async def check_answer(user_guess: str):
    """Check if the user's guessed song matches the correct one."""
    global current_song
    if not current_song:
        return {"error": "No song has been generated yet. Please generate lyrics first."}

    correct_title = clean_text(current_song["title"])
    user_guess_clean = clean_text(user_guess)

    match_score = fuzz.ratio(user_guess_clean, correct_title)

    if match_score > 80:
        return {"result": "Correct! 🎉", "song": current_song}
    else:
        return {"result": f"Incorrect ❌ (Correct: {current_song['title']})"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
