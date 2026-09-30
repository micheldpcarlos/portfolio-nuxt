<script setup lang="ts">
import { site } from '#shared/site.config'
import './lobby.css'

const { link } = useTheme()
const path = computed(() => useContentPath())

const tabs = [
  { label: 'Lobby', to: '/' },
  { label: 'News', to: '/blog' },
  { label: 'Locker', to: '/projects' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <div class="lobby relative isolate min-h-dvh overflow-x-hidden bg-bg text-fg">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-contrast"
    >
      Skip to content
    </a>

    <!-- The 3D scene lives in the shell so it survives route changes. -->
    <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(40%_0.18_300)_0%,oklch(18%_0.09_285)_55%,oklch(12%_0.06_285)_100%)]" />
      <ClientOnly>
        <LazyLobbyScene :content-path="path" />
      </ClientOnly>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>

    <header class="sticky top-0 z-20 bg-gradient-to-b from-bg/90 to-transparent backdrop-blur-sm">
      <nav class="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4" aria-label="Main">
        <NuxtLink :to="link('/')" class="lobby-display text-2xl text-fg drop-shadow-lg sm:text-3xl">
          {{ site.name }}
        </NuxtLink>
        <ul class="ml-auto hidden items-center gap-1 sm:flex">
          <li v-for="tab in tabs" :key="tab.to">
            <NuxtLink :to="link(tab.to)" class="lobby-tab lobby-display px-3 py-2 text-lg text-fg-muted hover:text-fg" active-class="text-fg">
              {{ tab.label }}
            </NuxtLink>
          </li>
        </ul>
        <ThemeSwitcher v-slot="{ label }" class="lobby-slant ml-auto inline-flex rounded-sm border border-line bg-bg-elevated/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-fg-muted hover:text-fg sm:ml-4">
          <span class="inline-flex items-center gap-1.5"><Icon name="lucide:newspaper" class="size-4" />{{ label }}</span>
        </ThemeSwitcher>
      </nav>
      <ul class="mx-auto flex w-full max-w-6xl items-center gap-1 overflow-x-auto px-4 pb-2 sm:hidden" aria-label="Sections">
        <li v-for="tab in tabs" :key="tab.to">
          <NuxtLink :to="link(tab.to)" class="lobby-tab lobby-display px-3 py-1 text-base text-fg-muted" active-class="text-fg">
            {{ tab.label }}
          </NuxtLink>
        </li>
      </ul>
    </header>

    <main id="main" class="relative z-10 mx-auto w-full max-w-6xl px-4 pt-8 pb-32 sm:pt-12">
      <slot />
    </main>

    <footer class="fixed inset-x-0 bottom-0 z-20 border-t border-line/60 bg-bg/85 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 text-xs text-fg-muted">
        <p class="hidden sm:block">© {{ site.copyrightSince }}–{{ new Date().getFullYear() }} {{ site.author }}</p>
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
        <NuxtLink :to="link('/projects')" class="lobby-cta lobby-slant lobby-display inline-flex rounded-sm px-6 py-2 text-xl">
          <span>Play</span>
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>
