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

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(file.name);
    }
  };

  return (
    <div>
      <h1>AI Resume Analyzer</h1>

      <input
        type="file"
        onChange={handleFileChange}
      />

      <br />
      <br />

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