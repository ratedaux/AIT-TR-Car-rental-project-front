export interface CarCardProps {
  id: string
  brand: string
  model: string
  year?: number
  type: string
  fuelType: string
  transmissionType: string
  carStatus?: string
  dayRentalPrice: number
  image: string
  // onMoreDetails?: () => void
  // onRent?: () => void
}
