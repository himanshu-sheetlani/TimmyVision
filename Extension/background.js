chrome.runtime.onInstalled.addListener(() => {
  // Redirect to your website dashboard login page
  chrome.tabs.create({ url: "https://yourdashboard.com/login" }); //!login URL
});

// For selected text
chrome.contextMenus.create({
  id: "checkText",
  title: "Check Fake News (Text)",
  contexts: ["selection"]
});

// For images
chrome.contextMenus.create({
  id: "checkImage",
  title: "Check Fake News (Image)",
  contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, {
    action: "checkNews",
    data: info.selectionText || info.srcUrl
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "checkText") {
    // Send selected text to backend
    sendToBackend({ type: "text", content: info.selectionText }, tab);
  } else if (info.menuItemId === "checkImage") {
    // Send image URL to backend
    sendToBackend({ type: "image", content: info.srcUrl }, tab);
  }
});

function sendToBackend(payload, tab) {
  fetch("http://localhost:3000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (result) => {
        // alert(`Result: ${result.status} (Confidence: ${Math.round(result.confidence*100)}%)`);
        // alert(`Result: REAL (Confidence: 92.3%)`);
      },
      args: [data]
    });
  })
  .catch(err => console.error("API Error:", err));
}
