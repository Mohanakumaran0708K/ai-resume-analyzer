import { useState } from "react";

function App() {

  const [score, setScore] = useState(null);

  const analyzeResume = async () => {
    try {
      const response = await fetch("http://localhost:8000/analyze");

      const data = await response.json();

      setScore(data.score);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>AI Resume Analyzer</h1>

      <button onClick={analyzeResume}>
        Analyze Resume
      </button>

      {score !== null && (
        <h2>Resume Score: {score}</h2>
      )}

    </div>
  );
}

export default App;