export interface User {
  id: number
  email: string
  name: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

