<script setup lang="ts">
import type { PostSummary } from '~/data/models'

defineProps<{ post: PostSummary }>()
const { link } = useTheme()
</script>

<template>
  <article class="lobby-panel group relative flex flex-col gap-2 rounded-md p-5 transition hover:border-(--lobby-cyan)">
    <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-(--lobby-cyan)">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time> · {{ post.readingMinutes }} min
    </p>
    <h3 class="lobby-display text-2xl">
      <NuxtLink :to="link(post.path)" class="after:absolute after:inset-0 group-hover:text-brand">{{ post.title }}</NuxtLink>
    </h3>
    <p class="text-sm text-fg-muted">{{ post.description }}</p>
    <ul v-if="post.tags.length" class="mt-1 flex flex-wrap gap-1.5">
      <li v-for="tag in post.tags" :key="tag" class="rounded-sm bg-brand-soft px-1.5 py-0.5 text-[11px] uppercase tracking-wide text-fg-muted">#{{ tag }}</li>
    </ul>
  </article>
</template>
