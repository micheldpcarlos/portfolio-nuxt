<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Panel from '../components/Panel.vue'
import Prose from '../components/Prose.vue'

defineProps<ViewProps['Post']>()
const { link } = useTheme()
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <header class="mb-6">
      <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-(--lobby-cyan)">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time> · {{ post.readingMinutes }} min read
      </p>
      <h1 class="lobby-display mt-2 text-4xl sm:text-5xl">{{ post.title }}</h1>
      <p class="mt-3 text-lg text-fg-muted">{{ post.description }}</p>
    </header>

    <Panel>
      <Prose :body="post.body" />
    </Panel>

    <nav v-if="post.prev || post.next" class="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Adjacent posts">
      <NuxtLink v-if="post.prev" :to="link(post.prev.path)" class="lobby-panel group rounded-md p-4 hover:border-(--lobby-cyan)">
        <span class="text-[11px] font-bold uppercase tracking-[0.15em] text-fg-muted">Older</span>
        <span class="lobby-display mt-1 block text-xl group-hover:text-brand">{{ post.prev.title }}</span>
      </NuxtLink>
      <NuxtLink v-if="post.next" :to="link(post.next.path)" class="lobby-panel group rounded-md p-4 text-right hover:border-(--lobby-cyan) sm:col-start-2">
        <span class="text-[11px] font-bold uppercase tracking-[0.15em] text-fg-muted">Newer</span>
        <span class="lobby-display mt-1 block text-xl group-hover:text-brand">{{ post.next.title }}</span>
      </NuxtLink>
    </nav>
  </article>
</template>
