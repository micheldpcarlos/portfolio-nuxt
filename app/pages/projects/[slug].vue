<script setup lang="ts">
const path = useContentPath()
const { data: project } = await useProject(path)
if (!project.value) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })

useSeoMeta({ title: project.value.title, description: project.value.description })
</script>

<template>
  <ThemeView name="Project" :project="project!" />
</template>
