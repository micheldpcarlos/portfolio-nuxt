import tailwindcss from '@tailwindcss/vite'
import { themePrefixes, themeRedirectScript, themeRoutePattern } from './shared/themes'

const isProd = process.env.NODE_ENV === 'production'

// Self-hosted Umami tracker (public/myscript.js) so ad blockers don't drop it.
const umamiScript = {
  defer: true,
  src: '/myscript.js',
  'data-website-id': 'c8101198-d324-4021-b22b-963a60bcedf4',
}

export default defineNuxtConfig({
  compatibilityDate: '2026-09-29',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@tresjs/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      script: [
        // Sends visitors with a remembered theme to it before first paint.
        { innerHTML: themeRedirectScript, tagPosition: 'head' },
        ...(isProd ? [umamiScript] : []),
      ],
    },
  },

  site: {
    url: 'https://micheldpcarlos.com',
    name: 'Michel Carlos',
    description: 'Software engineer, frontend specialist. Notes on Vue, browser extensions, and building for the web.',
    defaultLocale: 'en',
  },

  content: {
    experimental: {
      // Node 24 ships node:sqlite, so no native build step is needed.
      sqliteConnector: 'native',
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  icon: {
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    clientBundle: { scan: true },
  },

  hooks: {
    // Every page also exists under /theme/<id>/... for each non-default theme.
    // The param is constrained to registered ids, so anything else is a 404.
    'pages:extend'(pages) {
      const themed = pages.map(page => ({
        ...page,
        name: page.name ? `theme-${page.name}` : undefined,
        path: `${themeRoutePattern}${page.path === '/' ? '' : page.path}`,
      }))
      pages.push(...themed)
    },
  },

  ogImage: { enabled: false },

  sitemap: {
    // Themed copies of a page are not separate content; only root URLs are canonical.
    exclude: themePrefixes.map(prefix => `${prefix}/**`),
  },

  nitro: {
    // Pin the static preset. Cloudflare Builds sets WORKERS_CI, which would
    // otherwise auto-select the cloudflare-module server preset and make
    // Wrangler look for a server entry that `nuxt generate` never produces.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      // Non-default themes live under a prefix; seeding their root lets the
      // crawler discover every themed page through the theme's own links.
      routes: ['/', '/rss.xml', ...themePrefixes],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
})
