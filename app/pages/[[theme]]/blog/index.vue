<script setup lang="ts">
const route = useRoute()
const { data: posts } = await usePosts()

const activeTag = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' && tag ? tag.toLowerCase() : null
})
const visible = computed(() =>
  activeTag.value ? posts.value.filter(p => p.tags.includes(activeTag.value!)) : posts.value,
)

useSeoMeta({ title: 'Blog', description: 'Notes on Vue, browser extensions, and building for the web.' })
</script>

<template>
  <ThemeView name="PostList" :posts="visible" :active-tag="activeTag" />
</template>
