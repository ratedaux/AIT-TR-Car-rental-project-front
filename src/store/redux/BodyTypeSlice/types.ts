export interface BodyTypesSliceState {
  bodyTypes: string[]
  status: "idle" | "loading" | "success" | "error"
  error: any
}
