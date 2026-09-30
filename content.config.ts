import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Dates are ISO strings ("2026-09-29") so YAML never coerces them into Date objects.
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD')

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: { include: 'blog/**/*.md', prefix: '/blog' },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: isoDate,
        updated: isoDate.optional(),
        tags: z.array(z.string()).default([]),
        cover: z.string().optional(),
        draft: z.boolean().default(false),
      }),
    }),

    projects: defineCollection({
      type: 'page',
      source: { include: 'projects/*.md', prefix: '/projects' },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: isoDate,
        status: z.enum(['live', 'wip', 'archived']),
        repo: z.string().url().optional(),
        url: z.string().url().optional(),
        store: z.string().url().optional(),
        stack: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        cover: z.string().optional(),
      }),
    }),

    pages: defineCollection({
      type: 'page',
      source: { include: 'pages/*.md', prefix: '/' },
    }),

    home: defineCollection({
      type: 'data',
      source: 'home.yml',
      schema: z.object({
        hero: z.object({
          name: z.string(),
          role: z.string(),
          tagline: z.string(),
          avatar: z.string(),
        }),
        featuredLimit: z.number().int().positive().default(3),
        latestPostsLimit: z.number().int().positive().default(3),
        skills: z.array(z.object({
          name: z.string(),
          icon: z.string(),
          since: z.number().int(),
          note: z.string(),
        })),
      }),
    }),
  },
})
