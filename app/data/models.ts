/**
 * View models. Themes render these and nothing else.
 * They describe content, never presentation: no colors, no layout hints.
 */
import type { MinimarkTree } from '@nuxt/content'

export type ContentBody = MinimarkTree

export interface PostLink {
  path: string
  title: string
}

export interface PostSummary {
  path: string
  title: string
  description: string
  /** ISO date, YYYY-MM-DD */
  date: string
  updated?: string
  tags: string[]
  cover?: string
  readingMinutes: number
}

export interface PostDetail extends PostSummary {
  body: ContentBody
  prev?: PostLink
  next?: PostLink
}

export type ProjectStatus = 'live' | 'wip' | 'archived'

export interface ProjectCard {
  path: string
  title: string
  description: string
  date: string
  status: ProjectStatus
  stack: string[]
  featured: boolean
  repo?: string
  url?: string
  store?: string
  cover?: string
}

export interface ProjectDetail extends ProjectCard {
  body: ContentBody
}

export interface PageDetail {
  path: string
  title: string
  description: string
  body: ContentBody
}

export interface Skill {
  name: string
  icon: string
  since: number
  note: string
}

export interface HomeData {
  hero: {
    name: string
    role: string
    tagline: string
    avatar: string
  }
  featuredLimit: number
  latestPostsLimit: number
  skills: Skill[]
}
