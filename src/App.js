import { useState } from "react";


function App() {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const analyzeResume = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await fetch(
        "http://localhost:8000/analyze",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      setPreview(data.preview);
      setScore(data.score);
    } catch (error) {
      console.error(error);
    }
  };
  let scoreColor = "black";

if (score >= 80) {
  scoreColor = "green";
} else if (score >= 50) {
  scoreColor = "orange";
} else if (score !== null) {
  scoreColor = "red";
}
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
  <h2 style={{ color: scoreColor }}>
    Resume Score: {score}
  </h2>
)}

      {preview && (
        <div>
          <h3>Resume Preview</h3>
          <p>{preview}</p>
        </div>
      )}
    </div>
  );
}

export default App;