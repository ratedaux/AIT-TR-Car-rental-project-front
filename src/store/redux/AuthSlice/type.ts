export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

export interface AuthSliceState {
  user: User | null
  loginError: string | undefined
  registerError: string | undefined
  status: "default" | "loading" | "success" | "error"
  successMessage: string | undefined
  registerMessage: string | undefined
  accessToken: string | null
  refreshToken: string | undefined  | null
}
