import React, { useEffect, useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import BookingsListComponent from "components/BookingsList/BookingsListComponent/BookingsListComponent"
import CustomersList from "components/CustomersListComponent/CustomersList"
import CarFilter from "components/CarFilter/CarFilter"
import CarCard from "components/CarCard/CarCard"
import AddNewCarForm from "components/AddNewCarForm/AddNewCarForm"
import { CarCardProps } from "components/CarCard/types"

// test image remove later
import CarImg from "assets/CarImages/corolla-exterieur.jpg"
import { log } from "console"
import axios from "axios"


// example booking data delete later
// const bookingsList = [
//   {
//     startDate: "20.03.2025",
//     endDate: "21.03.2025",
//     carBrand: "Toyota",
//     carModel: "Corolla",
//     status: false,
//     totalRentCost: 50,
//     renterFirstName: "Masha",
//     renterLastName: "Neshyna",
//     updateBookingDate: "19.03.2025",
//     createBookingDate: "18.03.2025",
//     id: 1,
//   },
//   {
//     startDate: "24.03.2025",
//     endDate: "25.03.2025",
//     carBrand: "Ford",
//     carModel: "Focus",
//     status: true,
//     totalRentCost: 55,
//     renterFirstName: "Anna",
//     renterLastName: "Smith",
//     updateBookingDate: "23.03.2025",
//     createBookingDate: "22.03.2025",
//     id: 2,
//   },
//   {
//     startDate: "22.03.2025",
//     endDate: "23.03.2025",
//     carBrand: "Honda",
//     carModel: "Civic",
//     status: true,
//     totalRentCost: 60,
//     renterFirstName: "John",
//     renterLastName: "Doe",
//     updateBookingDate: "21.03.2025",
//     createBookingDate: "20.03.2025",
//     id: 3,
//   },
// ]

// const customersList = [
//   {
//     firstName: "Masha",
//     lastName: "Neshyna",
//     email: "test@email.com",
//     drivingLicense: "12345QWERTY",
//     bornDate: "11.11.1111",
//   },
//   {
//     firstName: "Lena",
//     lastName: "Lena",
//     email: "test@email.com",
//     drivingLicense: "12345QWERTY",
//     bornDate: "22.33.4444",
//   },
//   {
//     firstName: "Nastia",
//     lastName: "Nastia",
//     email: "test@email.com",
//     drivingLicense: "12345QWERTY",
//     bornDate: "55.66.7777",
//   },
// ]

// const carsList = [
//   {
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2022,
//     type: "Sedan",
//     fuelType: "Gasoline",
//     transmissionType: "Automatic",
//     dayRentalPrice: 60,
//     carImage: CarImg,
//     onMoreDetails: () => {},
//     onRent: () => {},
//     id: 1,
//   },
//   {
//     brand: "BMW",
//     model: "BMW",
//     year: 2021,
//     type: "Sedan",
//     fuelType: "Gasoline",
//     transmissionType: "Automatic",
//     dayRentalPrice: 30,
//     carImage: CarImg,
//     onMoreDetails: () => {},
//     onRent: () => {},
//     id: 2,
//   },
//   {
//     brand: "Honda",
//     model: "Honda",
//     year: 2020,
//     type: "Sedan",
//     fuelType: "Gasoline",
//     transmissionType: "Automatic",
//     dayRentalPrice: 40,
//     carImage: CarImg,
//     onMoreDetails: () => {},
//     onRent: () => {},
//     id: 3,
//   },
// ]

interface CarListProps {
  cars: CarCardProps[];
}

function AdminPage() {
  const navigate = useNavigate() 
  
  const [activeComponent, setActiveComponent] = useState("carsList") // Состояние для выбора компонента

  // Функции для отображения компонентов
  const showCustomersList = () => setActiveComponent("customersList")
  const showBookingsList = () => setActiveComponent("bookingsList")
  const showCarsList = () => setActiveComponent("carsList")
  const showAddNewCarForm = () => setActiveComponent("AddNewCarForm")
  
  //const [carArray, setCarArray] = useState(carsList)
  const [carArray, setCarArray] = useState<CarCardProps[]>([])

async function fetchCars(){
  const response = await axios.get("/api/cars");
  setCarArray(response.data);
}
//add try catch
useEffect(() => {
        fetchCars();
    }, []);
    

  const handleEditCar = (carId: number) => {
    console.log("Edit car with Id:", carId)
  }

  const handleDeleteCar = (carId: number) => {
    console.log("Delete car with Id:", carId)
    setCarArray(prevCarArray => prevCarArray.filter(car => car.id !== carId))
  }

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
        {/* filter in case of carsList */}
        <div>{activeComponent === "carsList" && <CarFilter />}</div>
      </div>

      {/* right block with container for components */}
      <div className="flex flex-col w-3/4 m-6">
        {activeComponent === "customersList" && (
          <CustomersList />
        )}

        {activeComponent === "bookingsList" && (
          <BookingsListComponent  />
        )}

        {activeComponent === "AddNewCarForm" && <AddNewCarForm />}

        {activeComponent === "carsList" && (
          <div className="w-auto h-screen overflow-y-auto space-y-6 p-4">
            {carArray && carArray.length > 0 ? (
              carArray.map((car) => (
              <div key={car.id}>
                <CarCard
                    carImage={car.carImage}
                    brand={car.brand}
                    model={car.model}
                    dayRentalPrice={car.dayRentalPrice}
                    transmissionType={car.transmissionType}
                    year={car.year}
                    fuelType={car.fuelType}
                    onMoreDetails={() => { } }
                    onRent={() => { } }
                    id={car.id} type={""}                />

                <div className="m-4 flex flex-row gap-4 justify-end">
                  <div className="">
                    <Button
                      type="button"
                      onClick={() => handleEditCar(car.id)}
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
              ) :  (
                 <p>No cars available</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminPage
