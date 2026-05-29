function App() {

  const analyzeResume = async () => {
    try {
      const response = await fetch("http://localhost:8000/analyze");

      const data = await response.json();

      console.log(data);

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
    </div>
  );
}

export default App;