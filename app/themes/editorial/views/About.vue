<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Prose from '../components/Prose.vue'

defineProps<ViewProps['About']>()
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <Prose :body="page.body" />
  </article>
</template>
