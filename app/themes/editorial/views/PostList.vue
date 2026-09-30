<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import PageTitle from '../components/PageTitle.vue'
import PostCard from '../components/PostCard.vue'
import TagList from '../components/TagList.vue'

const props = defineProps<ViewProps['PostList']>()

const allTags = computed(() => [...new Set(props.posts.flatMap(p => p.tags))].sort())

const byYear = computed(() => {
  const groups = new Map<string, typeof props.posts>()
  for (const post of props.posts) {
    const year = yearOf(post.date)
    groups.set(year, [...(groups.get(year) ?? []), post])
  }
  return [...groups.entries()]
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <PageTitle title="Blog" lead="Notes on Vue, browser extensions, and building for the web." />

    <div class="mb-10 flex flex-wrap items-center gap-3">
      <TagList :tags="allTags" :active="activeTag" />
      <NuxtLink v-if="activeTag" :to="{ query: {} }" class="text-xs text-fg-muted hover:text-brand">
        Clear filter
      </NuxtLink>
    </div>

    <p v-if="!posts.length" class="text-fg-muted">Nothing here yet.</p>

    <section v-for="[year, group] in byYear" :key="year" class="mb-12">
      <h2 class="mb-6 text-sm font-medium uppercase tracking-wide text-fg-muted">{{ year }}</h2>
      <div class="space-y-8">
        <PostCard v-for="post in group" :key="post.path" :post="post" />
      </div>
    </section>
  </div>
</template>
