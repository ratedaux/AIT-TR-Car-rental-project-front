import { boolean } from "yup"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isActive: boolean
}

export interface AuthSliceState {
  user: User | null
  isLoggedIn: boolean
  loginError: string | undefined
  registerError: string | undefined
  status: "default" | "loading" | "success" | "error"
  successMessage: string | undefined
  registerMessage: string | undefined
  accessToken: string | null
  refreshToken: string | undefined  | null
}
