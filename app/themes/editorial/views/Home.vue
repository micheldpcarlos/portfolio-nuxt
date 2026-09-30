<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import PostCard from '../components/PostCard.vue'
import ProjectCard from '../components/ProjectCard.vue'

defineProps<ViewProps['Home']>()
const { link } = useTheme()
</script>

<template>
  <div class="space-y-20">
    <section class="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
      <div class="max-w-xl">
        <p class="text-sm font-medium text-brand">{{ home.hero.role }}</p>
        <h1 class="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{{ home.hero.name }}</h1>
        <p class="mt-4 text-lg text-fg-muted">{{ home.hero.tagline }}</p>
        <div class="mt-6 flex gap-3">
          <NuxtLink :to="link('/about')" class="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-strong">
            About me
          </NuxtLink>
          <NuxtLink :to="link('/projects')" class="rounded-md border border-line px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand">
            Projects
          </NuxtLink>
        </div>
      </div>
      <img
        :src="home.hero.avatar"
        :alt="home.hero.name"
        width="160"
        height="160"
        class="size-32 rounded-full object-cover ring-4 ring-brand-soft sm:size-40"
      >
    </section>

    <section v-if="featuredProjects.length">
      <div class="mb-6 flex items-baseline justify-between">
        <h2 class="text-2xl font-semibold tracking-tight">Featured projects</h2>
        <NuxtLink :to="link('/projects')" class="text-sm text-brand hover:underline">All projects</NuxtLink>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="project in featuredProjects" :key="project.path" class="relative">
          <ProjectCard :project="project" />
        </div>
      </div>
    </section>

    <section v-if="latestPosts.length">
      <div class="mb-6 flex items-baseline justify-between">
        <h2 class="text-2xl font-semibold tracking-tight">Latest posts</h2>
        <NuxtLink :to="link('/blog')" class="text-sm text-brand hover:underline">All posts</NuxtLink>
      </div>
      <div class="space-y-8">
        <PostCard v-for="post in latestPosts" :key="post.path" :post="post" />
      </div>
    </section>

    <section>
      <h2 class="mb-6 text-2xl font-semibold tracking-tight">Skills</h2>
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="skill in home.skills" :key="skill.name" class="rounded-lg border border-line p-4">
          <div class="flex items-center gap-2">
            <Icon :name="skill.icon" class="size-5 text-brand" />
            <h3 class="font-medium">{{ skill.name }}</h3>
            <span class="ml-auto text-xs text-fg-muted">since {{ skill.since }}</span>
          </div>
          <p class="mt-2 text-sm text-fg-muted">{{ skill.note }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
