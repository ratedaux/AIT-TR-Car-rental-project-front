import CarCard from "../CarCard/CarCard";
import { CarCardProps } from "../CarCard/types";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  rentCarActions,
  rentCarSelectors,
} from "store/redux/rentCarSlice/rentCarSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useEffect, useState } from "react";
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice";
import Notification1 from "components/Notification/Notification1";
import Loader from "components/Loader/Loader";


function CarList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cars = useAppSelector(rentCarSelectors.selectAllCars);
  const accessToken = useAppSelector(authSelectors.accessToken);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTopic, setNotificationTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(rentCarActions.getAllCars());
  }, [dispatch]);


  const handleEditCar = (carId: string, carDetails: CarCardProps) => {
    navigate(`/edit-car/${carId}`, { state: { carDetails } });
  };

  // const handleDeleteCar = (carId: string, accessToken: string | null) => {
  //   dispatch(rentCarActions.deleteCar({ carId, token: accessToken }));
  //   // alert("The car is deleted");
  //   setNotificationTopic("Success");
  //   setNotificationMessage("The car is deleted");
  //   setShowNotification(true);
  // };

  const handleDeleteCar = async (carId: string) => {
    try {
      setIsLoading(true);
      await dispatch(rentCarActions.deleteCar({ carId, token: accessToken }));
      setNotificationTopic("Success");
      setNotificationMessage("The car is deleted");
      setShowNotification(true);
    } catch (error) {
      setNotificationTopic("Error");
      setNotificationMessage("Failed to delete car");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleRestoreCar = (carId: string, accessToken: string | null) => {
  //   dispatch(rentCarActions.restoreCar({ carId, token: accessToken }));
  //   // alert("The car is restored");
  //   setNotificationTopic("Success");
  //   setNotificationMessage("The car is restored");
  //   setShowNotification(true);
  // };

  const handleRestoreCar = async (carId: string) => {
    try {
      setIsLoading(true);
      await dispatch(rentCarActions.restoreCar({ carId, token: accessToken }));
      setNotificationTopic("Success");
      setNotificationMessage("The car is restored");
      setShowNotification(true);
    } catch (error) {
      setNotificationTopic("Error");
      setNotificationMessage("Failed to restore car");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-auto h-screen overflow-y-auto space-y-6 p-4">
      {cars && cars.length > 0 ? (
        cars.map(car => (
          <div key={car.id}>
            <CarCard
              carImage={car.carImage}
              brand={car.brand}
              model={car.model}
              carStatus={car.carStatus}
              dayRentalPrice={car.dayRentalPrice}
              transmissionType={car.transmissionType}
              year={car.year}
              fuelType={car.fuelType}
              id={car.id}
              type={car.type}
            />

            <div className="m-4 flex flex-row gap-4 justify-end">
              <div className="">
                <Button
                  type="button"
                  onClick={() => handleEditCar(car.id, car)}
                  name="Edit"
                />
              </div>
              <div>
                <Button
                  type="button"
                  customClasses="!rounded-lg !bg-gray-400 hover:!bg-red-700 text-white"
                  onClick={() =>
                    car.isActive
                      ? handleDeleteCar(car.id)
                      : handleRestoreCar(car.id)
                  }
                  name={car.isActive ? "Delete" : "Restore"}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No cars available</p>
      )}
      {isLoading && <Loader />}
      {showNotification && (
        <Notification1
          topic={notificationTopic}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default CarList;
