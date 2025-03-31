import React, { useEffect, useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import { BookingsListProps } from "./types"
import Button from "components/Button/Button"
import { BookingProps } from "components/BookingComponent/types"
import axios from "axios"
import { useNavigate } from "react-router"

const BookingsListComponent: React.FC<BookingsListProps> = ({ bookings }) => {
  const navigate = useNavigate()

  const [bookingList, setBookingList] = useState<BookingProps[]>([])

  const handleEditBooking = (bookingId: number) => {
    console.log("Editing booking with ID:", bookingId)
    //edit page opens
    navigate("/edit-booking")
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
      {bookingList.map((booking, index) => (
        <div key={booking.id || index}>
          <BookingComponent
            rentalStartDate={booking.rentalStartDate}
            rentalEndDate={booking.rentalEndDate}
            carId={booking.carId}
            customerId={booking.customerId}
            // carBrand={booking.carBrand}
            // carModel={booking.carModel}
            bookingStatus={booking.bookingStatus}
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
                onClick={() => handleEditBooking(booking.id)}
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
      ))}
    </div>
  )
}

export default BookingsListComponent
