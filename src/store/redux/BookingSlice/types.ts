export interface BookingSliceState {
  bookingList: BookingData[]
  bookingListByUserId: BookingData[]
  bookingData: BookingData
  error?: string
  status: "default" | "loading" | "success" | "error"
}

export interface BookingData {
  rentalStartDate: string
  rentalEndDate: string
  carId: string
  customerId: string
  bookingStatus: string
  totalPrice: number
  updateBookingDate: string
  createBookingDate: string
  id: string
}
