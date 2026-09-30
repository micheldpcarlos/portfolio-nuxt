// Theme identifiers, shared with nuxt.config so route prefixes can be prerendered
// without importing any Vue code there.
export const THEME_IDS = ['editorial', 'lobby'] as const

export type ThemeId = (typeof THEME_IDS)[number]

export const DEFAULT_THEME: ThemeId = 'editorial'

/** localStorage key holding the visitor's preferred theme id. */
export const THEME_STORAGE_KEY = 'theme'

export function isTheme(id: unknown): id is ThemeId {
  return typeof id === 'string' && (THEME_IDS as readonly string[]).includes(id)
}

/** Route prefixes for every non-default theme, e.g. ['/lobby']. */
export const themePrefixes = THEME_IDS.filter(id => id !== DEFAULT_THEME).map(id => `/${id}`)

/**
 * Inline script for <head>. Runs before first paint: if the visitor prefers a
 * non-default theme and the URL is not already under a theme prefix, it swaps
 * the URL for the themed one. URLs under a prefix always win, so shared links
 * open the theme they point to.
 */
export const themeRedirectScript = `(function(){try{
var ids=${JSON.stringify(THEME_IDS)},d=${JSON.stringify(DEFAULT_THEME)},k=${JSON.stringify(THEME_STORAGE_KEY)};
var p=localStorage.getItem(k);if(!p||p===d||ids.indexOf(p)<0)return;
var path=location.pathname;
for(var i=0;i<ids.length;i++){var pre='/'+ids[i];if(path===pre||path.indexOf(pre+'/')===0)return;}
location.replace('/'+p+(path==='/'?'':path)+location.search+location.hash);
}catch(e){}})();`
