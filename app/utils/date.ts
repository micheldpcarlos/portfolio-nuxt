const formatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })

/** "2026-09-29" -> "Sep 29, 2026" */
export function formatDate(iso: string): string {
  return formatter.format(new Date(`${iso}T00:00:00Z`))
}

export function yearOf(iso: string): string {
  return iso.slice(0, 4)
}
