import { BookingProps } from "components/BookingComponent/types"
import { ReactNode } from "react"

export interface BookingsListProps {
  children?: ReactNode
  bookings: BookingProps[]
}
