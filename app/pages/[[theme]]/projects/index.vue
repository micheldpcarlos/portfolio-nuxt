<script setup lang="ts">
const { data: projects } = await useProjects()

useSeoMeta({ title: 'Projects', description: 'Things I have built and shipped.' })
</script>

<template>
  <ThemeView name="ProjectList" :projects="projects" />
</template>
