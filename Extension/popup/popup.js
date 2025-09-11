// Check login status 
chrome.storage.local.get("authToken", (result) => {
  if (!result.authToken) {
    document.getElementById("loginFirst").style.display="block";
    return;
  }

  // Event listener for Analyze button
  document.getElementById("analyzeBtn").addEventListener("click", () => {
    const text = document.getElementById("userInput").value.trim();
    const results = document.getElementById("results");

    if (!text) {
      results.innerHTML = "<p>Please enter some text to analyze.</p>";
      return;
    }

    // Call backend API with token
    fetch("http://localhost:3000/analyze", {//!Change Route
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + result.authToken
      },
      body: JSON.stringify({ type:'text', content: text })
    })
      .then(res => res.json())
      .then(data => {
        results.innerHTML = `
          <strong>Analysis Results</strong>
          <p>Input: "${text}"</p>
          <p>Result: <b>${data.result?.toUpperCase() || "N/A"}</b></p>
          <p>Confidence: ${(data.confidence * 100).toFixed(1)}%</p>
        `;
      })
      .catch(err => {
        console.error("Error:", err);
        results.innerHTML = "<p style='color:#ef4444;'>❌ Error analyzing text.</p>";
      });
  });
});

// Always attach Clear button handler
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("userInput").value = "";
  document.getElementById("results").innerHTML = `
    <strong>Analysis Results</strong>
    <p>Results will appear here after analysis.</p>
  `;
});
