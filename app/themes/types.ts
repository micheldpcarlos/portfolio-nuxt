import type { Component } from 'vue'
import type { ThemeId } from '#shared/themes'
import type { NuxtError } from '#app'
import type { HomeData, PageDetail, PostDetail, PostSummary, ProjectCard, ProjectDetail } from '~/data/models'

/**
 * The theme contract. Every theme ships a shell and one component per view.
 * Views receive exactly these props and nothing else; they never query data.
 */
export interface ViewProps {
  Home: { home: HomeData, featuredProjects: ProjectCard[], latestPosts: PostSummary[] }
  About: { page: PageDetail }
  PostList: { posts: PostSummary[], activeTag: string | null }
  Post: { post: PostDetail }
  ProjectList: { projects: ProjectCard[] }
  Project: { project: ProjectDetail }
  NotFound: { error: NuxtError }
}

export type ViewName = keyof ViewProps

export interface ThemeDefinition {
  id: ThemeId
  label: string
  /** One line shown in the theme selector. */
  tagline: string
  /** Iconify name shown in the theme selector. */
  icon: string
  shell: Component
  views: { [K in ViewName]: Component }
}

export type { ThemeId }
