import CarCard from "../CarCard/CarCard"
import { CarCardProps } from "../CarCard/types"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import {
  rentCarActions,
  rentCarSelectors,
} from "store/redux/rentCarSlice/rentCarSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { useEffect, useState } from "react"
import { authSelectors } from "store/redux/AuthSlice/authSlice"
import Notification1 from "components/Notification/Notification1"
import Loader from "components/Loader/Loader"

function CarList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cars = useAppSelector(rentCarSelectors.selectAllCars)
  const accessToken = useAppSelector(authSelectors.accessToken)

  const [localCars, setLocalCars] = useState<CarCardProps[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationTopic, setNotificationTopic] = useState("")
  const [loadingCars, setLoadingCars] = useState<Set<string>>(new Set()) 

  useEffect(() => {
    dispatch(rentCarActions.getAllCars())
  }, [dispatch])

  useEffect(() => {
    setLocalCars(cars)
  }, [cars])

  const handleEditCar = (carId: string, carDetails: CarCardProps) => {
    navigate(`/edit-car/${carId}`, { state: { carDetails } })
  }

  const handleDeleteCar = async (carId: string) => {
    try {
      setLoadingCars((prev) => new Set(prev).add(carId))
      await dispatch(
        rentCarActions.deleteCar({ carId, token: accessToken })
      ).unwrap()
      setNotificationTopic("Success")
      setNotificationMessage("The car is deleted")
      setShowNotification(true)

      setLocalCars((prev) =>
        prev.map((car) =>
          car.id === carId ? { ...car, isActive: false } : car
        )
      )
    } catch (error: any) {
      setNotificationTopic("Error")
      setNotificationMessage(error || "Failed to delete car")
      setShowNotification(true)
    } finally {
      setLoadingCars((prev) => {
        const newLoadingCars = new Set(prev)
        newLoadingCars.delete(carId) 
        return newLoadingCars
      })
    }
  }

  const handleRestoreCar = async (carId: string) => {
    try {
      setLoadingCars((prev) => new Set(prev).add(carId)) 
      await dispatch(
        rentCarActions.restoreCar({ carId, token: accessToken })
      ).unwrap()
      setNotificationTopic("Success")
      setNotificationMessage("The car is restored")
      setShowNotification(true)

      setLocalCars((prev) =>
        prev.map((car) =>
          car.id === carId ? { ...car, isActive: true } : car
        )
      )
    } catch (error: any) {
      setNotificationTopic("Error")
      setNotificationMessage(error || "Failed to restore car")
      setShowNotification(true)
    } finally {
      setLoadingCars((prev) => {
        const newLoadingCars = new Set(prev)
        newLoadingCars.delete(carId) 
        return newLoadingCars
      })
    }
  }

  return (
    <div className="w-auto h-screen overflow-y-auto space-y-6 p-4">
      {localCars && localCars.length > 0 ? (
        localCars.map((car) => (
          <div key={car.id} className="relative">
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
              <div>
                {car.carStatus !== "DELETED" && (
                  <Button
                    type="button"
                    onClick={() => handleEditCar(car.id, car)}
                    name="Edit"
                  />
                )}
              </div>
              <div className="relative"> 
                {loadingCars.has(car.id) && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Loader />
                  </div>
                )}
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
        <p>Loading...</p>
      )}

      {showNotification && (
        <Notification1
          topic={notificationTopic}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  )
}

export default CarList
