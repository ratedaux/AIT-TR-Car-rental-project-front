import CarCard from "../CarCard/CarCard"
import { CarCardProps } from "../CarCard/types"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import { rentCarActions } from "store/redux/rentCarSlice/rentCarSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { useEffect } from "react"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"

interface CarListProps {
  cars: CarCardProps[]
}

function CarList({ cars }: CarListProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const accessToken = useAppSelector(authSelectors.accessToken)
    useEffect(() => {
      if (localStorage.getItem("accessToken"))
        dispatch(authActions.getCurrentUser())
    }, [accessToken])

  const handleEditCar = (carId: string, carDetails: CarCardProps) => {
    console.log("Edit car with Id:", carId)
    navigate(`/edit-car/${carId}`, { state: { carDetails } })
      }

  const handleDeleteCar = (carId: string) => {
    console.log("Delete car with Id:", carId)
    dispatch(rentCarActions.deleteCar(carId, accessToken))
  }

  const handleRestoreCar = (carId: string) => {
    console.log("Restore car with Id:", carId)
    dispatch(rentCarActions.restoreCar(carId,accessToken))
  }

  return (
    <div className="w-auto h-screen overflow-y-auto space-y-6 p-4">
      {cars && cars.length > 0 ? (
        cars.map(car => (
          <div key={car.id}>
            <CarCard
              image={car.image}
              brand={car.brand}
              model={car.model}
              carStatus={car.carStatus}
              dayRentalPrice={car.dayRentalPrice}
              transmissionType={car.transmissionType}
              year={car.year}
              fuelType={car.fuelType}
              id={car.id}
              type={""}
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
    </div>
  )
}

export default CarList
