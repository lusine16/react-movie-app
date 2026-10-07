import type { Movie } from '../types/Movie'
import type { User } from '../types/User'
import { api } from './api'

export async function getFavorites(): Promise<Movie[]> {
  const response = await api.get<Movie[]>('/favorites')

  return response.data
}

export async function addFavorite(movieId: number): Promise<User> {
  const formData = new URLSearchParams({
    id: String(movieId),
  })

  const response = await api.post<User>('/favorites', formData)

  return response.data
}

export async function removeFavorite(movieId: number): Promise<User> {
  const response = await api.delete<User>(`/favorites/${movieId}`)

  return response.data
}