<script setup lang="ts">
import type { PostSummary } from '~/data/models'

defineProps<{ post: PostSummary }>()
const { link } = useTheme()
</script>

<template>
  <article class="group grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
    <p class="text-sm text-fg-muted">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
    </p>
    <div>
      <h3 class="text-lg font-medium tracking-tight">
        <NuxtLink :to="link(post.path)" class="group-hover:text-brand">{{ post.title }}</NuxtLink>
      </h3>
      <p class="mt-1 text-fg-muted">{{ post.description }}</p>
      <p class="mt-2 text-xs text-fg-muted">{{ post.readingMinutes }} min read</p>
    </div>
  </article>
</template>
