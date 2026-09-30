/**
 * Data access for pages and theme shells. Keys are stable so that a shell
 * and a page asking for the same thing share one request and one payload entry.
 */
import { getHome, getPage, getPost, getProject, listPosts, listProjects } from '~/data/queries'

export function usePosts() {
  return useAsyncData('posts', listPosts, { default: () => [] })
}

export function usePost(path: string) {
  return useAsyncData(`post:${path}`, () => getPost(path))
}

export function useProjects(options: { featured?: boolean } = {}) {
  const key = options.featured ? 'projects:featured' : 'projects'
  return useAsyncData(key, () => listProjects(options), { default: () => [] })
}

export function useProject(path: string) {
  return useAsyncData(`project:${path}`, () => getProject(path))
}

export function usePage(path: string) {
  return useAsyncData(`page:${path}`, () => getPage(path))
}

export function useHome() {
  return useAsyncData('home', getHome)
}
