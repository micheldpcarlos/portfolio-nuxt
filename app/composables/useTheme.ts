import { DEFAULT_THEME, isTheme, themePrefix, themes } from '~/themes'
import { THEME_ROUTE_BASE } from '#shared/themes'
import type { ThemeId } from '#shared/themes'

function themeFromRoute(route: { params: Record<string, string | string[] | undefined>, path: string }): ThemeId {
  const param = route.params.theme
  const value = Array.isArray(param) ? param[0] : param
  if (isTheme(value)) return value
  // Unmatched URLs (the 404 page) have no params, so read the prefix from the path.
  const match = route.path.match(new RegExp(`^${THEME_ROUTE_BASE}/([^/]+)`))
  return match && isTheme(match[1]) ? match[1] : DEFAULT_THEME
}

/** The active theme, derived from the `:theme` param of routes under /theme/<id>. */
export function useTheme() {
  const route = useRoute()
  const id = computed(() => themeFromRoute(route))
  const definition = computed(() => themes[id.value])
  const prefix = computed(() => themePrefix(id.value))
  /** Prefixes a content path with the active theme so links stay inside the theme. */
  const link = (path: string) => (path === '/' ? prefix.value || '/' : `${prefix.value}${path}`)
  return { id, definition, prefix, link }
}

/** The content path with the theme prefix removed. `/theme/lobby/blog/x` -> `/blog/x`. */
export function useContentPath(): string {
  const route = useRoute()
  const { prefix } = useTheme()
  const stripped = prefix.value && route.path.startsWith(prefix.value)
    ? route.path.slice(prefix.value.length)
    : route.path
  const trimmed = stripped.replace(/\/+$/, '')
  return trimmed || '/'
}
