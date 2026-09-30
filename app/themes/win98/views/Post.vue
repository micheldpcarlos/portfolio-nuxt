<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import MenuBar from '../components/MenuBar.vue'
import Prose from '../components/Prose.vue'
import Window from '../components/Window.vue'

defineProps<ViewProps['Post']>()
const { link } = useTheme()
</script>

<template>
  <Window :title="`${post.title}.txt - Notepad`" icon="lucide:file-text" :status="[`${post.readingMinutes} min read`, formatDate(post.date), post.tags.map(t => `#${t}`).join(' ') || 'No tags']">
    <MenuBar :items="['File', 'Edit', 'Search', 'Help']" />
    <div class="w98-sunken p-4 sm:p-6">
      <h1 class="text-2xl font-bold">{{ post.title }}</h1>
      <p class="mt-1 text-fg-muted">{{ post.description }}</p>
      <hr class="my-4 border-0 border-t border-(--w98-shadow)">
      <Prose :body="post.body" />
      <nav v-if="post.prev || post.next" class="mt-6 flex flex-wrap justify-between gap-2 border-t border-(--w98-shadow) pt-4 text-[12px]" aria-label="Adjacent posts">
        <NuxtLink v-if="post.prev" :to="link(post.prev.path)" class="w98-btn">← {{ post.prev.title }}</NuxtLink>
        <span v-else />
        <NuxtLink v-if="post.next" :to="link(post.next.path)" class="w98-btn">{{ post.next.title }} →</NuxtLink>
      </nav>
    </div>
  </Window>
</template>
