import { describe, expect, it } from 'vitest'
import type { ContentBody } from '../app/data/models'
import { adjacentPosts, byDateDesc, normalizeTags, readingMinutes, toPostSummary, wordCount } from '../app/data/mappers'

function body(...paragraphs: string[]): ContentBody {
  return { type: 'minimark', value: paragraphs.map(text => ['p', {}, text]) }
}

describe('normalizeTags', () => {
  it('lowercases, trims, dedupes and drops empties', () => {
    expect(normalizeTags([' Vue', 'vue', 'NUXT', '', '  '])).toEqual(['vue', 'nuxt'])
  })
  it('handles undefined', () => {
    expect(normalizeTags(undefined)).toEqual([])
  })
})

describe('reading time', () => {
  it('counts words across nested nodes', () => {
    const tree: ContentBody = { type: 'minimark', value: [['p', {}, 'one ', ['strong', {}, 'two'], ' three']] }
    expect(wordCount(tree)).toBe(3)
  })
  it('never reports less than one minute', () => {
    expect(readingMinutes(body('short'))).toBe(1)
    expect(readingMinutes(undefined)).toBe(1)
  })
  it('rounds to the nearest minute at 200 wpm', () => {
    const words = Array.from({ length: 500 }, (_, i) => `w${i}`).join(' ')
    expect(readingMinutes(body(words))).toBe(3)
  })
})

describe('byDateDesc', () => {
  it('sorts newest first and breaks ties by path', () => {
    const items = [
      { date: '2026-01-01', path: '/b' },
      { date: '2026-03-01', path: '/c' },
      { date: '2026-01-01', path: '/a' },
    ]
    expect([...items].sort(byDateDesc).map(i => i.path)).toEqual(['/c', '/a', '/b'])
  })
})

describe('adjacentPosts', () => {
  const siblings = [
    { path: '/blog/newest', title: 'Newest' },
    { path: '/blog/middle', title: 'Middle' },
    { path: '/blog/oldest', title: 'Oldest' },
  ]
  it('returns the newer post as next and the older one as prev', () => {
    expect(adjacentPosts('/blog/middle', siblings)).toEqual({
      next: siblings[0],
      prev: siblings[2],
    })
  })
  it('omits missing neighbours at the ends', () => {
    expect(adjacentPosts('/blog/newest', siblings)).toEqual({ next: undefined, prev: siblings[1] })
    expect(adjacentPosts('/blog/oldest', siblings)).toEqual({ next: siblings[1], prev: undefined })
  })
  it('returns nothing for an unknown path', () => {
    expect(adjacentPosts('/blog/nope', siblings)).toEqual({})
  })
})

describe('toPostSummary', () => {
  it('maps fields and computes derived values', () => {
    const summary = toPostSummary({
      path: '/blog/hello',
      title: 'Hello',
      description: 'Desc',
      date: '2026-09-29',
      updated: undefined,
      tags: ['Vue', 'vue'],
      cover: undefined,
      body: body('hello world'),
    })
    expect(summary).toEqual({
      path: '/blog/hello',
      title: 'Hello',
      description: 'Desc',
      date: '2026-09-29',
      updated: undefined,
      tags: ['vue'],
      cover: undefined,
      readingMinutes: 1,
    })
  })
})
