interface AuthSliceState {
  user: { email: string } | null
  loginError: string | undefined
  registerError: string | undefined
  status: "default" | "loading" | "success" | "error"
  successMessage: string | undefined
  registerMessage: string | undefined
}
