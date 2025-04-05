import { CarCardProps } from "components/CarCard/types"

export interface RentFormValues {
  rentalStartDate: string
  rentalEndDate: string
  totalPrice?: number
  is18?: boolean
  newEndDate?: string
}

export interface BookingFormProps {
  car: CarCardProps
}
