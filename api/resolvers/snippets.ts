import { snippetSchema } from "@/schemas/snippet-schema"
import fsp from "fs/promises"

export async function getSnippets() {
  const snippets = await fsp.readdir("resources/snippets").then((snippets) =>
    snippets.filter((snippetName) => !snippetName.startsWith("$"))
  )

  return Promise.all(
    snippets.map(async (snippetName) => {
      const data = await fsp.readFile(`resources/snippets/${snippetName}`)
      const snippet = {
        id: snippetName.replace(".json", ""),
        ...JSON.parse(data.toString())
      }

      return snippetSchema.parse(snippet)
    })
  )
}
