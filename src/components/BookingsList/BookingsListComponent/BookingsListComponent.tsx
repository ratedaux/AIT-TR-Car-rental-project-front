import React, { useEffect, useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import { BookingsListProps } from "./types"
import Button from "components/Button/Button"
import { BookingProps } from "components/BookingComponent/types"
import axios from "axios"

function BookingsListComponent() {
  const [bookingList, setBookingList] = useState<BookingProps[]>([])

  const handleEditBooking = (bookingId: number) => {
    console.log("Editing booking with ID:", bookingId)
  }

  const handleDeleteBooking = (bookingId: number) => {
    console.log("Deleting booking with ID:", bookingId)

    setBookingList(prevBookingList =>
      prevBookingList.filter(booking => booking.id !== bookingId),
    )
  }

  async function fetchBookings() {
    const response = await axios.get("/api/bookings/all")
    setBookingList(response.data)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div>
      {bookingList.map((booking, index) => (
        <div key={booking.id || index}>
          <BookingComponent
            rentalStartDate={booking.rentalStartDate}
            rentalEndDate={booking.rentalEndDate}
            // carBrand={booking.carBrand}
            // carModel={booking.carModel}
            carStatus={booking.carStatus}
            totalPrice={booking.totalPrice}
            // renterFirstName={booking.renterFirstName}
            // renterLastName={booking.renterLastName}
            updateBookingDate={booking.updateBookingDate}
            createBookingDate={booking.createBookingDate}
            id={booking.id}
          />

          <div className="m-4 flex flex-row gap-4 justify-end">
            <div>
              <Button
                type="button"
                onClick={() => handleEditBooking(booking.id)} // Передаем ID для редактирования
                name="Edit"
              />
            </div>
            <div>
              <Button
                type="button"
                onClick={() => handleDeleteBooking(booking.id)} // Передаем ID для удаления
                name="Delete"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingsListComponent
