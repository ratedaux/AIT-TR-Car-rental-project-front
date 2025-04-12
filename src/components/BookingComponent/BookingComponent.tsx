import { BookingProps,CarDto, CustomerDto } from "./types"

// function capitalizeFirstLetter(string: string ) {
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }

const formatStatus = (status: string | undefined): string => {
  if (!status) return ""
  
  const formatted = status
    .replace(/_/g, " ") // заменяем подчёркивания на пробелы
    .toLowerCase()      // всё в нижний регистр
    .trim()

  return formatted.charAt(0).toUpperCase() + formatted.slice(1) // первая буква заглавная
}

const formatBookingDate = (date: string): string => {
  return date.replace('T', ' ').substring(0, 16);  
};

function BookingComponent({
  rentalStartDate,
  rentalEndDate,
  carId,
  customerId,
  totalPrice,
  bookingStatus,
  updateBookingDate,
  createBookingDate,
  id,
  carDto,
  customerDto
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
              {carDto?.brand} {carDto?.model}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Renter:</div>
            <div className="w-3/4">
              {customerDto?.firstName} {customerDto?.lastName}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Price:</div>
            <div className="w-3/4">{new Intl.NumberFormat('en-US').format(totalPrice || 0)} €</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Status:</div>
            <div className="w-3/4">{formatStatus(bookingStatus)}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Start Date:</div>
            <div className="w-3/4">{formatBookingDate(rentalStartDate)}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">End Date:</div>
            <div className="w-3/4">{formatBookingDate(rentalEndDate)}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Rent details updated on:</div>
            <div className="w-3/4">{formatBookingDate(updateBookingDate)}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/4 font-bold">Rent created on:</div>
            <div className="w-3/4">{formatBookingDate(createBookingDate)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BookingComponent
