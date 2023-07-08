import { z } from "zod"
import { assertType } from "@/lib/utils"
import { snippetSchema } from "@/schemas/snippet-schema"
import { Infer } from "garph"
import { g } from "../g"

export const snippetType = g.type('Snippet', {
  id: g.string(),
  title: g.string(),
  description: g.string(),
  code: g.string(),
  language: g.string(),
  createdAt: g.string(),
  updatedAt: g.string(),
  createdBy: g.type('User', {
    name: g.string(),
    githubId: g.string(),
  }),
})

assertType<z.infer<typeof snippetSchema>, Infer<typeof snippetType>>()
