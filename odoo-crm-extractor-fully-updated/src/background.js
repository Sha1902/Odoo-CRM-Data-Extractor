chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "EXTRACT_NOW") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) return;

      const tabId = tabs[0].id;

      // STEP 1: Inject content script if not present
      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ["src/contentScript.js"]
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Injection failed:", chrome.runtime.lastError.message);
            return;
          }

          // STEP 2: Send extraction message
          chrome.tabs.sendMessage(tabId, { type: "RUN_EXTRACTION" });
        }
      );
    });
  }
});
