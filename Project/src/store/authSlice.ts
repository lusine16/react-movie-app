import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../types/User'
import type { RootState } from './store'


type AuthState = {
  user: User | null
  isInitialized: boolean
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload
      state.isInitialized = true
    },
    clearUser: (state) => {
      state.user = null
      state.isInitialized = true
    },
    finishAuthCheck: (state) => {
      state.isInitialized = true
    },
  },
})

export const {
  setUser,
  clearUser,
  finishAuthCheck,
} = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectAuthInitialized = (state: RootState) =>
state.auth.isInitialized

