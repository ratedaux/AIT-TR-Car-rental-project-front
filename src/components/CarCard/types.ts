export interface CarCardProps {
  id: string
  brand: string
  model: string
  year: number
  type: string
  fuelType: string
  transmissionType: string
  carStatus: string
  isActive?: boolean
  dayRentalPrice: number
  carImage?: string
  onRent?: () => void
}
