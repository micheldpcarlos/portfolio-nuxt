<script setup lang="ts">
import { site } from '#shared/site.config'

const { prefix } = useTheme()
const route = useRoute()

useHead({
  titleTemplate: t => (t ? `${t} · ${site.name}` : `${site.name} · ${site.role}`),
  link: [{
    key: 'canonical',
    rel: 'canonical',
    // A themed URL is a presentation of the same content; the root URL is canonical.
    href: () => `${site.url}${prefix.value ? route.path.slice(prefix.value.length) || '/' : route.path}`,
  }],
})

useSeoMeta({
  ogImage: '/images/meta-image.jpg',
  twitterCard: 'summary',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ThemeShell>
      <NuxtPage />
    </ThemeShell>
  </div>
</template>
