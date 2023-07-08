import { cn } from "@/lib/utils"
import React from "react"

function createTypographyComponent<T extends keyof JSX.IntrinsicElements>(
  tag: T, typographyClassName: string
) {
  const TypographyComp = React.forwardRef<
    JSX.IntrinsicElements[T],
    JSX.IntrinsicElements[T] & { as?: React.ElementType }
  >(({ as, className, ...props }, ref) => {
    const Comp = as || tag
    return <Comp ref={ref} className={cn(typographyClassName, className)} {...props} />
  })
  TypographyComp.displayName = `Typography${tag.toUpperCase()}`

  return TypographyComp
}

export const TypographyH1 = createTypographyComponent("h1", "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl")
export const TypographyH2 = createTypographyComponent("h2", "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0")
export const TypographyH3 = createTypographyComponent("h3", "scroll-m-20 text-2xl font-semibold tracking-tight")
export const TypographyH4 = createTypographyComponent("h4", "scroll-m-20 text-xl font-semibold tracking-tight")
export const TypographyP = createTypographyComponent("p", "leading-7 [&:not(:first-child)]:mt-6")
export const TypographyBlockquote = createTypographyComponent("blockquote", "mt-6 border-l-2 pl-6 italic")
export const TypographyUl = createTypographyComponent("ul", "my-6 ml-6 list-disc [&>li]:mt-2")
export const TypographyInlineCode = createTypographyComponent("code", "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold")
export const TypographyLead = createTypographyComponent("p", "text-xl text-muted-foreground")
export const TypographyLarge = createTypographyComponent("div", "text-lg font-semibold")
export const TypographySmall = createTypographyComponent("small", "text-sm font-medium leading-none")
export const TypographyMuted = createTypographyComponent("p", "text-sm text-muted-foreground")
