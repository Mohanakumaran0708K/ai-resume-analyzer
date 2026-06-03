import { useState } from "react";

function App() {

  const [file, setFile] = useState(null);

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

      console.log(data.preview);

    } catch (error) {
      console.error(error);
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
    </div>
  );
}

export default App;