export interface Car {
  id: string
  brand: string
  model: string
  year: number
  isRented: boolean
  pricePerDay: number
  type: string
  fuelType: string
  transmissionType: string
  bookingId: number
  image: string
  available: boolean
}

export interface rentCarSliceState {
  cars: Car[]
  status: "loading" | "success" | "default" | "error"
  error: any
  selectedDates: {
    startDate: string
    endDate: string
  } | null
}
