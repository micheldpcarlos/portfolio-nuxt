<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import ItemCard from '../components/ItemCard.vue'
import SectionTitle from '../components/SectionTitle.vue'

defineProps<ViewProps['ProjectList']>()
</script>

<template>
  <div>
    <SectionTitle kicker="Locker" title="Projects" />
    <p v-if="!projects.length" class="lobby-panel rounded-md p-6 text-fg-muted">The locker is empty.</p>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ItemCard v-for="project in projects" :key="project.path" :project="project" />
    </div>
  </div>
</template>
