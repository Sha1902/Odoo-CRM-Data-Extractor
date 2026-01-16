console.log("✅ Odoo content script loaded");

function extractContacts() {
  const rows = document.querySelectorAll(".o_list_view tbody tr");
  return [...rows].map((row, idx) => ({
    id: "contact-" + idx,
    name: row.innerText.split("\n")[0] || "",
    email: "",
    phone: "",
    company: "",
    salesperson: ""
  }));
}

function extractOpportunities() {
  const cards = document.querySelectorAll(".o_kanban_record");
  return [...cards].map((card, idx) => ({
    id: "opp-" + idx,
    name: card.innerText.split("\n")[0] || "",
    revenue: 0,
    stage: "",
    probability: 0,
    closeDate: ""
  }));
}

function extractActivities() {
  const acts = document.querySelectorAll(".o_activity");
  return [...acts].map((a, idx) => ({
    id: "act-" + idx,
    type: a.innerText || "",
    summary: "",
    due: "",
    assignee: "",
    done: false
  }));
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "RUN_EXTRACTION") {
    if (typeof showIndicator === "function") {
      showIndicator("Extracting...");
    }

    const data = {
      contacts: extractContacts(),
      opportunities: extractOpportunities(),
      activities: extractActivities(),
      lastSync: Date.now()
    };

    chrome.storage.local.set({ odoo_data: data }, () => {
      if (typeof showIndicator === "function") {
        showIndicator("✅ Extraction Complete");
      }
      console.log("Extraction finished");
    });
  }
});