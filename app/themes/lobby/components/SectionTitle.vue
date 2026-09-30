<script setup lang="ts">
defineProps<{ title: string, kicker?: string }>()
</script>

<template>
  <header class="mb-6">
    <p v-if="kicker" class="text-xs font-bold uppercase tracking-[0.2em] text-(--lobby-cyan)">{{ kicker }}</p>
    <h2 class="lobby-display text-3xl sm:text-4xl">{{ title }}</h2>
  </header>
</template>
