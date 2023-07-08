import fs from "fs"

const data = fs.readFileSync("node_modules/shiki/dist/onig.wasm")

export async function GET() {
  return new Response(data, {
    headers: {
      "Content-Type": "application/wasm",
    },
  })
}
