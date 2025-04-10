import React, { useEffect, useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import Button from "components/Button/Button"
import { BookingProps } from "components/BookingComponent/types"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  bookingActions,
  bookingSelectors,
} from "store/redux/BookingSlice/BookingSlice"
import { authSelectors } from "store/redux/AuthSlice/authSlice"

export interface BookingsListProps {}

const BookingsListComponent: React.FC<BookingsListProps> = () => {
  const user = useAppSelector(authSelectors.userData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(authSelectors.accessToken)

  useEffect(() => {
    dispatch(bookingActions.getBookingsByUser(token))
  }, [dispatch])

  useEffect(() => {
    dispatch(bookingActions.getAllBookings(token))
  }, [dispatch])

  const bookingsForUser = useAppSelector(
    bookingSelectors.selectBookingListByUser,
  )
  const bookingsForAdmin = useAppSelector(bookingSelectors.selectBookingList)

  const bookings =
    user?.role === "ROLE_ADMIN" ? bookingsForAdmin : bookingsForUser

  const handleEditBooking = (
    bookingId: string,
    bookingDetails: BookingProps,
  ) => {
    navigate(`/edit-booking/${bookingId}`, { state: { bookingDetails } })
  }

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
              customerDto={booking.customerDto}
              bookingStatus={booking.bookingStatus}
              totalPrice={booking.totalPrice}
              carDto={booking.carDto}
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
            </div>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  )
}

export default BookingsListComponent
