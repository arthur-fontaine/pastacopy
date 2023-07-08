import { z } from 'zod'

export const snippetSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  code: z.string(),
  language: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.object({
    name: z.string(),
    githubId: z.string(),
  }),
})
