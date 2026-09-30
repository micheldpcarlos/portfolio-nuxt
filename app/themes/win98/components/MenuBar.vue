<script setup lang="ts">
withDefaults(defineProps<{ items?: string[] }>(), { items: () => ['File', 'Edit', 'View', 'Help'] })
</script>

<template>
  <ul class="flex gap-0.5 px-1 py-0.5 text-[12px] select-none" aria-hidden="true">
    <li v-for="item in items" :key="item" class="px-1.5 py-0.5 hover:bg-brand hover:text-brand-contrast"><u>{{ item[0] }}</u>{{ item.slice(1) }}</li>
  </ul>
</template>
