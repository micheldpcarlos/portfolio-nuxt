---
title: GringaChange
description: Browser extension for people paid in foreign currency. Live exchange rates, remittance simulator, and rate alerts, all against the Brazilian real.
date: "2026-06-01"
status: live
repo: https://github.com/micheldpcarlos/gringachange
store: https://chromewebstore.google.com/detail/gringachange/amkfidglmdkclmhgnnkicocfcgoplanp
stack: [Vue 3, TypeScript, WXT, lightweight-charts, Playwright]
featured: true
---

## What it does

GringaChange is for anyone who earns in dollars, euros, or another currency and spends in Brazilian reais, whether living abroad or working remotely from Brazil.

- **Live rate badge** on the toolbar icon, refreshed every minute, with the net value after your own fees.
- **Twelve months of history** rendered with lightweight-charts.
- **Remittance simulator** comparing Wise, Remessa Online, banks, and Western Union, with editable fees and spreads.
- **Rate alerts** that fire even with the popup closed.
- **Daily variation notifications** when a currency moves more than your threshold.

Nine currencies are supported: USD, EUR, GBP, CAD, ARS, JPY, CHF, AUD, and CNY.

## Why it exists

Every existing tool either showed the raw interbank rate, which nobody actually receives, or hid the fees inside a "converted amount". I wanted the number that lands in my account.

## How it's built

The extension is built on WXT with Vue 3 and TypeScript, published on the Chrome Web Store, and tested end to end with Playwright driving the real extension in Chromium. It is also listed as a WXT showcase project.
