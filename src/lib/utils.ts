import { Title } from '@/types/anime'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to ensure URL ends with a slash
export function ensureUrlEndsWithSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`
}

// Remove html tags from string
export function RemoveHTMLTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, '')
}

// Format title in case its an object or a string
export function formatTitle(anime: Title) {
  if (anime && anime.english) {
    return anime.english
  } else if (anime && anime.romaji) {
    return anime.romaji
  } else if (anime && anime.english) {
    return anime.english
  } else {
    return 'Title Not Available'
  }
}

// Time by Milliseconds
export const ONE_DAY = 60 * 60 * 24
