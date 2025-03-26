import { CarProps } from "./types"
import Button from "components/Button/Button"
import fuelIcon from "assets/CarImages/fuel-icon.png"
import transmissionIcon from "assets/CarImages/transmission-icon.png"
import yearIcon from "assets/CarImages/year-icon.png"
import euroIcon from "assets/CarImages/euro-icon.png"
import carIcon from "assets/CarImages/car-icon.jpg"
import { useEffect, useState } from "react"
import axios from "axios"

function CarComponent() {
  // State to manage the visibility of the window
  const [isVisible, setIsVisible] = useState(true)

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false) // Set visibility to false, effectively "closing" the window
  }

  if (!isVisible) {
    return null // If not visible, return nothing (effectively hiding the component)
  }

  const [car, setCar] = useState<CarProps>()

  async function fetchCar() {
    const response = await axios.get("/api/cars/id/6")
    setCar(response.data)
  }
  
  useEffect(() => {
    fetchCar()
  }, [])

  return (
    <div className="flex flex-row w-auto justify-center rounded-lg ">
      {/* right block */}
      <div className="w-2/3 items-center">
        <div className="flex flex-col w-auto m-6 gap-6">
          <img
            src={car?.carImage}
            alt={car?.brand}
            className="rounded-lg w-auto object-cover"
          />

          <div className="flex flex-col w-auto ">
            <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
              Info:
            </div>

            <div className="flex flex-row gap-1 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
              <div className="flex flex-row items-center gap-1 ">
                <img src={fuelIcon} className="w-1/5" />
                <div className="w-5/6">{car?.fuelType}</div>
              </div>

              <div className="flex flex-row items-center gap-1">
                <img src={transmissionIcon} className="w-1/5" />
                <div className="w-5/6">{car?.transmissionType}</div>
              </div>

              <div className="flex flex-row items-center gap-1">
                <img src={yearIcon} className="w-1/5" />
                <div className="w-5/6">{car?.year}</div>
              </div>

              <div className="flex flex-row items-center gap-1">
                <img src={euroIcon} className="w-1/5" />
                <div className="w-5/6">{car?.dayRentalPrice}</div>
              </div>

              <div className="flex flex-row items-center gap-1">
                <img src={carIcon} className="w-1/3" />
                <div className="w-2/3">{car?.carStatus}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* left block */}
      <div className="flex flex-col w-1/3 m-6 gap-6">
        {/* description block */}
        <div className="flex flex-col w-auto ">
          <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
            Description:
          </div>
          <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Brand:</div>
              <div className="w-3/4">{car?.brand}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Model:</div>
              <div className="w-3/4">{car?.model}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Year:</div>
              <div className="w-3/4">{car?.year}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Body type:</div>
              <div className="w-3/4">{car?.type}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Fuel:</div>
              <div className="w-3/4">{car?.fuelType}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Transmission:</div>
              <div className="w-3/4">{car?.transmissionType}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Status:</div>
              <div className="w-3/4">{car?.carStatus}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/4 font-bold">Daily price:</div>
              <div className="w-3/4">{car?.dayRentalPrice} €</div>
            </div>
          </div>
        </div>

        {/* Note Block */}
        <div className="flex flex-col w-auto ">
          <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
            Note:
          </div>
          <div className="flex flex-col gap-1 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
            <p>You can pick up a car only at the pick up station! </p>
            <p>Payment possible only at the pick up station! </p>
            <p>Don't forget your driving license! </p>
          </div>
        </div>

        <div className="w-auto">
          <Button name="Rent" type="button" onClick={() => {}} />
        </div>

        {/* Edit car only for Admin */}
        <div className="w-auto">
          <Button name="Edit" type="button" onClick={() => {}} />
        </div>
      </div>

      {/* close button */}
      <div className="mt-6">
        <Button
          name="X"
          customClasses=" !px-6 !py-6 !rounded-full font-semibold !bg-gray-400 hover:!bg-red-700 text-white"
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
export default CarComponent
