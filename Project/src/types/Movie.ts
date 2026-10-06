export type Movie = {
  id: number
  title: string
  originalTitle: string
  releaseYear: number
  genres: string[]
  plot: string
  runtime: number
  posterUrl: string | null
  backdropUrl: string | null
  trailerUrl: string
  trailerYouTubeId: string
  tmdbRating: number
}