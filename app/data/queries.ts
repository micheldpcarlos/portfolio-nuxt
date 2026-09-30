/**
 * Every Nuxt Content query lives here. Pages and themes never call
 * queryCollection directly; they go through the composables in useSiteData.
 */
import { queryCollection } from '#imports'
import type { HomeData, PageDetail, PostDetail, PostLink, PostSummary, ProjectCard, ProjectDetail } from './models'
import { byDateDesc, toHome, toPageDetail, toPostDetail, toPostSummary, toProjectCard, toProjectDetail } from './mappers'

const POST_SUMMARY_FIELDS = ['path', 'title', 'description', 'date', 'updated', 'tags', 'cover', 'body'] as const

export async function listPosts(): Promise<PostSummary[]> {
  const docs = await queryCollection('blog')
    .where('draft', '=', false)
    .select(...POST_SUMMARY_FIELDS)
    .all()
  return docs.map(toPostSummary).sort(byDateDesc)
}

export async function getPost(path: string): Promise<PostDetail | null> {
  const [doc, siblings] = await Promise.all([
    queryCollection('blog').path(path).where('draft', '=', false).first(),
    listPostLinks(),
  ])
  return doc ? toPostDetail(doc, siblings) : null
}

async function listPostLinks(): Promise<PostLink[]> {
  const docs = await queryCollection('blog')
    .where('draft', '=', false)
    .select('path', 'title', 'date')
    .all()
  return docs.sort(byDateDesc).map(({ path, title }) => ({ path, title }))
}

export async function listProjects(options: { featured?: boolean } = {}): Promise<ProjectCard[]> {
  let query = queryCollection('projects')
    .select('path', 'title', 'description', 'date', 'status', 'stack', 'featured', 'repo', 'url', 'store', 'cover')
  if (options.featured) query = query.where('featured', '=', true)
  const docs = await query.all()
  return docs.map(toProjectCard).sort(byDateDesc)
}

export async function getProject(path: string): Promise<ProjectDetail | null> {
  const doc = await queryCollection('projects').path(path).first()
  return doc ? toProjectDetail(doc) : null
}

export async function getPage(path: string): Promise<PageDetail | null> {
  const doc = await queryCollection('pages').path(path).first()
  return doc ? toPageDetail(doc) : null
}

export async function getHome(): Promise<HomeData | null> {
  const doc = await queryCollection('home').first()
  return doc ? toHome(doc) : null
}
