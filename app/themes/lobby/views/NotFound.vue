<script setup lang="ts">
import type { ViewProps } from '~/themes/types'

const props = defineProps<ViewProps['NotFound']>()
const { link } = useTheme()
const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <div class="mx-auto max-w-xl py-16 text-center">
    <p class="text-xs font-bold uppercase tracking-[0.3em] text-(--lobby-pink)">{{ error.statusCode }}</p>
    <h1 class="lobby-display mt-2 text-5xl sm:text-6xl">
      {{ is404 ? 'Eliminated' : 'Server down' }}
    </h1>
    <p class="mt-4 text-fg-muted">
      {{ is404 ? 'That page is not on the map.' : (error.statusMessage || 'Please try again.') }}
    </p>
    <NuxtLink :to="link('/')" class="lobby-cta lobby-slant lobby-display mt-8 inline-flex rounded-sm px-6 py-2.5 text-xl" @click="clearError()">
      <span>Return to lobby</span>
    </NuxtLink>
  </div>
</template>
