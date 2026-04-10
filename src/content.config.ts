import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/en/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Mumega'),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    cover_image: z.string().optional(),
    cover_video: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
    toc: z.boolean().default(true),
    series: z.string().optional(),
    series_order: z.number().optional(),
    related: z.array(z.string()).default([]),
    newsletter: z.boolean().default(true),
    access: z.enum(['public', 'members', 'paid']).default('public'),
    task_id: z.string().optional(),
    bounty: z.number().optional(),
    weight: z.number().default(5),
    connections: z.array(z.string()).default([]),
    contributors: z.array(z.string()).default([]),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/en/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
})

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/en/team' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    model: z.string().optional(),
    status: z.enum(['active', 'idle', 'dormant']).default('active'),
    skills: z.array(z.string()).default([]),
    tasks_completed: z.number().default(0),
  }),
})

export const collections = { blog, pages, team }
