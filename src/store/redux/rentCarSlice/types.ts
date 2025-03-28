export interface Car {
  id: string
  brand: string
  model: string
  year: number
  type: string
  fuelType: string
  transmissionType: string
  carStatus: string
  dayRentalPrice: number
  image: string
}

export interface rentCarSliceState {
  cars: Car[]
  status: "loading" | "success" | "default" | "error"
  error: any
}

export interface brandsSliceState {
  brands: string[]
  status: "idle" | "loading" | "success" | "error"
  error: any
}
