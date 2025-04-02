import { BookingProps } from "components/BookingComponent/types"
import Button from "components/Button/Button"
import EditBookingDetailsForm from "components/EditBookingDetailsForm/EditBookingDetails"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const EditBookingPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const bookingDetails = location.state as BookingProps
  const { id } = useParams()

  return (
    <div className="flex flex-row">
      <EditBookingDetailsForm />
    </div>
  )
}

export default EditBookingPage
