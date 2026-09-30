<script setup lang="ts">
import type { ViewProps } from '~/themes/types'
import FileIcon from '../components/FileIcon.vue'
import MenuBar from '../components/MenuBar.vue'
import Window from '../components/Window.vue'

const props = defineProps<ViewProps['Home']>()
const { link } = useTheme()
const total = computed(() => props.featuredProjects.length + props.latestPosts.length)
</script>

<template>
  <div class="space-y-4">
    <Window title="Welcome to My Portfolio" icon="lucide:monitor" :status="[`${total} object(s)`, 'My Computer']">
      <MenuBar />
      <div class="w98-sunken grid gap-4 p-4 md:grid-cols-[auto_1fr]">
        <img :src="home.hero.avatar" :alt="home.hero.name" width="96" height="96" class="w98-sunken size-24 object-cover p-[2px]">
        <div>
          <h2 class="text-xl font-bold">{{ home.hero.name }}</h2>
          <p class="text-fg-muted">{{ home.hero.role }}</p>
          <p class="mt-3 max-w-xl">{{ home.hero.tagline }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <NuxtLink :to="link('/about')" class="w98-btn is-default text-center">About me</NuxtLink>
            <NuxtLink :to="link('/projects')" class="w98-btn text-center">Projects</NuxtLink>
            <NuxtLink :to="link('/blog')" class="w98-btn text-center">Blog</NuxtLink>
          </div>
        </div>
      </div>
    </Window>

    <div class="grid gap-4 lg:grid-cols-2">
      <Window title="Featured projects" icon="lucide:folder" :status="[`${featuredProjects.length} object(s)`]">
        <MenuBar />
        <div class="w98-sunken flex min-h-32 flex-wrap content-start gap-1 p-2">
          <FileIcon v-for="project in featuredProjects" :key="project.path" :to="link(project.path)" :label="project.title" icon="lucide:package" />
          <FileIcon :to="link('/projects')" label="All projects..." icon="lucide:folder-open" />
        </div>
      </Window>

      <Window title="Latest posts" icon="lucide:folder-open" :status="[`${latestPosts.length} object(s)`]">
        <MenuBar />
        <div class="w98-sunken flex min-h-32 flex-wrap content-start gap-1 p-2">
          <FileIcon v-for="post in latestPosts" :key="post.path" :to="link(post.path)" :label="`${post.title}.txt`" icon="lucide:file-text" />
          <FileIcon :to="link('/blog')" label="All posts..." icon="lucide:folder-open" />
        </div>
      </Window>
    </div>

    <Window title="System Properties" icon="lucide:settings" content-class="p-2">
      <div class="w98-groove p-3">
        <p class="-mt-5 mb-2 w-fit bg-(--w98-face) px-1 text-[12px]">Installed components</p>
        <ul class="grid gap-x-6 gap-y-1 text-[12px] sm:grid-cols-2">
          <li v-for="skill in home.skills" :key="skill.name" class="flex items-start gap-2">
            <Icon :name="skill.icon" class="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span><strong>{{ skill.name }}</strong> <span class="text-fg-muted">(since {{ skill.since }})</span><br>{{ skill.note }}</span>
          </li>
        </ul>
      </div>
    </Window>
  </div>
</template>
