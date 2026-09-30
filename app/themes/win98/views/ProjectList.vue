<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import FileIcon from '../components/FileIcon.vue'
import MenuBar from '../components/MenuBar.vue'
import Window from '../components/Window.vue'

defineProps<ViewProps['ProjectList']>()
const { link } = useTheme()
</script>

<template>
  <Window title="Projects" icon="lucide:folder" :status="[`${projects.length} object(s)`, 'Local disk (C:)']">
    <MenuBar />
    <div class="w98-sunken flex min-h-48 flex-wrap content-start gap-2 p-3">
      <p v-if="!projects.length" class="p-4 text-fg-muted">This folder is empty.</p>
      <FileIcon v-for="project in projects" :key="project.path" :to="link(project.path)" :label="project.title" :icon="project.status === 'wip' ? 'lucide:package-open' : 'lucide:package'" />
    </div>
  </Window>
</template>
