document.getElementById("checkBtn").addEventListener("click", () => {
    const text = document.getElementById("inputText").value;

    // alert(text)
  fetch("http://localhost:3000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText = 
      `Result: ${data.result.toUpperCase()} (Confidence: ${(data.confidence * 100).toFixed(1)}%)`;
  })
  .catch(err => console.error("Error:", err));
});
