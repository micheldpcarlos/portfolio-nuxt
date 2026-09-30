/**
 * Pure mappers from Nuxt Content documents to view models.
 * No Nuxt imports here so they can be unit tested in isolation.
 */
import type {
  BlogCollectionItem,
  HomeCollectionItem,
  MinimarkNode,
  PagesCollectionItem,
  ProjectsCollectionItem,
} from '@nuxt/content'
import type {
  ContentBody,
  HomeData,
  PageDetail,
  PostDetail,
  PostLink,
  PostSummary,
  ProjectCard,
  ProjectDetail,
} from './models'

const WORDS_PER_MINUTE = 200

export function textOf(node: MinimarkNode | undefined): string {
  if (node === undefined) return ''
  if (typeof node === 'string') return node
  const [, , ...children] = node
  return children.map(textOf).join(' ')
}

export function wordCount(body: ContentBody | undefined): number {
  if (!body) return 0
  const text = body.value.map(textOf).join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

export function readingMinutes(body: ContentBody | undefined): number {
  return Math.max(1, Math.round(wordCount(body) / WORDS_PER_MINUTE))
}

export function normalizeTags(tags: readonly string[] | undefined): string[] {
  const seen = new Set<string>()
  for (const raw of tags ?? []) {
    const tag = raw.trim().toLowerCase()
    if (tag) seen.add(tag)
  }
  return [...seen]
}

/** Newest first, then by path for a stable order on equal dates. */
export function byDateDesc<T extends { date: string, path: string }>(a: T, b: T): number {
  return b.date.localeCompare(a.date) || a.path.localeCompare(b.path)
}

type PostSource = Pick<BlogCollectionItem, 'path' | 'title' | 'description' | 'date' | 'updated' | 'tags' | 'cover'> & { body?: ContentBody }

export function toPostSummary(doc: PostSource): PostSummary {
  return {
    path: doc.path,
    title: doc.title,
    description: doc.description,
    date: doc.date,
    updated: doc.updated ?? undefined,
    tags: normalizeTags(doc.tags),
    cover: doc.cover ?? undefined,
    readingMinutes: readingMinutes(doc.body),
  }
}

/**
 * `siblings` is the full published list, newest first.
 * `prev` is the older post, `next` the newer one.
 */
export function adjacentPosts(path: string, siblings: readonly PostLink[]): Pick<PostDetail, 'prev' | 'next'> {
  const index = siblings.findIndex(p => p.path === path)
  if (index === -1) return {}
  return {
    next: siblings[index - 1],
    prev: siblings[index + 1],
  }
}

export function toPostDetail(doc: BlogCollectionItem, siblings: readonly PostLink[]): PostDetail {
  return {
    ...toPostSummary(doc),
    body: doc.body,
    ...adjacentPosts(doc.path, siblings),
  }
}

type ProjectSource = Omit<ProjectsCollectionItem, 'body' | 'seo' | 'navigation' | 'id' | 'extension' | 'meta' | 'stem'>

export function toProjectCard(doc: ProjectSource): ProjectCard {
  return {
    path: doc.path,
    title: doc.title,
    description: doc.description,
    date: doc.date,
    status: doc.status,
    stack: [...(doc.stack ?? [])],
    featured: Boolean(doc.featured),
    repo: doc.repo ?? undefined,
    url: doc.url ?? undefined,
    store: doc.store ?? undefined,
    cover: doc.cover ?? undefined,
  }
}

export function toProjectDetail(doc: ProjectsCollectionItem): ProjectDetail {
  return { ...toProjectCard(doc), body: doc.body }
}

export function toPageDetail(doc: PagesCollectionItem): PageDetail {
  return {
    path: doc.path,
    title: doc.title,
    description: doc.description,
    body: doc.body,
  }
}

export function toHome(doc: HomeCollectionItem): HomeData {
  return {
    hero: { ...doc.hero },
    featuredLimit: doc.featuredLimit ?? 3,
    latestPostsLimit: doc.latestPostsLimit ?? 3,
    skills: doc.skills.map(s => ({ ...s })),
  }
}
