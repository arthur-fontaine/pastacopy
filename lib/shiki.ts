import type { Highlighter, Lang } from 'shiki'
import { renderToHtml, getHighlighter, setWasm } from 'shiki'

import _darkTheme from '@/lib/code-themes/dark.json'
import _lightTheme from '@/lib/code-themes/light.json'

const darkTheme = _darkTheme as any
const lightTheme = _lightTheme as any

let highlighter: Highlighter
export async function highlight(code: string, theme: 'dark' | 'light', lang: Lang) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      themes: [darkTheme, lightTheme],
      paths: {
        wasm: '/shiki',
        languages: '/shiki/languages'
      },
    })
  }

  const tokens = highlighter.codeToThemedTokens(
    code,
    lang,
    theme === 'dark' ? darkTheme.name : lightTheme.name,
    {
      includeExplanation: false
    },
  )
  const html = renderToHtml(tokens, { bg: 'transparent' })

  return html
}
