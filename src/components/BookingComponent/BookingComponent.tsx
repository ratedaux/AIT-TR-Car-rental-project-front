import {BookingProps} from "./types"

function BookingComponent({
    startDate,
    endDate,
    carBrand,
    carModel,
    status,
    price,
    renterName,
    updateBookingDate,
    createBookingDate}:BookingProps
){
    return(
        <div className="m-6 rounded-lg">
              <div className="flex flex-col w-auto ">
              <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
            Rent Details:
          </div>
          <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Car:</div>
              <div className="w-3/4">{carBrand}{carModel}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Renter Name:</div>
              <div className="w-3/4">{renterName}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Price:</div>
              <div className="w-3/4">{price} €</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Status:</div>
              <div className="w-3/4">{status}
              {status ? "Active" : "Closed"}
              {/* {status === "active" ? "Active" : "Closed"} */}
              
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Start Date:</div>
              <div className="w-3/4">{startDate}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">End Date:</div>
              <div className="w-3/4">{endDate}</div>
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