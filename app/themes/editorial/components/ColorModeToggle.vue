<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="inline-flex size-9 items-center justify-center rounded text-fg-muted hover:bg-brand-soft hover:text-fg"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    >
      <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-5" />
    </button>
    <template #fallback>
      <span class="inline-block size-9" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>
