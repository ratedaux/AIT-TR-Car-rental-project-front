export interface CarCardProps {
  image: string
  brand: string
  model: string
  pricePerDay: number
  transmission: string
  year: number
  fuel: string
  onMoreDetails: () => void
  onRent: () => void
}
