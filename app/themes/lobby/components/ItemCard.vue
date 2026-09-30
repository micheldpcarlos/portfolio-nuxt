<script setup lang="ts">
import type { ProjectCard } from '~/data/models'
import { RARITY_LABEL, rarityOf } from './rarity'

const props = defineProps<{ project: ProjectCard }>()
const { link } = useTheme()
const rarity = computed(() => rarityOf(props.project))
</script>

<template>
  <article class="lobby-card relative flex h-full flex-col overflow-hidden rounded-md p-4" :data-rarity="rarity">
    <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em]">
      <span class="text-white/80">{{ RARITY_LABEL[rarity] }}</span>
      <span class="rounded-sm bg-black/40 px-1.5 py-0.5 text-white/70">{{ project.status }}</span>
    </div>
    <h3 class="lobby-display mt-6 text-2xl text-white">
      <NuxtLink :to="link(project.path)" class="after:absolute after:inset-0">{{ project.title }}</NuxtLink>
    </h3>
    <p class="mt-2 flex-1 text-sm text-white/85">{{ project.description }}</p>
    <ul class="mt-4 flex flex-wrap gap-1.5">
      <li v-for="tech in project.stack.slice(0, 4)" :key="tech" class="rounded-sm bg-black/35 px-1.5 py-0.5 text-[11px] text-white/80">{{ tech }}</li>
    </ul>
  </article>
</template>
