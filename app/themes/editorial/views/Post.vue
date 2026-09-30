<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Prose from '../components/Prose.vue'
import TagList from '../components/TagList.vue'

defineProps<ViewProps['Post']>()
const { link } = useTheme()
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <header class="mb-10">
      <p class="text-sm text-fg-muted">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span aria-hidden="true"> · </span>{{ post.readingMinutes }} min read
        <template v-if="post.updated && post.updated !== post.date">
          <span aria-hidden="true"> · </span>Updated <time :datetime="post.updated">{{ formatDate(post.updated) }}</time>
        </template>
      </p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{{ post.title }}</h1>
      <p class="mt-3 text-lg text-fg-muted">{{ post.description }}</p>
      <div class="mt-4">
        <TagList :tags="post.tags" />
      </div>
    </header>

    <Prose :body="post.body" />

    <nav v-if="post.prev || post.next" class="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Adjacent posts">
      <NuxtLink v-if="post.prev" :to="link(post.prev.path)" class="group rounded-lg border border-line p-4 hover:border-brand">
        <span class="text-xs text-fg-muted">Older</span>
        <span class="mt-1 block font-medium group-hover:text-brand">{{ post.prev.title }}</span>
      </NuxtLink>
      <NuxtLink v-if="post.next" :to="link(post.next.path)" class="group rounded-lg border border-line p-4 text-right hover:border-brand sm:col-start-2">
        <span class="text-xs text-fg-muted">Newer</span>
        <span class="mt-1 block font-medium group-hover:text-brand">{{ post.next.title }}</span>
      </NuxtLink>
    </nav>
  </article>
</template>
