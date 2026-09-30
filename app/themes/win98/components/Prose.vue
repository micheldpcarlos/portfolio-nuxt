<script setup lang="ts">
import type { ContentBody } from '~/data/models'

defineProps<{ body: ContentBody }>()
</script>

<template>
  <ContentRenderer :value="body" class="prose w98-prose max-w-none prose-a:underline" />
</template>
