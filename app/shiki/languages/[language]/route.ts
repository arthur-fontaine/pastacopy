import fs from "fs"

export async function GET(request: Request) {
  // request.url.match(/\/shiki\/languages\/(?<language>.*)/)
  const match = request.url.match(/\/shiki\/languages\/(?<language>.*)/)
  const language = match?.groups?.language
  if (!language) {
    return new Response("Not found", {
      status: 404,
    })
  }

  const data = fs.readFileSync(`node_modules/shiki/languages/${language}`)

  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
