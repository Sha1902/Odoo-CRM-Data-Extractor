document.getElementById("extractBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "EXTRACT_NOW" });
});

chrome.storage.local.get("odoo_data", (res) => {
  const data = res.odoo_data || {};

  document.getElementById("contacts").innerText =
    "Contacts: " + (data.contacts ? data.contacts.length : 0);

  document.getElementById("opps").innerText =
    "Opportunities: " + (data.opportunities ? data.opportunities.length : 0);

  document.getElementById("acts").innerText =
    "Activities: " + (data.activities ? data.activities.length : 0);

  if (data.lastSync) {
    document.getElementById("lastSync").innerText =
      "Last Sync: " + new Date(data.lastSync).toLocaleString();
  }
});