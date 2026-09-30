import tailwindcss from '@tailwindcss/vite'
import { themePrefixes } from './shared/themes'

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
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      script: isProd ? [umamiScript] : [],
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

  ogImage: { enabled: false },

  sitemap: {
    // Themed copies of a page are not separate content; only root URLs are canonical.
    exclude: themePrefixes.map(prefix => `${prefix}/**`),
  },

  nitro: {
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
