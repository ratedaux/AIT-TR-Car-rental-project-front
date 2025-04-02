export interface UserSliceState {
  userList: UserData[]
  userData: UserData
  error?: string
  status: "default" | "loading" | "success" | "error"
}

export interface UserData {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  role?: string
  isActive: boolean
}
