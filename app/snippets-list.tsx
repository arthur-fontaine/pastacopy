"use client";

import { Input } from "@/components/ui/input";
import { SnippetCard } from "./snippet-card-component";
import { Fragment, useState, useMemo, useEffect } from "react";
import { create, insertMultiple, search } from '@orama/orama';
import { getLanguageColor } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TypographyH3, TypographyH4, TypographyMuted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SnippetCardProps = Parameters<typeof SnippetCard>[0]

export function SnippetsList({ snippets }: { snippets: { component: JSX.Element, props: SnippetCardProps }[] }) {
  const [rawSearchQuery, setRawSearchQuery] = useState('')
  const [shownSnippetIds, setShownSnippetIds] = useState<string[] | undefined>()

  const parsedSearchQuery = useMemo(() => {
    return parseSearchQuery(rawSearchQuery)
  }, [rawSearchQuery])

  const snippetsDb = useMemo(() => {
    return create({
      schema: {
        id: 'string',
        title: 'string',
        description: 'string',
        language: 'string',
        author: 'string',
        authorUrl: 'string'
      }
    })
      .then(async (db) => {
        await insertMultiple(db, snippets.map(({ props }) => ({
          id: props.id,
          title: props.title,
          description: props.description,
          language: props.language,
          author: props.author,
          authorUrl: props.authorUrl,
        })))
        return db
      })
  }, [snippets])

  useEffect(() => {
    if (rawSearchQuery === '') {
      setShownSnippetIds(undefined)
      return
    }

    const query = parsedSearchQuery.filter(({ type }) => type === 'query').map(({ value }) => value).join(' ')
    const languageFilters = parsedSearchQuery.filter(({ type }) => type === 'language')

    snippetsDb.then(async (db) => {
      const searchResult = await search(db, {
        term: query,
        properties: ['id', 'title', 'description', 'author'],
        boost: {
          id: 0.5,
          title: 2,
          description: 1,
          author: 1.5,
        },
        where: {
          ...languageFilters.length > 0 && {
            language: languageFilters.map(({ value }) => value)
          }
        },
      })

      const hits = searchResult.hits
      // TODO: check that hits are sorted by relevance
      const snippetIds = hits.map(({ id }) => id)

      setShownSnippetIds(snippetIds)
    })
  }, [rawSearchQuery, snippetsDb, setShownSnippetIds, parsedSearchQuery])

  return (
    <>
      <div>
        <div className="text-md pointer-events-none absolute h-12 px-3 py-2 leading-8">
          {parsedSearchQuery.map(({ type, value }) => {
            if (type === 'language') {
              const languageColor = getLanguageColor(value)

              return (
                [
                  <span key={value}>
                    language:
                    <span
                      className="rounded-sm"
                      style={{
                        color: languageColor,
                        backgroundColor: languageColor + '20',
                      }}
                    >
                      {value}
                    </span>
                  </span>,
                  ' '
                ]
              )
            }

            return (
              [
                <span key={value}>{value}</span>,
                ' '
              ]
            )
          })}
        </div>
        <Input
          placeholder="Search for a snippet..."
          className="text-md h-12 max-w-2xl text-transparent caret-foreground shadow-3xl shadow-input"
          value={rawSearchQuery}
          onChange={(e) => setRawSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        {
          shownSnippetIds === undefined
            ? (
              snippets.map(({ component, props }) => (
                <Fragment key={props.id}>
                  {component}
                </Fragment>
              ))
            )
            : shownSnippetIds.length === 0
              ? (
                <CreateSnippetCard />
              )
              : (
                shownSnippetIds.map((snippetId) => (
                  <Fragment key={snippetId}>
                    {snippets.find(({ props }) => props.id === snippetId)?.component}
                  </Fragment>
                ))
              )
        }
      </div>
    </>
  )
}

function parseSearchQuery(searchQuery: string) {
  // Supported filters:
  // - language:languageName

  const rawTokens = searchQuery.split(' ')

  const tokens: (
    | { type: 'language', value: string }
    | { type: 'query', value: string }
  )[] = []

  for (const rawToken of rawTokens) {
    if (rawToken.startsWith('language:') && rawToken.length > 'language:'.length) {
      const languageName = rawToken.replace('language:', '')

      tokens.push({
        type: 'language',
        value: languageName
      })

      continue
    }

    tokens.push({
      type: 'query',
      value: rawToken
    })
  }

  return tokens
}

function CreateSnippetCard() {
  return (
    <Card className='flex max-w-[30%] flex-1 flex-col p-4'>
      <TypographyH4 className='mb-2'>
        No snippets found
      </TypographyH4>
      <TypographyMuted className='min-h-[calc(theme(fontSize.sm[1].lineHeight)_*_5)] flex-1 line-clamp-5'>
        Try searching for something else or submit a new snippet.
      </TypographyMuted>
      <Link href='/submit' className="contents">
        <Button variant="link" className="mt-4 h-fit w-fit p-0 leading-none">
          Create snippet
        </Button>
      </Link>
    </Card>
  )
}
