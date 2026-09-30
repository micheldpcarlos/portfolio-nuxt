<script setup lang="ts">
const path = useContentPath()
const { data: post } = await usePost(path)
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogType: 'article',
  articlePublishedTime: post.value.date,
  articleModifiedTime: post.value.updated ?? post.value.date,
  articleTag: post.value.tags,
})
</script>

<template>
  <ThemeView name="Post" :post="post!" />
</template>
