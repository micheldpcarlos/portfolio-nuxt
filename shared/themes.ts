// Theme identifiers, shared with nuxt.config so themed routes can be generated
// without importing any Vue code there.
export const THEME_IDS = ['editorial', 'lobby'] as const

export type ThemeId = (typeof THEME_IDS)[number]

export const DEFAULT_THEME: ThemeId = 'editorial'

/** Non-default themes are served under `${THEME_ROUTE_BASE}/<id>/...`. */
export const THEME_ROUTE_BASE = '/theme'

/** localStorage key holding the visitor's preferred theme id. */
export const THEME_STORAGE_KEY = 'theme'

export function isTheme(id: unknown): id is ThemeId {
  return typeof id === 'string' && (THEME_IDS as readonly string[]).includes(id)
}

/** URL prefix for a theme: '' for the default, '/theme/lobby' otherwise. */
export function themePrefix(id: ThemeId): string {
  return id === DEFAULT_THEME ? '' : `${THEME_ROUTE_BASE}/${id}`
}

/** Prefixes of every non-default theme, e.g. ['/theme/lobby']. */
export const themePrefixes = THEME_IDS.filter(id => id !== DEFAULT_THEME).map(themePrefix)

/** Route pattern that only matches registered non-default themes. */
export const themeRoutePattern = `${THEME_ROUTE_BASE}/:theme(${THEME_IDS.filter(id => id !== DEFAULT_THEME).join('|')})`

/**
 * Inline script for <head>. Runs before first paint: if the visitor prefers a
 * non-default theme and the URL is not already under a theme prefix, it swaps
 * the URL for the themed one. Themed URLs always win, so shared links open the
 * theme they point to.
 */
export const themeRedirectScript = `(function(){try{
var ids=${JSON.stringify(THEME_IDS)},d=${JSON.stringify(DEFAULT_THEME)},k=${JSON.stringify(THEME_STORAGE_KEY)},b=${JSON.stringify(THEME_ROUTE_BASE)};
var p=localStorage.getItem(k);if(!p||p===d||ids.indexOf(p)<0)return;
var path=location.pathname;if(path===b||path.indexOf(b+'/')===0)return;
location.replace(b+'/'+p+(path==='/'?'':path)+location.search+location.hash);
}catch(e){}})();`
