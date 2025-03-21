import React from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import { BookingsListProps } from "./types"

const BookingsListComponent: React.FC<BookingsListProps> = ({ bookings }) => {
  return (
    <div>
      {bookings.map((booking, index) => (
        <BookingComponent
          key={index}
          startDate={booking.startDate}
          endDate={booking.endDate}
          carBrand={booking.carBrand}
          carModel={booking.carModel}
          status={booking.status}
          price={booking.price}
          renterFirstName={booking.renterFirstName}
          renterLastName={booking.renterLastName}
          updateBookingDate={booking.updateBookingDate}
          createBookingDate={booking.createBookingDate}
        />
      ))}
    </div>
  )
}

export default BookingsListComponent
