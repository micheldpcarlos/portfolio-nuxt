<script setup lang="ts">
import { site } from '#shared/site.config'
import Clock from './components/Clock.vue'
import './win98.css'

const { link } = useTheme()
const path = computed(() => useContentPath())

const desktop = [
  { label: 'My Portfolio', to: '/', icon: 'lucide:monitor' },
  { label: 'Blog', to: '/blog', icon: 'lucide:folder-open' },
  { label: 'Projects', to: '/projects', icon: 'lucide:folder' },
  { label: 'About me', to: '/about', icon: 'lucide:file-text' },
]

const taskLabel = computed(() => {
  const p = path.value
  if (p === '/') return 'My Portfolio'
  if (p.startsWith('/blog/')) return 'Blog post - Notepad'
  if (p.startsWith('/blog')) return 'Blog'
  if (p.startsWith('/projects/')) return 'Project properties'
  if (p.startsWith('/projects')) return 'Projects'
  if (p.startsWith('/about')) return 'About me'
  return 'Error'
})

const startOpen = ref(false)
const start = ref<HTMLElement>()
function onDocumentClick(e: MouseEvent) {
  if (startOpen.value && !start.value?.contains(e.target as Node)) startOpen.value = false
}
onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
watch(path, () => (startOpen.value = false))
</script>

<template>
  <div class="win98 relative isolate min-h-dvh bg-bg text-fg antialiased">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-contrast">
      Skip to content
    </a>

    <div class="flex min-h-dvh gap-4 p-3 pb-14 sm:p-5 sm:pb-16">
      <nav class="hidden shrink-0 flex-col gap-4 sm:flex" aria-label="Desktop">
        <NuxtLink v-for="item in desktop" :key="item.to" :to="link(item.to)" class="w98-desktop-icon flex flex-col items-center gap-1" :class="{ 'router-link-active': path === item.to }">
          <Icon :name="item.icon" class="size-8 drop-shadow" aria-hidden="true" />
          <span class="px-0.5 text-[12px] leading-tight">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <main id="main" class="min-w-0 flex-1">
        <slot />
      </main>
    </div>

    <footer class="w98-raised fixed inset-x-0 bottom-0 z-20 flex h-[30px] items-center gap-1 px-1 pt-[2px]" aria-label="Taskbar">
      <div ref="start" class="relative">
        <button type="button" class="w98-btn flex h-[22px] min-w-0 items-center gap-1 px-1.5 font-bold" :aria-expanded="startOpen" :class="{ 'is-active': startOpen }" @click="startOpen = !startOpen">
          <Icon name="lucide:flag" class="size-4" aria-hidden="true" />
          Start
        </button>
        <div v-if="startOpen" class="w98-raised absolute bottom-full left-0 mb-[2px] flex w-56 p-[3px]" role="menu">
          <div class="w98-titlebar flex w-6 items-end justify-center pb-2">
            <span class="rotate-180 text-[14px] font-bold text-white/90 [writing-mode:vertical-rl]">Portfolio 98</span>
          </div>
          <ul class="flex-1 py-1 text-[12px]">
            <li v-for="item in desktop" :key="item.to">
              <NuxtLink :to="link(item.to)" class="w98-menu-item flex items-center gap-2 px-2 py-1.5" role="menuitem">
                <Icon :name="item.icon" class="size-5" aria-hidden="true" />{{ item.label }}
              </NuxtLink>
            </li>
            <li class="w98-groove mx-1 my-1 h-0" aria-hidden="true" />
            <li v-for="social in site.socials" :key="social.href">
              <a :href="social.href" target="_blank" rel="me noopener" class="w98-menu-item flex items-center gap-2 px-2 py-1.5" role="menuitem">
                <Icon :name="social.icon" class="size-5" aria-hidden="true" />{{ social.label }}
              </a>
            </li>
            <li>
              <a href="/rss.xml" class="w98-menu-item flex items-center gap-2 px-2 py-1.5" role="menuitem">
                <Icon name="lucide:rss" class="size-5" aria-hidden="true" />RSS feed
              </a>
            </li>
          </ul>
        </div>
      </div>

      <span class="w98-groove mx-0.5 h-5 w-0.5" aria-hidden="true" />

      <span class="w98-btn is-active flex h-[22px] min-w-0 max-w-56 flex-1 items-center gap-1.5 px-2 text-[12px] sm:flex-none">
        <Icon name="lucide:app-window" class="size-4 shrink-0" aria-hidden="true" />
        <span class="truncate">{{ taskLabel }}</span>
      </span>

      <div class="w98-sunken ml-auto flex h-[22px] shrink-0 items-center gap-2 bg-(--w98-face) px-2 text-[12px]">
        <ThemeSelector placement="up" trigger-class="text-[12px]" />
        <span class="hidden sm:inline"><Clock /></span>
      </div>
    </footer>
  </div>
</template>
