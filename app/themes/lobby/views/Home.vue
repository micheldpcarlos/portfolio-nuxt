<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import ItemCard from '../components/ItemCard.vue'
import NewsCard from '../components/NewsCard.vue'
import SectionTitle from '../components/SectionTitle.vue'

defineProps<ViewProps['Home']>()
const { link } = useTheme()
</script>

<template>
  <div class="space-y-14">
    <section class="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
      <div class="lobby-panel rounded-lg p-6 sm:p-8">
        <div class="flex items-center gap-4">
          <img :src="home.hero.avatar" :alt="home.hero.name" width="96" height="96" class="size-20 rounded-md object-cover ring-4 ring-brand sm:size-24">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-(--lobby-cyan)">{{ home.hero.role }}</p>
            <h1 class="lobby-display text-4xl sm:text-5xl">{{ home.hero.name }}</h1>
          </div>
        </div>
        <p class="mt-5 text-lg text-fg-muted">{{ home.hero.tagline }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <NuxtLink :to="link('/projects')" class="lobby-cta lobby-slant lobby-display inline-flex rounded-sm px-6 py-2.5 text-xl">
            <span>Open locker</span>
          </NuxtLink>
          <NuxtLink :to="link('/about')" class="lobby-slant lobby-display inline-flex rounded-sm border-2 border-line px-6 py-2.5 text-xl text-fg hover:border-fg">
            <span>Player info</span>
          </NuxtLink>
        </div>
      </div>

      <ul class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
        <li v-for="skill in home.skills.slice(0, 4)" :key="skill.name" class="lobby-panel rounded-md p-4">
          <div class="flex items-center gap-2">
            <Icon :name="skill.icon" class="size-5 text-brand" />
            <p class="lobby-display text-lg">{{ skill.name }}</p>
          </div>
          <p class="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-(--lobby-cyan)">Lv. {{ new Date().getFullYear() - skill.since }}</p>
        </li>
      </ul>
    </section>

    <section v-if="featuredProjects.length">
      <div class="flex items-end justify-between gap-4">
        <SectionTitle kicker="Featured items" title="Item shop" />
        <NuxtLink :to="link('/projects')" class="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-brand hover:underline">View all</NuxtLink>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ItemCard v-for="project in featuredProjects" :key="project.path" :project="project" />
      </div>
    </section>

    <section v-if="latestPosts.length">
      <div class="flex items-end justify-between gap-4">
        <SectionTitle kicker="Patch notes" title="News" />
        <NuxtLink :to="link('/blog')" class="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-brand hover:underline">All news</NuxtLink>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <NewsCard v-for="post in latestPosts" :key="post.path" :post="post" />
      </div>
    </section>

    <section>
      <SectionTitle kicker="Loadout" title="Skills" />
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="skill in home.skills" :key="skill.name" class="lobby-panel rounded-md p-4">
          <div class="flex items-center gap-2">
            <Icon :name="skill.icon" class="size-5 text-brand" />
            <h3 class="lobby-display text-lg">{{ skill.name }}</h3>
            <span class="ml-auto text-[11px] font-bold uppercase tracking-[0.15em] text-(--lobby-cyan)">{{ skill.since }}</span>
          </div>
          <p class="mt-2 text-sm text-fg-muted">{{ skill.note }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
