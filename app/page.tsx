import { resolve } from "@/lib/api"
import { SnippetsList } from "./snippets-list";
import { SnippetCard } from "./snippet-card-component";

export default async function IndexPage() {
  const snippets = await resolve(({ query }) => {
    return query.snippets().map((snippet) => ({
      id: snippet.id,
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      author: snippet.createdBy.name,
      authorUrl: `https://github.com/${snippet.createdBy.githubId}`
    }))
  });

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Handcrafted code snippets at your fingertips, <br className="hidden sm:inline" />
          without any installation required.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Access a curated collection of code snippets, contributed by developers worldwide.
          Copy and use them instantly, hassle-free.
        </p>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <SnippetsList snippets={
          snippets.map((snippet) => ({
            component: <SnippetCard
              key={snippet.id}
              {...snippet}
            />,
            props: snippet
          }))
        } />
      </div>
    </section>
  )
}
