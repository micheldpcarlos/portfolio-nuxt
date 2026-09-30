import { DEFAULT_THEME, isTheme, themes } from '~/themes'
import type { ThemeId } from '#shared/themes'

function themeParam(param: string | string[] | undefined): ThemeId {
  const value = Array.isArray(param) ? param[0] : param
  return isTheme(value) ? value : DEFAULT_THEME
}

/** The active theme, derived from the optional `[[theme]]` route segment. */
export function useTheme() {
  const route = useRoute()
  const id = computed(() => themeParam(route.params.theme))
  const definition = computed(() => themes[id.value])
  const prefix = computed(() => (id.value === DEFAULT_THEME ? '' : `/${id.value}`))
  /** Prefixes a content path with the active theme so links stay inside the theme. */
  const link = (path: string) => (path === '/' ? prefix.value || '/' : `${prefix.value}${path}`)
  return { id, definition, prefix, link }
}

/** The content path with the theme prefix removed. `/space/blog/x` -> `/blog/x`. */
export function useContentPath(): string {
  const route = useRoute()
  const { prefix } = useTheme()
  const stripped = prefix.value && route.path.startsWith(prefix.value)
    ? route.path.slice(prefix.value.length)
    : route.path
  const trimmed = stripped.replace(/\/+$/, '')
  return trimmed || '/'
}
