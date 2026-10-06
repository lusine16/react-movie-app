export type Movie = {
  id: number
  title: string
  originalTitle: string
  language: string
  releaseYear: number
  releaseDate: string
  genres: string[]
  plot: string
  runtime: number
  budget: string | null
  revenue: string | null
  homepage: string
  status: string
  posterUrl: string | null
  backdropUrl: string | null
  trailerUrl: string
  trailerYouTubeId: string
  tmdbRating: number
  director: string | null
  production: string | null
  awardsSummary: string | null
}
