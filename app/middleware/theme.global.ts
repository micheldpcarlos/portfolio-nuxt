import { isTheme } from '#shared/themes'

// Routes live under an optional `[[theme]]` segment. Anything in that segment
// that is not a registered theme is a 404, not a page on the default theme.
export default defineNuxtRouteMiddleware((to) => {
  const param = to.params.theme
  const value = Array.isArray(param) ? param[0] : param
  if (value && !isTheme(value)) {
    return abortNavigation(createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true }))
  }
})
