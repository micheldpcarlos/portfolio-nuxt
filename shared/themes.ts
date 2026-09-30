// Theme identifiers, shared with nuxt.config so route prefixes can be prerendered
// without importing any Vue code there.
export const THEME_IDS = ['editorial'] as const

export type ThemeId = (typeof THEME_IDS)[number]

export const DEFAULT_THEME: ThemeId = 'editorial'

export function isTheme(id: unknown): id is ThemeId {
  return typeof id === 'string' && (THEME_IDS as readonly string[]).includes(id)
}

/** Route prefixes for every non-default theme, e.g. ['/space']. */
export const themePrefixes = THEME_IDS.filter(id => id !== DEFAULT_THEME).map(id => `/${id}`)
