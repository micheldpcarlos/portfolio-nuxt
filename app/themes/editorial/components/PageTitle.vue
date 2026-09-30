<script setup lang="ts">
defineProps<{ title: string, lead?: string }>()
</script>

<template>
  <header class="mb-10">
    <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ title }}</h1>
    <p v-if="lead" class="mt-3 max-w-2xl text-lg text-fg-muted">{{ lead }}</p>
  </header>
</template>
