function showIndicator(status = "Extracting...") {
  let host = document.getElementById("odoo-extractor-indicator");
  if (!host) {
    host = document.createElement("div");
    host.id = "odoo-extractor-indicator";
    document.body.appendChild(host);
    host.attachShadow({ mode: "open" });
  }

  host.shadowRoot.innerHTML = `
    <style>
      div {
        position: fixed;
        top: 10px;
        right: 10px;
        background: #2563eb;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 99999;
      }
    </style>
    <div>${status}</div>
  `;
}

window.showIndicator = showIndicator;