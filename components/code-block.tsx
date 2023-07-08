"use client";

import { highlight } from "@/lib/shiki"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button";

export interface CodeBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  code: string
  lang: string
}

const CodeBlock = React.forwardRef<HTMLButtonElement, CodeBlockProps>(
  ({ className, code, lang, ...props }, ref) => {
    const { theme } = useTheme()

    const [highlightedHtml, setHighlightedHtml] = useState<string>()
    const [copied, setCopied] = useState(false)

    useEffect(() => {
      ; (async () => {
        const html = await highlight(
          code,
          theme === "dark" ? "dark" : "light",
          lang as any,
        )
        setHighlightedHtml(html)
      })()
    }, [code, lang, theme])

    useEffect(() => {
      if (copied) {
        const timeout = setTimeout(() => {
          setCopied(false)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }, [copied])

    return (
      <div className="relative mb-4 mt-6 overflow-x-auto rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-900">
        {
          highlightedHtml !== undefined ? (
            <div
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              className={cn(className)}
            />
          ) : (
            <pre>
              <div
                dangerouslySetInnerHTML={{
                  __html: code
                    .replaceAll(" ", "&nbsp;")
                    .replaceAll("\n", "<br />"),
                }}
                className={cn(className)}
              />
            </pre>
          )
        }
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-6 w-6"
          size="icon"
          disabled={copied}
          onClick={() => {
            navigator.clipboard.writeText(code)
            setCopied(true)
          }}
        >
          {
            copied
              ? <Check size={12} />
              : <Copy size={12} />
          }
        </Button>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
