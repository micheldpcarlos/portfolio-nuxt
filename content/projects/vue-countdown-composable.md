---
title: vue-countdown-composable
description: Easy to use Vue 3 countdown composables. Date and duration based, TypeScript ready, SSR friendly, and Vapor compatible.
date: "2025-11-01"
status: live
repo: https://github.com/micheldpcarlos/vue-countdown-composable
url: https://micheldpcarlos.github.io/vue-countdown-composable/
stack: [Vue 3, TypeScript, Vitest, VitePress]
featured: true
---

## What it does

A small npm library with three composables: `useDateCountdown` for counting down to a moment, `useNumberCountdown` for a duration, and `useStopwatch` for counting up.

- **Simple, flexible API** with sensible defaults and full control when you need it.
- **Type strong**, written in TypeScript with complete declarations.
- **Vapor compatible**, built on pure reactivity APIs so it works in Vapor and virtual DOM components alike.
- **Leak free**, timers are cleaned up when the owning scope is disposed.
- **SSR friendly**, nothing touches the window until the client mounts.

## Why it exists

Every project eventually needs a countdown, and every hand-rolled one leaks an interval or drifts. I wrote it once, properly, and published it.

## Release process

A release is a version bump merged to main. The documentation site with live demos is built with VitePress and deployed to GitHub Pages.
