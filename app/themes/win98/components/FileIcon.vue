<script setup lang="ts">
// Large-icon view entry, as in an Explorer folder.
defineProps<{ to: string, label: string, icon: string }>()
</script>

<template>
  <NuxtLink :to="to" class="group flex w-24 flex-col items-center gap-1 p-1 text-center">
    <Icon :name="icon" class="size-8 text-brand group-hover:text-brand-strong" aria-hidden="true" />
    <span class="px-0.5 text-[12px] leading-tight group-hover:bg-brand group-hover:text-brand-contrast group-focus-visible:bg-brand group-focus-visible:text-brand-contrast">{{ label }}</span>
  </NuxtLink>
</template>
