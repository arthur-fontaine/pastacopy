import { CodeBlock } from "@/components/code-block";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/typography";
import { resolve } from "@/lib/api";

export default async function SnippetPage(
  { params: { id: ids } }: { params: { id: string[] } }
) {
  const id = ids.join("/");

  const data = await resolve(({ query }) => {
    const snippet = query.snippets({
      ids: [id]
    })[0]

    return {
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      code: snippet.code,
      author: snippet.createdBy.name,
      authorUrl: `https://github.com/${snippet.createdBy.githubId}`
    }
  });

  return <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
    <header>
      <TypographyH1 className="inline">
        {data.title}&nbsp;
      </TypographyH1>
      <TypographyH3 className="inline font-medium italic text-muted-foreground">
        by&nbsp;
        <a href={data.authorUrl} className="transition-colors hover:text-primary">
          {data.author}
        </a>
      </TypographyH3>
    </header>
    <TypographyP className="text-muted-foreground">
      {data.description}
    </TypographyP>
    <TypographyH2>
      Code
    </TypographyH2>
    <CodeBlock code={data.code} lang={data.language} />
  </section>
}
