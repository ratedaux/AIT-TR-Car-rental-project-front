
import React, { useEffect, useState } from "react"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import BookingsListComponent from "components/BookingsList/BookingsListComponent/BookingsListComponent"
import CustomersList from "components/CustomersListComponent/CustomersList"

// import CarFilter from "components/CarFilter/CarFilter"
import CarCard from "components/CarCard/CarCard";
import AddNewCarForm from "components/AddNewCarForm/AddNewCarForm";
import { CarCardProps } from "components/CarCard/types";

// test image remove later
import CarImg from "assets/CarImages/corolla-exterieur.jpg";
import { log } from "console";
import axios from "axios";
import { useAppSelector } from "store/hooks";
import { bookingSelectors } from "store/redux/BookingSlice/BookingSlice";

// example booking data delete later
const bookingsList = [
  {
    rentalStartDate: "2025-04-02",
    rentalEndDate: "2025-04-04",
    // carBrand: "Toyota",
    // carModel: "Corolla",
    bookingStatus: "Active",
    totalPrice: 50,
    // renterFirstName: "Masha",
    // renterLastName: "Neshyna",
    updateBookingDate: "19.03.2025",
    createBookingDate: "18.03.2025",
    id: "1",
    carId: 1,
  customerId: 1
  },
  {
    rentalStartDate: " 2025-04-04",
    rentalEndDate: "2025-04-04",
    // carBrand: "Ford",
    // carModel: "Focus",
    bookingStatus: "Active",
    totalPrice: 55,
    // renterFirstName: "Anna",
    // renterLastName: "Smith",
    updateBookingDate: "23.03.2025",
    createBookingDate: "22.03.2025",
    id: "2",
    carId: 2,
  customerId: 2
  },
  {
    rentalStartDate: "2025-04-04",
    rentalEndDate: "2025-04-04",
    // carBrand: "Honda",
    // carModel: "Civic",
    bookingStatus: "Active",
    totalPrice: 60,
    // renterFirstName: "John",
    // renterLastName: "Doe",
    updateBookingDate: "21.03.2025",
    createBookingDate: "20.03.2025",
    id: "3",
    carId: 3,
  customerId: 3
  },
]

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

const carsList = [
  {
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    type: "Sedan",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    dayRentalPrice: 60,
    image: CarImg,
    id: "1",
    carStatus: "Available",
  },
  {
    brand: "BMW",
    model: "BMW",
    year: 2021,
    type: "Sedan",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    dayRentalPrice: 30,
    image: CarImg,
    id: "2",
    carStatus: "",
  },
  {
    brand: "Honda",
    model: "Honda",
    year: 2020,
    type: "Sedan",
    fuelType: "Gasoline",
    transmissionType: "Automatic",
    dayRentalPrice: 40,
    image: CarImg,
    id: "3",
    carStatus: "Not Available",
  },
]

interface CarListProps {
  cars: CarCardProps[]
}

function AdminPage() {

  const navigate = useNavigate()

  const [activeComponent, setActiveComponent] = useState("carsList")

  const showCustomersList = () => setActiveComponent("customersList")
  const showBookingsList = () => setActiveComponent("bookingsList")
  const showCarsList = () => setActiveComponent("carsList")
  const showAddNewCarForm = () => setActiveComponent("AddNewCarForm")

  const [carArray, setCarArray] = useState(carsList)
  // const [carArray, setCarArray] = useState<CarCardProps[]>([])
  //now tested with test data car list
  const [bookings, setBookings] = useState(bookingsList)
  useEffect(()=>{setBookings})
  //delete later

  async function fetchCars() {
    const response = await axios.get("/api/cars")
    setCarArray(response.data)
  }
  //add try catch
  useEffect(() => {
    fetchCars()
  }, [])

  const handleEditCar = (carId: string, carDetails: CarCardProps) => {
    console.log("Edit car with Id:", carId)
    navigate(`/edit-car/${carId}`, { state: { carDetails } })
  }

  const handleDeleteCar = (carId: string) => {
    console.log("Delete car with Id:", carId)
    setCarArray(prevCarArray => prevCarArray.filter(car => car.id !== carId))
    //TODO add dispatch
  }

  //const bookingList = useAppSelector(bookingSelectors.selectBookingList)


  //useEffect(() => {}, [bookingList])

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
        {/* <div>{activeComponent === "carsList" && <CarFilter />}</div> */}
      </div>


      {/* right block with container for components */}
      <div className="flex flex-col w-3/4 m-6">
        {activeComponent === "customersList" && <CustomersList />}

        {activeComponent === "bookingsList" && (
          <BookingsListComponent bookings={bookings} />
          //<BookingsListComponent bookings={bookingsList} />
        )}


          {activeComponent === "AddNewCarForm" && <AddNewCarForm />}


        {activeComponent === "carsList" && (
          <div className="w-auto h-screen overflow-y-auto space-y-6 p-4">
            {carArray && carArray.length > 0 ? (
              carArray.map(car => (
                <div key={car.id}>
                  <CarCard
                    image={car.image}
                    brand={car.brand}
                    model={car.model}
                    dayRentalPrice={car.dayRentalPrice}
                    transmissionType={car.transmissionType}
                    year={car.year}
                    fuelType={car.fuelType}
                    // onMoreDetails={() => {}}
                    // onRent={() => {}}
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
        )}
      </div>
    </div>
  )

}
export default AdminPage;
