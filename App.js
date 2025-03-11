import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [lyricSnippet, setLyricSnippet] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [result, setResult] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const fetchLyrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/generate_lyric_snippet");
      setLyricSnippet(response.data.lyric_snippet);
      setResult("");
      setUserGuess("");
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
    setLoading(false);
  };

  const checkAnswer = async () => {
    if (!userGuess.trim()) return;
    try {
      const response = await axios.post("http://127.0.0.1:8000/check_answer/", null, {
        params: { user_guess: userGuess }
      });
      setResult(response.data.result);
      setSongTitle(response.data.song?.title || "");
      setGamesPlayed(prev => prev + 1);
      if (response.data.result === "Correct! 🎉") {
        setWins(prev => prev + 1);
      } else {
        setLosses(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.appName}>🎵 Lyric Match 🎵</h1>
      <h2 style={styles.stats}>Games Played: {gamesPlayed} | Wins: {wins} | Losses: {losses}</h2>

      <button style={styles.button} onClick={fetchLyrics} disabled={loading}>
        {loading ? "Loading..." : "Generate Lyrics"}
      </button>

      {lyricSnippet && (
        <div style={styles.snippetBox}>
          <p style={styles.lyrics}>'{lyricSnippet}'</p>
        </div>
      )}

      {lyricSnippet && (
        <>
          <input
            type="text"
            placeholder="Enter song name..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={checkAnswer}>
            Submit Guess
          </button>
        </>
      )}

      {result && (
        <div style={styles.resultBox}>
          <p>{result}</p>
          {songTitle && <p>Correct Song: <b>{songTitle}</b></p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1DB954",
    marginBottom: "10px",
  },
  stats: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#1DB954",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
  snippetBox: {
    backgroundColor: "#333",
    padding: "15px",
    borderRadius: "8px",
    maxWidth: "80%",
    margin: "10px auto",
  },
  lyrics: {
    fontStyle: "italic",
    fontSize: "18px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    width: "80%",
    margin: "10px",
    textAlign: "center",
  },
  resultBox: {
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default App;
