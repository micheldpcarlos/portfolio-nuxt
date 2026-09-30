<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import NewsCard from '../components/NewsCard.vue'
import SectionTitle from '../components/SectionTitle.vue'

const props = defineProps<ViewProps['PostList']>()
const { link } = useTheme()
const allTags = computed(() => [...new Set(props.posts.flatMap(p => p.tags))].sort())
</script>

<template>
  <div class="mx-auto max-w-4xl">
    <SectionTitle kicker="Patch notes" title="News" />

    <ul v-if="allTags.length" class="mb-6 flex flex-wrap gap-2">
      <li v-for="tag in allTags" :key="tag">
        <NuxtLink
          :to="{ path: link('/blog'), query: tag === activeTag ? {} : { tag } }"
          class="lobby-slant inline-flex rounded-sm border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em]"
          :class="tag === activeTag ? 'border-brand bg-brand text-brand-contrast' : 'border-line text-fg-muted hover:border-fg hover:text-fg'"
        >
          <span>#{{ tag }}</span>
        </NuxtLink>
      </li>
    </ul>

    <p v-if="!posts.length" class="lobby-panel rounded-md p-6 text-fg-muted">No news yet. Check back after the next update.</p>
    <div class="grid gap-4 md:grid-cols-2">
      <NewsCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </div>
</template>
