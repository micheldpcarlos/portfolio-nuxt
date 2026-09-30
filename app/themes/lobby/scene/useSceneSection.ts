/**
 * Maps the current content path to a camera angle so navigating between
 * sections swings the camera around the island instead of rebuilding the scene.
 */
export type SceneSection = 'home' | 'blog' | 'projects' | 'about' | 'other'

export function sectionOf(path: string): SceneSection {
  if (path === '/') return 'home'
  if (path.startsWith('/blog')) return 'blog'
  if (path.startsWith('/projects')) return 'projects'
  if (path.startsWith('/about')) return 'about'
  return 'other'
}

/** Camera orbit angle in radians and height per section. */
export const SECTION_CAMERA: Record<SceneSection, { angle: number, height: number, distance: number }> = {
  home: { angle: 0, height: 3.2, distance: 13 },
  blog: { angle: 1.1, height: 4.5, distance: 14 },
  projects: { angle: -1.1, height: 2.4, distance: 12 },
  about: { angle: 2.4, height: 5.5, distance: 15 },
  other: { angle: 3.1, height: 8, distance: 18 },
}
