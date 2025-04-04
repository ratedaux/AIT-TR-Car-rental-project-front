import React, { useEffect, useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import { BookingsListProps } from "./types"
import Button from "components/Button/Button"
import { BookingProps } from "components/BookingComponent/types"
import { useNavigate } from "react-router"

const BookingsListComponent: React.FC<BookingsListProps> = ({ bookings }) => {
  const navigate = useNavigate()

  const handleEditBooking = (
    bookingId: string,
    bookingDetails: BookingProps,
  ) => {
    console.log("Editing booking with ID:", bookingId)
    navigate(`/edit-booking/${bookingId}`, { state: { bookingDetails } })
  }

  // const handleDeleteBooking = (bookingId: number) => {
  //   console.log("Deleting booking with ID:", bookingId)
  //   setBookingList(prevBookingList =>
  //     prevBookingList.filter(booking => booking.id !== bookingId),
  //   )
  //   alert("The car booking is deleted")
  // }

  return (
    <div>
       {bookings && bookings.length > 0 ? (
      bookings.map((booking, index) => (
        <div key={booking.id || index}>
          <BookingComponent
            rentalStartDate={booking.rentalStartDate}
            rentalEndDate={booking.rentalEndDate}
            carId={booking.carId}
            carStatus={booking.carStatus}
            customerId={booking.customerId}
            brand={booking.brand}
            model={booking.model}
            bookingStatus={booking.bookingStatus}
            totalPrice={booking.totalPrice}
            firstName={booking.firstName}
            lastName={booking.lastName}
            updateBookingDate={booking.updateBookingDate}
            createBookingDate={booking.createBookingDate}
            id={booking.id}
          />

          <div className="m-4 flex flex-row gap-4 justify-end">
            <div>
              <Button
                type="button"
                onClick={() => handleEditBooking(booking.id, booking)}
                name="Edit"
              />
            </div>
            {/* <div>
              <Button
                type="button"
                onClick={() => handleDeleteBooking(booking.id)} 
                name="Delete"
              />
            </div> */}
          </div>
        </div>
      ))
    ): (
        <p>No bookings available</p>
      )}
    </div>
  ) 
}

export default BookingsListComponent
