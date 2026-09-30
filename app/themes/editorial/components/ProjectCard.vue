<script setup lang="ts">
import type { ProjectCard } from '~/data/models'

defineProps<{ project: ProjectCard }>()
const { link } = useTheme()

const statusLabel: Record<ProjectCard['status'], string> = {
  live: 'Live',
  wip: 'In progress',
  archived: 'Archived',
}
</script>

<template>
  <article class="flex h-full flex-col rounded-lg border border-line bg-bg-elevated p-5 transition hover:border-brand">
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-lg font-medium tracking-tight">
        <NuxtLink :to="link(project.path)" class="after:absolute after:inset-0 hover:text-brand">
          {{ project.title }}
        </NuxtLink>
      </h3>
      <span class="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-xs text-brand-strong">
        {{ statusLabel[project.status] }}
      </span>
    </div>
    <p class="mt-2 flex-1 text-fg-muted">{{ project.description }}</p>
    <ul class="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-fg-muted">
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>
  </article>
</template>
