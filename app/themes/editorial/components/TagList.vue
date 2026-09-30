<script setup lang="ts">
defineProps<{ tags: string[], active?: string | null }>()
const { link } = useTheme()
</script>

<template>
  <ul v-if="tags.length" class="flex flex-wrap gap-2">
    <li v-for="tag in tags" :key="tag">
      <NuxtLink
        :to="{ path: link('/blog'), query: tag === active ? {} : { tag } }"
        class="rounded-full border px-2.5 py-0.5 text-xs"
        :class="tag === active
          ? 'border-brand bg-brand text-brand-contrast'
          : 'border-line text-fg-muted hover:border-brand hover:text-brand'"
      >
        #{{ tag }}
      </NuxtLink>
    </li>
  </ul>
</template>
