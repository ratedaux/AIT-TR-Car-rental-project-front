// import React, { useEffect, useState } from "react"
// import Button from "components/Button/Button"
// import BookingsListComponent from "components/BookingsList/BookingsListComponent"
// import CustomersList from "components/CustomersListComponent/CustomersList"
// import CarCard from "components/CarCard/CarCard"
// import AddNewCarForm from "components/AddNewCarForm/AddNewCarForm"
// import { CarCardProps } from "components/CarCard/types"
// import axios from "axios"
import { Outlet, useNavigate } from "react-router-dom"
// import { useAppSelector } from "store/hooks"
// import { bookingSelectors } from "store/redux/BookingSlice/BookingSlice"
// import { userSelectors } from "store/redux/UserSlice/UserSlise"
// import { rentCarActions, rentCarSelectors } from "store/redux/rentCarSlice/rentCarSlice";
// import CarList from "components/CarList/CarList"
// import {CarListProps} from "components/CarList/CarList"

// interface CarListProps {
//   cars: CarCardProps[]
// }

function AdminPage() {
  const navigate = useNavigate()

  // const [activeComponent, setActiveComponent] = useState("carsList")
  // const showCustomersList = () => setActiveComponent("customersList")
  // const showBookingsList = () => setActiveComponent("bookingsList")
  // const showCarsList = () => setActiveComponent("carsList")
  // const showAddNewCarForm = () => setActiveComponent("AddNewCarForm")

  const showCustomersList = () => navigate("/admin/allUsers")
  const showBookingsList = () => navigate("/admin/allBookings")
  const showCarsList = () => navigate("/admin/allCars")
  const showAddNewCarForm = () => navigate("/admin/newCar")


  // const handleEditCar = (carId: string, carDetails: CarCardProps) => {
  //   console.log("Edit car with Id:", carId)
  //   navigate(`/edit-car/${carId}`, { state: { carDetails } })
  // }

  // const handleDeleteCar = (carId: string) => {
  //   console.log("Delete car with Id:", carId)
  //       //TODO add dispatch
  // }
  
//TODO create car slice to get all cars for admin
  // const {cars} = useAppSelector(rentCarSelectors.carsData)
  // const customerList = useAppSelector(userSelectors.selectAllUsers)
  // const bookingList = useAppSelector(bookingSelectors.selectBookingList)

  return (
    <div className="flex flex-row w-auto bg-gray-100 justify-center rounded-lg">
      {/* left block  */}
      <div className="w-1/4  items-center m-6 ">
        {/* navigation */}
        <div className="flex flex-col w-auto  mt-4 ">
          <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
            Navigation:
          </div>
          <nav className="flex flex-col  bg-white p-3 gap-3 rounded-lg rounded-br-lg">
            <button
              onClick={showAddNewCarForm}
              className="text-black hover:text-red-700 text-lg text-left hover:underline  "
            >
              Add car
            </button>
            <button
              onClick={showCarsList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              Cars
            </button>
            <button
              onClick={showBookingsList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              Bookings
            </button>
            <button
              onClick={showCustomersList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              Customers
            </button>
          </nav>
        </div>
             </div>

      {/* right block with container for components */}
      <div className="flex flex-col w-3/4 m-6">

      <Outlet />
        {/* {activeComponent === "customersList" && (
          <CustomersList users={customerList} />
        )}
        {activeComponent === "bookingsList" && (
          <BookingsListComponent bookings={bookingList} />
        )}
        {activeComponent === "AddNewCarForm" && <AddNewCarForm />}
        {activeComponent === "carsList" && <CarList cars={cars}/>
        
        (          <div className="w-auto h-screen overflow-y-auto space-y-6 p-4">
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
                        onClick={() => handleDeleteCar(car.id)}
                        name="Delete"
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
        } */}
      </div>
    </div>
  )
}
export default AdminPage
