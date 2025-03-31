import { BookingProps } from "./types"

function BookingComponent({
  rentalStartDate,
  rentalEndDate,
  // carBrand,
  // carModel,
  carId,
  customerId,
  totalPrice,
  bookingStatus,
  // renterFirstName,
  // renterLastName,
  updateBookingDate,
  createBookingDate,
  id,
}: BookingProps) {
  return (
    <div className="m-4 rounded-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col w-auto ">
        <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
          Rent Details:
        </div>
        <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Car:</div>
            <div className="w-3/4">
              {carId}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Renter:</div>
            <div className="w-3/4">
              {customerId}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Price:</div>
            <div className="w-3/4">{totalPrice} €</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Status:</div>
            <div className="w-3/4">{bookingStatus}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Start Date:</div>
            <div className="w-3/4">{rentalStartDate}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">End Date:</div>
            <div className="w-3/4">{rentalEndDate}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Rent details updated on:</div>
            <div className="w-3/4">{updateBookingDate}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Rent created on:</div>
            <div className="w-3/4">{createBookingDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BookingComponent
