export interface AddNewCarFormProps {
  brand: string
  model: string
  year: number
  type: string
  fuelType: string
  transmissionType: string
  dayRentalPrice: number
  image: File | string
  carImage?: string
  // carStatus: string
}
