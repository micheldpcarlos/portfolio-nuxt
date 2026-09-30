<script setup lang="ts">
import { site } from '#shared/site.config'
import ColorModeToggle from './components/ColorModeToggle.vue'

const { link } = useTheme()
const year = new Date().getFullYear()
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-contrast"
    >
      Skip to content
    </a>

    <header class="border-b border-line">
      <nav class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4" aria-label="Main">
        <NuxtLink :to="link('/')" class="font-semibold tracking-tight hover:text-brand">
          {{ site.name }} <span aria-hidden="true">🇧🇷</span>
        </NuxtLink>
        <ul class="flex items-center gap-1 sm:gap-2">
          <li v-for="item in site.nav" :key="item.to">
            <NuxtLink
              :to="link(item.to)"
              class="rounded px-2 py-1.5 text-sm text-fg-muted hover:text-fg"
              active-class="text-fg font-medium"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
          <li>
            <ThemeSelector trigger-class="rounded px-2 py-1.5 text-sm text-fg-muted hover:text-fg" />
          </li>
          <li><ColorModeToggle /></li>
        </ul>
      </nav>
    </header>

    <main id="main" class="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
      <slot />
    </main>

    <footer class="border-t border-line">
      <div class="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ site.copyrightSince }}–{{ year }} {{ site.author }}. Released under the MIT License.</p>
        <ul class="flex items-center gap-3">
          <li v-for="social in site.socials" :key="social.href">
            <a :href="social.href" :aria-label="social.label" rel="me noopener" target="_blank" class="inline-flex hover:text-fg">
              <Icon :name="social.icon" class="size-5" />
            </a>
          </li>
          <li>
            <a href="/rss.xml" aria-label="RSS feed" class="inline-flex hover:text-fg">
              <Icon name="lucide:rss" class="size-5" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
