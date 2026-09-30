---
title: Rebuilding my site with Nuxt Content and a theme contract
description: Why I replaced a VitePress portfolio with Nuxt 4, how content, data, and themes are separated, and where it is hosted for free.
date: "2026-09-29"
tags: [nuxt, vue, cloudflare, meta]
---

The previous version of this site was a VitePress project pinned to a 2024 release candidate, with twenty markdown files sitting at the root. Some were portfolio pages, some were test targets for browser automation demos, and at least one was a saved ChatGPT export I forgot to delete. It worked, but it did not scale to the two things I wanted next: a blog, and themes that look nothing like each other.

## What changed

The new site is **Nuxt 4 with Nuxt Content v3**, built fully static with `nuxt generate`. Content lives in collections with schemas, so a post missing a date fails the build instead of rendering wrong.

Three layers are kept strictly apart:

1. **Content** is markdown and YAML under `content/`, validated by zod schemas.
2. **Data** is a small module of view models. Queries and mappers live in one place, and pages call composables that return typed models.
3. **Themes** are pure views. A theme implements a fixed set of views (home, post, post list, project, and so on) and a shell around them. It never touches Nuxt Content directly.

The theme lives in the URL prefix, so the default theme is at the root and any other theme sits under its own path. Every combination pre-renders, which means no flash of the wrong theme and shareable links.

## Where it runs

Cloudflare Workers with static assets. Static asset requests are unmetered on the free plan, and since the site is fully static there is no Worker code and no database to hit a limit on.

## What's next

A second theme built in 3D with TresJS. The contract is already in place, so that work is scene and views only.
