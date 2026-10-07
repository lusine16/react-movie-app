import type { Movie } from '../types/Movie'
import { api } from './api'

export async function getRandomMovie(): Promise<Movie> {
  const response = await api.get<Movie>('/movie/random')

  return response.data
}

export async function getTopMovies(): Promise<Movie[]> {
  const response = await api.get<Movie[]>('/movie/top10')

  return response.data
}

export async function getGenres(): Promise<string[]> {
  const response = await api.get<string[]>('/movie/genres')

  return response.data
}

export async function getMoviesByGenre(
  genre: string,
  page: number,
): Promise<Movie[]> {
  const response = await api.get<Movie[]>('/movie', {
    params: {
      genre,
      count: 10,
      page,
    },
  })

  return response.data
}

export async function getMovieById(id: number): Promise<Movie> {
  const response = await api.get<Movie>(`/movie/${id}`)

  return response.data
}

export async function searchMovies(title: string): Promise<Movie[]> {
  const response = await api.get<Movie[]>('/movie', {
    params: {
      title,
    },
  })

  return response.data
}