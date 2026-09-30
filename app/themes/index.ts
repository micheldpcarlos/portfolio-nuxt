import { defineAsyncComponent } from 'vue'
import type { ThemeDefinition } from './types'
import type { ThemeId } from '#shared/themes'

export { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme, themePrefix, themePrefixes } from '#shared/themes'

// Components are async so each theme is its own chunk; a visitor on the
// default theme never downloads another theme's code (the lobby theme pulls
// in Three.js, which the editorial theme never sees).
const editorial: ThemeDefinition = {
  id: 'editorial',
  label: 'Editorial',
  tagline: 'Clean and readable, light or dark.',
  icon: 'lucide:newspaper',
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

const lobby: ThemeDefinition = {
  id: 'lobby',
  label: 'Lobby',
  tagline: 'Game lobby with a floating 3D island.',
  icon: 'lucide:gamepad-2',
  shell: defineAsyncComponent(() => import('./lobby/Shell.vue')),
  views: {
    Home: defineAsyncComponent(() => import('./lobby/views/Home.vue')),
    About: defineAsyncComponent(() => import('./lobby/views/About.vue')),
    PostList: defineAsyncComponent(() => import('./lobby/views/PostList.vue')),
    Post: defineAsyncComponent(() => import('./lobby/views/Post.vue')),
    ProjectList: defineAsyncComponent(() => import('./lobby/views/ProjectList.vue')),
    Project: defineAsyncComponent(() => import('./lobby/views/Project.vue')),
    NotFound: defineAsyncComponent(() => import('./lobby/views/NotFound.vue')),
  },
}

const win98: ThemeDefinition = {
  id: 'win98',
  label: 'Windows 98',
  tagline: 'Teal desktop, beveled windows, a taskbar.',
  icon: 'lucide:monitor',
  shell: defineAsyncComponent(() => import('./win98/Shell.vue')),
  views: {
    Home: defineAsyncComponent(() => import('./win98/views/Home.vue')),
    About: defineAsyncComponent(() => import('./win98/views/About.vue')),
    PostList: defineAsyncComponent(() => import('./win98/views/PostList.vue')),
    Post: defineAsyncComponent(() => import('./win98/views/Post.vue')),
    ProjectList: defineAsyncComponent(() => import('./win98/views/ProjectList.vue')),
    Project: defineAsyncComponent(() => import('./win98/views/Project.vue')),
    NotFound: defineAsyncComponent(() => import('./win98/views/NotFound.vue')),
  },
}

export const themes: Record<ThemeId, ThemeDefinition> = { editorial, lobby, win98 }
