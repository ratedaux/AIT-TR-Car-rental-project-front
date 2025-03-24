export interface CarCardProps {
  id: number
  brand: string
  model: string
  year: number

  type: string
  fuelType: string
  transmissionType: string
  carStatus?: string
  dayRentalPrice: number
  carImage?: string
  onMoreDetails?: () => void
  onRent?: () => void


}
