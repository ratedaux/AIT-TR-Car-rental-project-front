export interface BrandsSliceState {
  brands: string[]
  status: "idle" | "loading" | "success" | "error"
  error: any
}
