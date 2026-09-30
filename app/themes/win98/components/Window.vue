<script setup lang="ts">
// A classic window frame. Views wrap their content in one of these; the
// close button goes home, the others are decoration.
withDefaults(defineProps<{ title: string, icon?: string, status?: string[], contentClass?: string }>(), {
  icon: 'lucide:app-window',
  status: () => [],
  contentClass: '',
})
const { link } = useTheme()
</script>

<template>
  <section class="w98-raised flex max-w-5xl flex-col p-[3px]" :aria-label="title">
    <header class="w98-titlebar flex h-[18px] items-center gap-1 px-1 select-none">
      <Icon :name="icon" class="size-3.5 shrink-0" aria-hidden="true" />
      <h1 class="truncate text-[12px] font-bold leading-none">{{ title }}</h1>
      <div class="ml-auto flex items-center gap-0.5">
        <span class="w98-btn w98-titlebar-btn" aria-hidden="true">_</span>
        <span class="w98-btn w98-titlebar-btn" aria-hidden="true">□</span>
        <NuxtLink :to="link('/')" class="w98-btn w98-titlebar-btn ml-0.5" aria-label="Close window and go home">×</NuxtLink>
      </div>
    </header>
    <slot name="menu" />
    <div class="mt-[3px] p-0" :class="contentClass">
      <slot />
    </div>
    <footer v-if="status.length" class="mt-[3px] flex gap-[3px] text-[11px]">
      <span v-for="(cell, i) in status" :key="i" class="w98-groove flex-1 truncate px-1.5 py-0.5">{{ cell }}</span>
    </footer>
  </section>
</template>
