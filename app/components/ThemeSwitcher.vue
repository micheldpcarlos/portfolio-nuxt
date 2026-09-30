<script setup lang="ts">
import { DEFAULT_THEME, themes } from '~/themes'

// Links to the current page under every other theme. Themes decide how it looks
// through the class they pass in; this component only knows the routes.
const { id } = useTheme()
const path = useContentPath()

const options = computed(() =>
  Object.values(themes)
    .filter(theme => theme.id !== id.value)
    .map(theme => ({
      id: theme.id,
      label: theme.label,
      to: theme.id === DEFAULT_THEME ? path : `/${theme.id}${path === '/' ? '' : path}`,
    })),
)
</script>

<template>
  <NuxtLink v-for="option in options" :key="option.id" :to="option.to || '/'" :title="`Switch to the ${option.label} theme`">
    <slot :label="option.label">{{ option.label }} theme</slot>
  </NuxtLink>
</template>
