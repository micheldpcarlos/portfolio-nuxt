<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import Panel from '../components/Panel.vue'
import Prose from '../components/Prose.vue'
import { RARITY_LABEL, rarityOf } from '../components/rarity'

const props = defineProps<ViewProps['Project']>()
const rarity = computed(() => rarityOf(props.project))

const links = computed(() => [
  props.project.url && { label: 'Website', icon: 'lucide:globe', href: props.project.url },
  props.project.store && { label: 'Chrome Web Store', icon: 'simple-icons:googlechrome', href: props.project.store },
  props.project.repo && { label: 'Source', icon: 'simple-icons:github', href: props.project.repo },
].filter((l): l is { label: string, icon: string, href: string } => Boolean(l)))
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <header class="lobby-card mb-6 rounded-md p-6 sm:p-8" :data-rarity="rarity">
      <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
        {{ RARITY_LABEL[rarity] }} · {{ project.status }} · <time :datetime="project.date">{{ formatDate(project.date) }}</time>
      </p>
      <h1 class="lobby-display mt-2 text-4xl text-white sm:text-5xl">{{ project.title }}</h1>
      <p class="mt-3 text-lg text-white/85">{{ project.description }}</p>
      <ul class="mt-4 flex flex-wrap gap-1.5">
        <li v-for="tech in project.stack" :key="tech" class="rounded-sm bg-black/35 px-2 py-0.5 text-xs text-white/85">{{ tech }}</li>
      </ul>
      <ul v-if="links.length" class="mt-6 flex flex-wrap gap-3">
        <li v-for="item in links" :key="item.href">
          <a :href="item.href" target="_blank" rel="noopener" class="lobby-cta lobby-slant lobby-display inline-flex items-center gap-2 rounded-sm px-4 py-2 text-lg">
            <span class="inline-flex items-center gap-2"><Icon :name="item.icon" class="size-4" />{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </header>

    <Panel>
      <Prose :body="project.body" />
    </Panel>
  </article>
</template>
