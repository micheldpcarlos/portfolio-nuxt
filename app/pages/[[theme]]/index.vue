<script setup lang="ts">
const [{ data: home }, { data: featuredProjects }, { data: posts }] = await Promise.all([
  useHome(),
  useProjects({ featured: true }),
  usePosts(),
])
if (!home.value) throw createError({ statusCode: 500, statusMessage: 'Home content is missing', fatal: true })

const featured = computed(() => featuredProjects.value.slice(0, home.value!.featuredLimit))
const latest = computed(() => posts.value.slice(0, home.value!.latestPostsLimit))

useSeoMeta({
  title: null,
  description: home.value.hero.tagline,
  ogType: 'website',
  ogImage: '/images/meta-image.jpg',
})
</script>

<template>
  <ThemeView
    name="Home"
    :home="home!"
    :featured-projects="featured"
    :latest-posts="latest"
  />
</template>
