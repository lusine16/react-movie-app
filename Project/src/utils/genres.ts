import { genreTitles } from '../data/genreTitles'
import type { Genre } from '../types/Genre'

export function createGenres(names: string[]): Genre[] {
  return names.map((name) => ({
    name,
    title: genreTitles[name] ?? name,
    imageUrl: '',
  }))
}