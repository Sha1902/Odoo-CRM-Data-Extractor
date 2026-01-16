# Odoo CRM Data Extractor – Chrome Extension

## Overview
This Chrome Extension extracts **Contacts, Opportunities, and Activities** from **Odoo CRM**, stores the data locally, and displays it in a popup dashboard.  
The project demonstrates practical experience with **Chrome Extension APIs (Manifest V3)**, **DOM scraping on dynamic OWL-based applications**, **Shadow DOM UI injection**, and **local data persistence**.

---

## Tech Stack
- Chrome Extension **Manifest V3**
- Background Service Worker + Content Scripts
- Popup UI (Vanilla JS, React-ready architecture)
- Shadow DOM (for in-page extraction indicators)
- chrome.storage.local for persistence

---

## Features
- Extract Contacts, Opportunities, and Activities from Odoo CRM
- Handles Odoo **list and kanban views**
- Local data persistence with merge logic
- Popup dashboard with extraction trigger
- Shadow DOM based visual feedback
- Last sync timestamp display

---

## Data Extracted

### Contacts
- Name
- Email
- Phone
- Company
- Salesperson

### Opportunities
- Name
- Expected revenue
- Stage
- Probability
- Expected closing date

### Activities
- Type (call / meeting / to-do)
- Summary
- Due date
- Assigned to
- Status

---

## DOM Selection Strategy

### CSS Selectors vs XPath
- CSS selectors were chosen because:
  - Odoo exposes stable semantic class names
  - XPath is brittle in dynamic OWL re-renders
  - Data attributes are inconsistently exposed

### Handling Odoo OWL Framework
- Extraction runs after page load (`document_idle`)
- DOM is queried at extraction time to handle re-renders
- View-based detection prevents invalid extraction

### View Detection
- `.o_list_view` → List view
- `.o_kanban_view` → Kanban view

---

## Storage Schema

```json
{
  "odoo_data": {
    "contacts": [],
    "opportunities": [],
    "activities": [],
    "lastSync": 1234567890
  }
}
