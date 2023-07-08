import fs from "node:fs"

import { zodToJsonSchema } from "zod-to-json-schema"

import { snippetSchema } from "../schemas/snippet-schema"

const jsonSchema = zodToJsonSchema(snippetSchema)

fs.writeFileSync(
  "resources/snippets/$schema.json",
  JSON.stringify(jsonSchema, null, 2),
)
