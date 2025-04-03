import { CarCardProps } from "components/CarCard/types"

export interface RentFormValues {
  rentalStartDate: string
  rentalEndDate: string
  totalPrice: number
  is18?: boolean
}

export interface BookingFormProps {
  car: CarCardProps
}
