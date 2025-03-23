import React, { useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import { BookingsListProps } from "./types"
import Button from "components/Button/Button"
import { BookingProps } from "components/BookingComponent/types"

const BookingsListComponent: React.FC<BookingsListProps> = ({ bookings }) => {
  const [bookingList, setBookingList] = useState<BookingProps[]>(bookings)

  const handleEditBooking = (bookingId: number) => {
    console.log("Editing booking with ID:", bookingId)
  }

  const handleDeleteBooking = (bookingId: number) => {
    console.log("Deleting booking with ID:", bookingId)

    setBookingList(prevBookingList =>
      prevBookingList.filter(booking => booking.id !== bookingId),
    )

    //   // Пример вызова API для удаления (например, через fetch или axios)
    // fetch(`/api/bookings/${bookingId}`, {
    //   method: "DELETE",
    // })
    //   .then(response => response.json())
    //   .then(() => {
    //     // Если удаление прошло успешно, обновляем список
    //     setBookingList(prevBookingList.filter((booking) => booking.id !== bookingId));
    //   })
    //   .catch(error => console.error("Error deleting booking:", error));
  }

  return (
    <div>
      {bookingList.map((booking, index) => (
        <div key={booking.id || index}>
          <BookingComponent
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
            id={booking.id}
          />

          <div className="m-4 flex flex-row gap-4 justify-end">
            <div className="">
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
