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
          body: formData,
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
  let scoreStatus = "";

  if (score >= 80) {
    scoreColor = "green";
    scoreStatus = "Excellent Resume!";
  } else if (score >= 50) {
    scoreColor = "orange";
    scoreStatus = "Good Resume, but there's room for improvement.";
  } else if (score !== null) {
    scoreColor = "red";
    scoreStatus =
      "Your resume needs improvement. Consider adding more relevant experience and skills.";
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>AI Resume Analyzer</h1>

      <input type="file" onChange={handleFileChange} />

      <br />
      <br />

      <button onClick={analyzeResume}>
        Analyze Resume
      </button>

      {score !== null && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f4f4f4",
            textAlign: "center",
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Resume Score</h3>

          <h1
            style={{
              color: scoreColor,
              margin: "10px 0",
            }}
          >
            {score}/100
          </h1>

          <p>{scoreStatus}</p>
        </div>
      )}

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resume Preview</h3>
          <p>{preview}</p>
        </div>
      )}
    </div>
  );
}

export default App;