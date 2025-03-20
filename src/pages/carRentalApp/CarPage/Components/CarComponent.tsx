import { CarProps } from "./types"
import Button from "components/Button/Button"
import fuelIcon from "../Images/fuel-icon.png"
import transmissionIcon from "../Images/transmission-icon.png"
import yearIcon from "../Images/year-icon.png"
import euroIcon from "../Images/euro-icon.png"

function CarComponent({
  brand,
  model,
  year,
  type,
  fuelType,
  transmissionType,
  carStatus,
  dayRentalPrice,
  carImage,
}: CarProps) {
  return (
    <div className="flex flex-col w-auto m-6 gap-6">
      <img
        src={carImage}
        alt={brand}
        className="rounded-lg w-auto object-cover"
      />

      <div className="flex flex-col w-auto ">
        <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
          Info:
        </div>
        <div className="flex flex-row gap-1 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
          <div className="flex flex-row items-center gap-1 ">
            <img src={fuelIcon} className="w-1/5" />
            <div className="w-5/6">{fuelType}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={transmissionIcon} className="w-1/5" />
            <div className="w-5/6">{transmissionType}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={yearIcon} className="w-1/5" />
            <div className="w-5/6">{year}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={euroIcon} className="w-1/5" />
            <div className="w-5/6">{dayRentalPrice}</div>
          </div>

        </div>
      </div>

      <div className="flex flex-col w-auto ">
        <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
          Description:
        </div>

        <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Brand:</div>
            <div className="w-5/6">{brand}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Model:</div>
            <div className="w-5/6">{model}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Year:</div>
            <div className="w-5/6">{year}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Body type:</div>
            <div className="w-5/6">{type}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Fuel:</div>
            <div className="w-5/6">{fuelType}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Transmission:</div>
            <div className="w-5/6">{transmissionType}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Status:</div>
            <div className="w-5/6">{carStatus}</div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/5 font-bold">Daily price:</div>
            <div className="w-5/6">{dayRentalPrice} €</div>
          </div>
        </div>
      </div>

      {/* <div className="w-auto">
        <Button name="Rent" type="button" onClick={() => {}} />
      </div> */}
    </div>
  )
}
export default CarComponent
