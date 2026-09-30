<script setup lang="ts">
const { data: page } = await usePage('/about')
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

useSeoMeta({ title: page.value.title, description: page.value.description })
</script>

<template>
  <ThemeView name="About" :page="page!" />
</template>
