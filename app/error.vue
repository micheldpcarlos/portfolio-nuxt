<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({ title: props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong', robots: 'noindex' })
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ThemeShell>
      <ThemeView name="NotFound" :error="error" />
    </ThemeShell>
  </div>
</template>
