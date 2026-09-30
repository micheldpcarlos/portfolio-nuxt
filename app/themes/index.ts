import { defineAsyncComponent } from 'vue'
import type { ThemeDefinition } from './types'
import type { ThemeId } from '#shared/themes'

export { DEFAULT_THEME, isTheme, themePrefixes } from '#shared/themes'

// Components are async so each theme is its own chunk; a visitor on the
// default theme never downloads another theme's code (or, later, Three.js).
const editorial: ThemeDefinition = {
  id: 'editorial',
  label: 'Editorial',
  shell: defineAsyncComponent(() => import('./editorial/Shell.vue')),
  views: {
    Home: defineAsyncComponent(() => import('./editorial/views/Home.vue')),
    About: defineAsyncComponent(() => import('./editorial/views/About.vue')),
    PostList: defineAsyncComponent(() => import('./editorial/views/PostList.vue')),
    Post: defineAsyncComponent(() => import('./editorial/views/Post.vue')),
    ProjectList: defineAsyncComponent(() => import('./editorial/views/ProjectList.vue')),
    Project: defineAsyncComponent(() => import('./editorial/views/Project.vue')),
    NotFound: defineAsyncComponent(() => import('./editorial/views/NotFound.vue')),
  },
}

export const themes: Record<ThemeId, ThemeDefinition> = { editorial }
