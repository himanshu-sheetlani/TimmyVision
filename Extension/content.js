// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "highlightText") {
    highlightText(message.text, message.result, message.confidenc);
  }
});

// Highlight function
function highlightText(text, result, confidence) {
  const color = result === "fake" ? "red" : result === "real" ? "green" : "orange";
  const tooltip = `${result.toUpperCase()} | Confidence: ${(confidence * 100).toFixed(1)}%`;

  // Walk through DOM and wrap matching text
  walk(document.body, text, color, tooltip);
}

// Recursively walk DOM nodes
function walk(node, text, color, tooltip) {
  if (node.nodeType === 3) { // text node
    const regex = new RegExp(text, "gi");
    if (regex.test(node.nodeValue)) {
      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.style.color = "#fff";
      span.style.padding = "2px";
      span.style.borderRadius = "3px";
      span.title = tooltip;
      span.textContent = node.nodeValue;
      node.parentNode.replaceChild(span, node);
    }
  } else if (node.nodeType === 1 && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
    for (let i = 0; i < node.childNodes.length; i++) {
      walk(node.childNodes[i], text, color, tooltip);
    }
  }
}
