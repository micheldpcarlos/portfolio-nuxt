<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import MenuBar from '../components/MenuBar.vue'
import Window from '../components/Window.vue'

const props = defineProps<ViewProps['PostList']>()
const { link } = useTheme()
const allTags = computed(() => [...new Set(props.posts.flatMap(p => p.tags))].sort())
</script>

<template>
  <Window title="Blog" icon="lucide:folder-open" :status="[`${posts.length} object(s)`, activeTag ? `Filter: #${activeTag}` : 'No filter']">
    <MenuBar />
    <div class="w98-raised flex flex-wrap items-center gap-1 px-1 py-1 text-[12px]">
      <span class="mr-1">Filter by tag:</span>
      <NuxtLink :to="{ path: link('/blog'), query: {} }" class="w98-btn min-w-0 px-2 py-0.5" :class="{ 'is-active': !activeTag }">All</NuxtLink>
      <NuxtLink v-for="tag in allTags" :key="tag" :to="{ path: link('/blog'), query: { tag } }" class="w98-btn min-w-0 px-2 py-0.5" :class="{ 'is-active': tag === activeTag }">#{{ tag }}</NuxtLink>
    </div>
    <div class="w98-sunken overflow-x-auto">
      <table class="w98-table w-full text-[12px]">
        <thead>
          <tr><th>Name</th><th>Modified</th><th>Size</th><th>Tags</th></tr>
        </thead>
        <tbody>
          <tr v-if="!posts.length"><td colspan="4" class="py-6 text-center text-fg-muted">This folder is empty.</td></tr>
          <tr v-for="post in posts" :key="post.path">
            <td>
              <NuxtLink :to="link(post.path)" class="inline-flex items-center gap-1.5">
                <Icon name="lucide:file-text" class="size-4 shrink-0 text-brand" aria-hidden="true" />{{ post.title }}.txt
              </NuxtLink>
            </td>
            <td><time :datetime="post.date">{{ formatDate(post.date) }}</time></td>
            <td>{{ post.readingMinutes }} min</td>
            <td>{{ post.tags.map(t => `#${t}`).join(' ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Window>
</template>
