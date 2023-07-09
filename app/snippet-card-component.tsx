import { Card } from "@/components/ui/card"
import { TypographyH4, TypographyMuted, TypographySmall } from "@/components/typography"
import { Badge } from '@/components/ui/badge'
import { getLanguageColor } from '@/lib/utils'
import Link from 'next/link'

interface SnippetCardProps {
  id: string
  title: string
  description: string
  language: string
  author: string
  authorUrl: string
}

export async function SnippetCard(props: SnippetCardProps) {
  const languageColor = getLanguageColor(props.language) ?? '#ccc'

  return <Link href={`/snippets/${props.id}`} className='contents'>
    <Card className='flex max-w-[30%] flex-1 flex-col p-4 transition hover:scale-105 hover:bg-card-hover'>
      <header className="mb-2 flex flex-row justify-between">
        <TypographyH4>{props.title}</TypographyH4>
        <Badge color={languageColor} className='w-fit'>{props.language}</Badge>
      </header>
      <TypographyMuted className='min-h-[calc(theme(fontSize.sm[1].lineHeight)_*_5)] flex-1 line-clamp-5'>{props.description}</TypographyMuted>
      <footer className="mt-4 flex flex-col gap-2">
        <TypographySmall>
          <a href={props.authorUrl} className="text-muted-foreground transition-colors hover:text-primary">
            {props.author}
          </a>
        </TypographySmall>
      </footer>
    </Card>
  </Link>
}
