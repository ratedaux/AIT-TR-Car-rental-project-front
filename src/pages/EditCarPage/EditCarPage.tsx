import { CarCardProps } from "components/CarCard/types"
import EditCarForm from "components/EditCarForm/EditCarForm"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const EditCarPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const carDetails = location.state as CarCardProps
  const { id } = useParams()

  return (
    <div className="flex flex-row">
      <EditCarForm car={carDetails} />
    </div>
  )
}

export default EditCarPage
