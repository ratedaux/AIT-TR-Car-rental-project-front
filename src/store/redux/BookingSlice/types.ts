export interface BookingSliceState{
    bookingList: []
    bookingListByUserId:[]
    bookingData: BookingData
    error?: string
    status:"default" | "loading" | "success" | "error"
}


export interface BookingData {
  rentalStartDate: string
  rentalEndDate: string
  carStatus: string
  totalPrice: number
  updateBookingDate: string
  createBookingDate: string
  id: string
}
