<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Prose from '../components/Prose.vue'

const props = defineProps<ViewProps['Project']>()

const links = computed(() => [
  props.project.url && { label: 'Website', icon: 'lucide:globe', href: props.project.url },
  props.project.store && { label: 'Chrome Web Store', icon: 'simple-icons:googlechrome', href: props.project.store },
  props.project.repo && { label: 'Source', icon: 'simple-icons:github', href: props.project.repo },
].filter((l): l is { label: string, icon: string, href: string } => Boolean(l)))
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <header class="mb-10">
      <p class="text-sm text-fg-muted"><time :datetime="project.date">{{ formatDate(project.date) }}</time></p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{{ project.title }}</h1>
      <p class="mt-3 text-lg text-fg-muted">{{ project.description }}</p>
      <ul class="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-fg-muted">
        <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
      </ul>
      <ul v-if="links.length" class="mt-6 flex flex-wrap gap-3">
        <li v-for="item in links" :key="item.href">
          <a
            :href="item.href"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm hover:border-brand hover:text-brand"
          >
            <Icon :name="item.icon" class="size-4" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </header>

    <Prose :body="project.body" />
  </article>
</template>
