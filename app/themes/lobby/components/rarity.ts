import type { ProjectCard } from '~/data/models'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

/** Item rarity is a presentation choice of this theme, derived from neutral model fields. */
export function rarityOf(project: Pick<ProjectCard, 'status' | 'featured'>): Rarity {
  if (project.featured && project.status === 'live') return 'legendary'
  if (project.status === 'live') return 'epic'
  if (project.status === 'wip') return 'rare'
  return 'uncommon'
}

export const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
}
