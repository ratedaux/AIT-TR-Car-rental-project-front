import { BookingProps } from "components/BookingComponent/types"
import Button from "components/Button/Button"
import EditBookingDetailsForm from "components/EditBookingDetailsForm/EditBookingDetails"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const EditBookingPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const bookingDetails = location.state as BookingProps
  const { id } = useParams()

  
    // Handle close button click
    // const handleClose = () => {
    //   navigate("/account")
    // }
  
  return (
    <div className="flex flex-row">
    <EditBookingDetailsForm/>
      {/* close button */}
      {/* <div className="mt-6">
        <Button
          name="X"
          customClasses="!px-6 !py-6 !rounded-full font-semibold !bg-gray-400 hover:!bg-red-700 text-white"
          onClick={handleClose}
        />
      </div> */}
     </div>
  )
}

export default EditBookingPage