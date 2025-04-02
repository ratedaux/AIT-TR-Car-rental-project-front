import { CustomerProps } from "components/CustomerComponent/types"
import EditUserForm from "components/EditUserForm/EditUserForm"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const EditCarPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const userData = location.state as CustomerProps
  const { id } = useParams()

  return (
    <div className="flex flex-row">
      <EditUserForm customer={userData}/>
    </div>
  )
}

export default EditCarPage
