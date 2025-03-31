import Button from "components/Button/Button"
import EditCarForm from "components/EditCarForm/EditCarForm"
import { useNavigate } from "react-router-dom"

const EditBookingPage = () => {
  const navigate = useNavigate()
  
    // Handle close button click
    const handleClose = () => {
      navigate("/account")
    }
  
  return (
    <div className="flex flex-row">
    <EditCarForm/>
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

export default EditBookingPage