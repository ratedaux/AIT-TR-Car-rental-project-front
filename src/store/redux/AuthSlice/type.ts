interface AuthSliceState {
    user: { email: string } | null 
    error: string | undefined 
    status: "default" | "loading" | "success" | "error" 
  }