import Button from "components/Button/Button";
import fuelIcon from "assets/CarImages/fuel-icon.png";
import transmissionIcon from "assets/CarImages/transmission-icon.png";
import yearIcon from "assets/CarImages/year-icon.png";
import euroIcon from "assets/CarImages/euro-icon.png";
import carIcon from "assets/CarImages/car-icon.jpg";
import { CarComponentProps } from "./types";
import { useNavigate } from "react-router-dom";
import { CarCardProps } from "components/CarCard/types";
import { useSelector } from "react-redux";
import { authSelectors } from "store/redux/AuthSlice/authSlice";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import LoginNotification from "components/LoginNotification/LoginNotification";


function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function CarComponent({ car }: CarComponentProps) {
  const navigate = useNavigate();
  const user = useSelector(authSelectors.userData);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const [showLoginNotification, setshowLoginNotification] = useState(false);

  const handleEditCar = (carId: string, carDetails: CarCardProps) => {
    console.log("Edit car with Id:", carId);
    navigate(`/edit-car/${carId}`, { state: { carDetails } });
  };

  const handleRentCar = () => {
    navigate(`/rent-car/${car.id}`, { state: { car } });
  };

  const handleRentClick = () => {
    if (!isLoggedIn) {
      setshowLoginNotification(true);
    } else {
      handleRentCar();
    }
  };

  const handleCloseLoginNotification = () => {
    setshowLoginNotification(false);
  };

  const handleLoginSuccess = () => {
    setshowLoginNotification(false);
    handleRentCar();  // Продолжить аренду после успешного входа

  };

  useEffect(() => {
    if (isLoggedIn && showLoginNotification) {
      setshowLoginNotification(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="relative flex flex-col md:flex-row w-full max-w-7xl justify-center rounded-lg bg-white shadow-lg overflow-hidden">
      {/* Image Block */}
      <div className="md:w-2/3 flex flex-col justify-between p-4">
        <img
          src={car?.carImage}
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
        <div className="bg-gray-100 p-3 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-red-600">Description</h2>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
              <span className="font-semibold mb-1 sm:mb-0">Brand:</span>
              <span className="break-words">{car?.brand}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
              <span className="font-semibold mb-1 sm:mb-0">Model:</span>
              <span className="break-words">{car?.model}</span>
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
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm flex-wrap">
              <span className="font-semibold mb-1 sm:mb-0">Transmission:</span>
              <span className="break-words">{capitalizeFirstLetter(car?.transmissionType)}</span>
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
        {user?.role !== "ROLE_ADMIN" && (
          <div className="flex gap-2 flex-wrap">
            <Button name="Rent" type="button" onClick={handleRentClick} />
          </div>)}

        {showLoginNotification &&
          ReactDOM.createPortal(
            <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 backdrop-blur-sm z-50">
              <div className="relative bg-white rounded-lg p-6 shadow-lg max-w-3xl mx-4 my-8">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={handleCloseLoginNotification}
                >
                  ✖
                </button>
                <LoginNotification onLoginSuccess={handleLoginSuccess}
                />
                {/* <LoginNotification carId={id} onLoginSuccess={handleCloseLoginNotification}  /> */}
              </div>
            </div>,
            document.body,
          )}

        {/* Edit car only for Admin */}
        {user?.role === "ROLE_ADMIN" && (
          <div className="w-auto">
            <Button name="Edit" type="button" onClick={() => handleEditCar(car.id, car)} />
          </div>)}
      </div>
    </div>
  );
}

export default CarComponent;