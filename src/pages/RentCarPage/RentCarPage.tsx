import { CarCardProps } from "components/CarCard/types"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BookingForm from "components/BookingForm/BookingForm"

const RentCarPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const carDetails = location.state as CarCardProps
  const { id } = useParams()

  return (
    <div className="flex flex-row">
      <BookingForm car={carDetails} />
    </div>
  )
}

export default RentCarPage
