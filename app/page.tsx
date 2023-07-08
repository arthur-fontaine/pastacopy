import { Input } from "@/components/ui/input"
import { query, resolved } from "@/lib/api"

export default async function IndexPage() {
  const data = await resolved(() => query.hello)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Effortlessly share and discover code snippets <br className="hidden sm:inline" />
          with Pastacopy — no installation required.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Access a curated collection of code snippets, contributed by developers worldwide.
          Copy and use them instantly, hassle-free.
        </p>
      </div>
      <div className="mt-16 flex gap-4">
        <Input
          placeholder="Search for a snippet..."
          className="text-md h-12 max-w-2xl shadow-3xl shadow-input"
        />
        {data}
      </div>
    </section>
  )
}
