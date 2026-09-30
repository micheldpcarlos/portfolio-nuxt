<script setup lang="ts">
import type { ContentBody } from '~/data/models'

defineProps<{ body: ContentBody }>()
</script>

<template>
  <ContentRenderer :value="body" class="prose prose-invert lobby-prose max-w-none prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none" />
</template>
