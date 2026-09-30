<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Prose from '../components/Prose.vue'
import Window from '../components/Window.vue'

const props = defineProps<ViewProps['Project']>()
const { link } = useTheme()

const statusLabel = { live: 'Running', wip: 'Installing...', archived: 'Uninstalled' } as const

const links = computed(() => [
  props.project.url && { label: 'Open website', icon: 'lucide:globe', href: props.project.url },
  props.project.store && { label: 'Chrome Web Store', icon: 'simple-icons:googlechrome', href: props.project.store },
  props.project.repo && { label: 'View source', icon: 'simple-icons:github', href: props.project.repo },
].filter((l): l is { label: string, icon: string, href: string } => Boolean(l)))
</script>

<template>
  <Window :title="`${project.title} Properties`" icon="lucide:package" content-class="p-2">
    <div class="flex gap-0.5 text-[12px]">
      <span class="w98-raised relative top-[2px] z-10 border-b-0 px-3 py-1">General</span>
      <span class="w98-raised px-3 py-1 text-fg-muted">Details</span>
    </div>
    <div class="w98-raised p-4">
      <div class="flex items-start gap-4">
        <Icon name="lucide:package" class="size-10 shrink-0 text-brand" aria-hidden="true" />
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-bold">{{ project.title }}</h1>
          <p class="text-fg-muted">{{ project.description }}</p>
        </div>
      </div>
      <hr class="my-3 border-0 border-t border-(--w98-shadow)">
      <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[12px]">
        <dt class="text-fg-muted">Type:</dt><dd>Project</dd>
        <dt class="text-fg-muted">Status:</dt><dd>{{ statusLabel[project.status] }}</dd>
        <dt class="text-fg-muted">Created:</dt><dd><time :datetime="project.date">{{ formatDate(project.date) }}</time></dd>
        <dt class="text-fg-muted">Built with:</dt><dd>{{ project.stack.join(', ') }}</dd>
      </dl>
      <hr class="my-3 border-0 border-t border-(--w98-shadow)">
      <div class="w98-sunken p-3">
        <Prose :body="project.body" />
      </div>
      <div class="mt-4 flex flex-wrap justify-end gap-2 text-[12px]">
        <a v-for="item in links" :key="item.href" :href="item.href" target="_blank" rel="noopener" class="w98-btn inline-flex items-center gap-1.5">
          <Icon :name="item.icon" class="size-3.5" aria-hidden="true" />{{ item.label }}
        </a>
        <NuxtLink :to="link('/projects')" class="w98-btn is-default text-center">OK</NuxtLink>
      </div>
    </div>
  </Window>
</template>
