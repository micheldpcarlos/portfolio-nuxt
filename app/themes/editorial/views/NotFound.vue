<script setup lang="ts">
import type { ViewProps } from '~/themes/types'

const props = defineProps<ViewProps['NotFound']>()
const { link } = useTheme()

const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <div class="mx-auto max-w-xl py-20 text-center">
    <p class="text-sm font-medium text-brand">{{ error.statusCode }}</p>
    <h1 class="mt-2 text-3xl font-semibold tracking-tight">
      {{ is404 ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="mt-3 text-fg-muted">
      {{ is404 ? 'That page does not exist, or it moved.' : (error.statusMessage || 'Please try again.') }}
    </p>
    <NuxtLink :to="link('/')" class="mt-8 inline-block rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-contrast hover:bg-brand-strong" @click="clearError()">
      Back home
    </NuxtLink>
  </div>
</template>
