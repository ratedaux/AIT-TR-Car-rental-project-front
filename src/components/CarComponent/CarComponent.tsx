import Button from "components/Button/Button";
import fuelIcon from "assets/CarImages/fuel-icon.png";
import transmissionIcon from "assets/CarImages/transmission-icon.png";
import yearIcon from "assets/CarImages/year-icon.png";
import euroIcon from "assets/CarImages/euro-icon.png";
import carIcon from "assets/CarImages/car-icon.jpg";
import { CarComponentProps } from "./types";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function CarComponent({ car }: CarComponentProps) {
  return (
    <div className="relative flex flex-col md:flex-row w-full max-w-4xl justify-center rounded-lg bg-white shadow-lg overflow-hidden">
      {/* Image Block */}
      <div className="md:w-2/3 flex flex-col justify-between p-4">
        <img
          src={car?.image}
          alt={car?.brand}
          className="rounded-lg w-full h-auto object-cover mb-2"
        />

        {/* Icons Block */}
        <div className="flex flex-row justify-center gap-2 w-full p-2 rounded-lg shadow-md bg-gray-50">
          <div className="flex flex-row items-center gap-1">
            <img src={fuelIcon} className="w-4 h-4" alt="Fuel" />
            <div className="text-xs text-gray-700">{capitalizeFirstLetter(car?.fuelType)}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={transmissionIcon} className="w-4 h-4" alt="Transmission" />
            <div className="text-xs text-gray-700">{capitalizeFirstLetter(car?.transmissionType)}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={yearIcon} className="w-4 h-4" alt="Year" />
            <div className="text-xs text-gray-700">{car?.year}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={euroIcon} className="w-4 h-4" alt="Price" />
            <div className="text-xs text-gray-700">{car?.dayRentalPrice}</div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <img src={carIcon} className="w-4 h-4" alt="Status" />
            <div className="text-xs text-gray-700">{capitalizeFirstLetter(car.carStatus)}</div>
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex flex-col md:w-1/3 p-4 gap-4">
        {/* Description Block */}
        <div className="bg-gray-100 p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-red-600">Description</h2>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Brand:</span>
              <span>{car?.brand}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Model:</span>
              <span>{car?.model}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Year:</span>
              <span>{car?.year}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Body type:</span>
              <span>{capitalizeFirstLetter(car?.type)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Fuel:</span>
              <span>{capitalizeFirstLetter(car?.fuelType)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Transmission:</span>
              <span>{capitalizeFirstLetter(car?.transmissionType)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Daily price:</span>
              <span>{car?.dayRentalPrice} €</span>
            </div>
          </div>
        </div>

        {/* Note Block */}
        <div className="bg-gray-100 p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Note</h2>
          <ul className="list-disc list-inside space-y-0.5 text-sm">
            <li>Pick up only at station!</li>
            <li>Payment at station!</li>
            <li>Bring license!</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button name="Rent" type="button" onClick={() => { }} />
          <Button name="Edit" type="button" onClick={() => { }} />
        </div>
      </div>
    </div>
  );
}

export default CarComponent;
