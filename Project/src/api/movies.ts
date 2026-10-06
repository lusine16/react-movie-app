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