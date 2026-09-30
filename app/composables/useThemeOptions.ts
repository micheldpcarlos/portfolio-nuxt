import { DEFAULT_THEME, THEME_STORAGE_KEY, themes } from '~/themes'
import type { ThemeId } from '~/themes/types'

export interface ThemeOption {
  id: ThemeId
  label: string
  tagline: string
  icon: string
  /** The current page under this theme. */
  to: string
  active: boolean
}

/**
 * Everything a theme selector needs: the list of themes with links to the
 * current page under each one, and a way to remember the visitor's choice.
 */
export function useThemeOptions() {
  const { id } = useTheme()
  const path = useContentPath()

  const options = computed<ThemeOption[]>(() =>
    Object.values(themes).map(theme => ({
      id: theme.id,
      label: theme.label,
      tagline: theme.tagline,
      icon: theme.icon,
      to: theme.id === DEFAULT_THEME ? path : `/${theme.id}${path === '/' ? '' : path}`,
      active: theme.id === id.value,
    })),
  )

  const current = computed(() => options.value.find(o => o.active) ?? options.value[0]!)

  function remember(theme: ThemeId) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
    catch {
      // Storage can be unavailable (private mode, blocked). The URL still works.
    }
  }

  return { options, current, remember }
}
