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
import Notification1 from "components/Notification/Notification1"
import Loader from "components/Loader/Loader"

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

  const canEditBooking = (status: string | undefined) => {
    return status === "ACTIVE" || status === "PENDING"
  }

  const canActivateBooking = (status: string | undefined) => {
    return status === "PENDING"
  }

  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationTopic, setNotificationTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [activeBookings, setActiveBookings] = useState<BookingProps[]>([]);
  useEffect(() => {
    setActiveBookings(bookings)
  }, [bookings])

  const handleActivateBooking = async (bookingId: string) => {
    try {
      setIsLoading(true)
      await dispatch(
        bookingActions.activateBooking({
          bookingId: bookingId,
          token: token,
        }),
      ).unwrap()
      setNotificationTopic("Success")
      setNotificationMessage("The booking is activated")
      setShowNotification(true)

        setActiveBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, isActive: true } : booking
        )
      ); 
      
    } catch (error: any) {
      setNotificationTopic("Error")
      setNotificationMessage(error || "Failed to activate booking")
      setShowNotification(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {activeBookings && activeBookings.length > 0 ? (
        activeBookings.map((booking, index) => (
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

            {/* <div className="m-4 flex flex-row gap-4 justify-end">
              <div>
                <Button
                  type="button"
                  onClick={() => handleEditBooking(booking.id, booking)}
                  name="Edit"
                />
              </div>
            </div> */}

            <div className="m-4 flex flex-row gap-4 justify-end">
              {canEditBooking(booking.bookingStatus) && (
                <div>
                  <Button
                    type="button"
                    onClick={() => handleEditBooking(booking.id, booking)}
                    name="Edit"
                  />
                </div>
              )}
              {canActivateBooking(booking.bookingStatus) && (
                <div>
                  <Button
                    type="button"
                    onClick={() => handleActivateBooking(booking.id)}
                    name="Activate"
                  />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      {isLoading && <Loader />}
      {showNotification && (
        <Notification1
          topic={notificationTopic}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  )
}

export default BookingsListComponent
