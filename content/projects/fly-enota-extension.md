---
title: Fly e-Nota Automator
description: Chrome extension that fills the 34-step service export invoice form on the Fly e-Nota portal from a spreadsheet of clients.
date: "2026-03-01"
status: live
repo: https://github.com/micheldpcarlos/fly-enota-extension
stack: [JavaScript, Manifest V3, Chrome APIs]
featured: false
---

## What it does

Fly e-Nota is the invoicing portal used by many Brazilian municipalities. Issuing a service export invoice means filling 34 fields across five tabs, every month, for every client.

The extension imports clients from an XLSX file once, lets you pick one from the popup, and fills the whole form, switching tabs as it goes. Each filled field scrolls into view and flashes so you can follow along. The final "Issue" click stays manual on purpose.

## Details worth mentioning

- Works on both the production and the staging portal.
- Marks rows with missing structured columns as incomplete and blocks them until the spreadsheet is fixed.
- Keeps a timestamped log of the last run in the popup.
- Stores everything in `chrome.storage.local`, no backend involved.
