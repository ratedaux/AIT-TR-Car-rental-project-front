import Button from "components/Button/Button"
import { CarCardProps } from "components/CarCard/types"
import EditCarForm from "components/EditCarForm/EditCarForm"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {EditCarFormProps} from "components/EditCarForm/types"

 

const EditCarPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const carDetails = location.state as CarCardProps;
  const { id } = useParams();

  const handleClose = () => {
    navigate("/account")
    //decide correct path
  }

  return (
    <div className="flex flex-row">
      <EditCarForm car ={carDetails}/>
      {/* close button */}
      <div className="mt-6">
        <Button
          name="X"
          customClasses="!px-6 !py-6 !rounded-full font-semibold !bg-gray-400 hover:!bg-red-700 text-white"
          onClick={handleClose}
        />
      </div>
    </div>
  )
}

export default EditCarPage
