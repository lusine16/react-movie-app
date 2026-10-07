import type { LoginData, RegisterData } from '../types/Auth'
import { api } from './api'
import type { User } from '../types/User'

export async function login(data: LoginData): Promise<void> {
  const formData = new URLSearchParams(Object.entries(data))

  await api.post('/auth/login', formData)
}

export async function register(data: RegisterData): Promise<void> {
  const formData = new URLSearchParams(Object.entries(data))

  await api.post('/user', formData)
}

export async function getProfile(): Promise<User> {
  const response = await api.get<User>('/profile')

  return response.data
}

export async function logout(): Promise<void> {
  await api.get('/auth/logout')
}