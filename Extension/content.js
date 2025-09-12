chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "checkNews") {
    showDialog("Analyzing...");

    fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message.data })
    })
    .then(res => alert(res.json()))
    .then(data => {
      const result = `${data.Result} | Confidence: ${data.Confidence}`;
      showDialog(result);
    })

    .catch((err) => {
      showDialog(`❌ Error analyzing. ${err}`);
    });
  }
});

function showDialog(content) {
  let dialog = document.getElementById("fakeNewsDialog");
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.id = "fakeNewsDialog";
    dialog.style.position = "fixed";
    dialog.style.bottom = "20px";
    dialog.style.right = "20px";
    dialog.style.background = "#111";
    dialog.style.color = "#fff";
    dialog.style.padding = "15px";
    dialog.style.borderRadius = "8px";
    dialog.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
    dialog.style.zIndex = "9999";
    document.body.appendChild(dialog);
  }
  dialog.textContent = content;
}
