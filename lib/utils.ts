import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import languageColors from 'resources/language-colors.json'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assertType<T, _U extends T>(): void {}

export function getLanguageColor(language: string) {
  return (
    Object.entries(languageColors).find(([key]) => key.toLowerCase() === language.toLowerCase())?.[1] as {
      color: string
    } | undefined
  )?.color
}
