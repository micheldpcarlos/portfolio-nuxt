# micheldpcarlos.com

Personal site and blog. Nuxt 4 + Nuxt Content v3, fully static, served from Cloudflare Workers static assets.

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm generate     # static build to .output/public
pnpm preview      # serve the static build with wrangler (mirrors production)
pnpm lint
pnpm typecheck
pnpm test
```

## How it is organised

Three layers, kept strictly apart:

| Layer   | Where                          | What                                                                 |
| ------- | ------------------------------ | -------------------------------------------------------------------- |
| Content | `content/`, `content.config.ts` | Markdown + YAML validated by zod schemas (blog, projects, pages, home) |
| Data    | `app/data/`, `app/composables/useSiteData.ts` | View models, the only place that queries Nuxt Content     |
| Themes  | `app/themes/`                  | Pure views: a shell plus one component per view, see `types.ts`      |

Pages under `app/pages/[[theme]]/` are thin: load a model through a composable, hand it to `<ThemeView>`.

### Writing content

- **Post**: `content/blog/YYYY-MM-DD-slug.md` with `title`, `description`, `date: "YYYY-MM-DD"`, optional `tags`, `updated`, `cover`, `draft: true`.
- **Project**: `content/projects/slug.md` with `title`, `description`, `date`, `status` (`live` | `wip` | `archived`), optional `repo`, `url`, `store`, `stack`, `featured`.
- **Home**: `content/home.yml` (hero, skills grid, limits).
- **About**: `content/pages/about.md`.

A missing or malformed field fails the build.

### Adding a theme

1. Add the id to `THEME_IDS` in `shared/themes.ts`.
2. Create `app/themes/<id>/` with a `Shell.vue` and every view listed in `ViewProps` (`app/themes/types.ts`).
3. Register it in `app/themes/index.ts` with async imports so it stays in its own chunk.

The theme is then served under `/<id>/...`, prerendered by the crawler, excluded from the sitemap, and canonicalised to the root URL. The default theme has no prefix.

## Deploying

`wrangler.jsonc` describes a Worker with static assets only. Cloudflare Workers Builds is connected to this repo:

- Build command: `pnpm generate`
- Deploy command: `pnpm exec wrangler deploy`
- Preview builds enabled for non-production branches.
