<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import PageTitle from '../components/PageTitle.vue'
import ProjectCard from '../components/ProjectCard.vue'

defineProps<ViewProps['ProjectList']>()
</script>

<template>
  <div>
    <PageTitle title="Projects" lead="Things I have built and shipped, from browser extensions to small libraries." />
    <p v-if="!projects.length" class="text-fg-muted">Nothing here yet.</p>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="project in projects" :key="project.path" class="relative">
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>
