import Button from "components/Button/Button"
import EditCarForm from "components/EditCarForm/EditCarForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const EditBookingPage = () => {
  const navigate = useNavigate()
  
   // State to manage the visibility of the window
    // const [isVisible, setIsVisible] = useState(true)
  
    // Handle close button click
    const handleClose = () => {
      // setIsVisible(false) // Set visibility to false, effectively "closing" the window
      navigate("/account")
    }
  
    // if (!isVisible) {
    //   return null // If not visible, return nothing (effectively hiding the component)
    // }
  
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