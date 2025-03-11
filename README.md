# LyricMatch

LyricMatch is an AI-powered lyrics matching and analysis tool that leverages Large Language Models (LLMs) to generate and analyze song lyrics. It uses **Gemini 1.5 Pro** for advanced text generation and comparison, enabling users to find similar lyrics, generate new song lyrics, and analyze lyrical patterns.

## 🚀 Features
- **Lyrics Matching**: Find songs with similar lyrics.
- **Lyric Generation**: Generate new song lyrics based on a prompt.
- **Sentiment Analysis**: Analyze the sentiment of lyrics (happy, sad, energetic, etc.).
- **Artist & Genre Suggestion**: Recommend artists and genres based on input lyrics.
- **Real-time AI Processing**: Uses **Gemini 1.5 Pro** for NLP-based text analysis.

## 🏗️ Tech Stack
- **Frontend**: React (in `app.js`)
- **Backend**: Flask (in `app.py`)
- **AI Model**: Gemini 1.5 Pro for text generation and analysis
- **Database**: SQLite / MongoDB (if applicable)

## 📦 Prerequisites
Before setting up the project, make sure you have the following installed:

- **Python 3.8+**
- **Node.js 16+ & npm**
- **Git**
- **Virtual Environment (venv)**

## 🔧 Installation & Setup
Follow these steps to set up LyricMatch locally:

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/Expressduro/Lyric-Match.git
 cd Lyric-Match
```

### 2️⃣ Backend Setup (Flask API)
```sh
 cd backend   # If backend folder exists, otherwise remain in the root directory
 python -m venv venv  # Create a virtual environment
 source venv/bin/activate  # For macOS/Linux
 venv\Scripts\activate  # For Windows
 pip install -r requirements.txt  # Install dependencies
```

Start the Flask server:
```sh
 python app.py
```

### 3️⃣ Frontend Setup (React)
```sh
 cd frontend  # If frontend folder exists, otherwise remain in the root directory
 npm install  # Install dependencies
 npm start    # Run the React app
```

### 4️⃣ API Keys Configuration
- Add your **Gemini 1.5 Pro API Key** in `app.py`:
```python
 GEMINI_API_KEY = "your_api_key_here"
```

## 📌 Usage
1. Open your browser and go to: `http://localhost:3000`
2. Enter lyrics to analyze, generate, or match songs.
3. View the results powered by **LLMs**.

## 🤝 Contributing
Feel free to submit issues or pull requests if you want to contribute.

