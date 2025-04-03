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

export interface RentCarSliceState {
  cars: Car[]
  status: "loading" | "success" | "default" | "error"
  error: any
  priceRange: [number, number]
  selectedStartDate: string
  selectedEndDate: string
}
