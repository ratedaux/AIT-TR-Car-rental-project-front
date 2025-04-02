import React, { useEffect, useState } from "react"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import BookingsListComponent from "components/BookingsList/BookingsListComponent/BookingsListComponent"
import { BookingsListProps } from "components/BookingsList/BookingsListComponent/types"
import { bookingActions, bookingSelectors } from "store/redux/BookingSlice/BookingSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"


// example booking data delete later
// const bookingData = [
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

// const customerData = {
//   firstName: "Masha",
//   lastName: "Neshyna",
//   email: "test@email.com",
//   drivingLicense: "12345QWERTY",
//   bornDate: "11.11.1111",
// }

const testCustomer = {
  firstName: "Masha",
  lastName: "Masha",
  email: "test@email.com",
  password: "1113456781",
  id:"67",
  role:"Customer",
  isActive: true
}

// const bookingsListComponent = {}

 const userId = ()=>{}

function CustomerPage() {
  const navigate = useNavigate() 
  const dispatch = useAppDispatch()
   
  const handleRentButtonClick = () => {
    navigate("/") 
  }

  const [activeComponent, setActiveComponent] = useState("customerData")

  const showCustomerData = () => setActiveComponent("customerData")
  const showBookingsList = () => setActiveComponent("bookingsList")

  //const [customer, setCustomer] = useState<CustomerProps>()
  const [bookings, setBookings] = useState<BookingsListProps>()

  const [customer, setCustomer] = useState(testCustomer)
  //this is for test delete later
 

  // async function fetchCustomer() {
  //   const response = await axios.get("/api/customers/6")
  //   setCustomer(response.data)
  // }

  // useEffect(() => {
  //   fetchCustomer()
  // }, [])



  const bookingListByUserId = useAppSelector(bookingSelectors.selectBookingListByUser)

  useEffect(() => {}
  , [bookingListByUserId]);

 
  return (
    <div className="flex flex-row w-auto bg-gray-100 justify-center rounded-lg">
      {/* левая часть с навигацией */}
      <div className="w-1/3 items-center m-4">
        <div className="flex flex-col w-auto p-3 rounded-lg rounded-br-lg m-4">
          <div className="bg-black text-white font-bold rounded-tl-lg rounded-tr-lg p-3 ">
            Hi, {customer?.firstName}!
          </div>
          <div className="flex flex-col gap-2 w-auto p-3 bg-white ">
            <p className="text-lg"> What's up? </p>
            <p className="text-lg">Do you want to rent a car?</p>
          </div>

          <div>
            {/* Кнопка для перехода */}
            <Button name="Rent" onClick={handleRentButtonClick} />
          </div>
        </div>

        {/* Навигация */}
        <div className="flex flex-col w-auto p-3 m-4">
          <div className="bg-black text-white font-bold mt-1 rounded-tl-lg rounded-tr-lg p-3 ">
            Navigation:
          </div>
          <nav className="flex flex-col space-x-6 bg-white p-3 gap-3 rounded-lg rounded-br-lg">
            {/* Кнопки стилизованные как ссылки */}
            <button
              onClick={showCustomerData}
              className="text-black hover:text-red-700 text-lg text-left hover:underline  "
            >
              Customer Data
            </button>
            <button
              onClick={showBookingsList}
              className="text-black hover:text-red-700 text-lg text-left hover:underline "
            >
              My Bookings
            </button>
          </nav>
        </div>
      </div>

      {/* правая часть с компонентами */}
      <div className="flex flex-col w-2/3 m-6 gap-6">
        {activeComponent === "customerData" && (
          <CustomerComponent 
          customer={customer}
            // firstName={customer?.firstName}
            // lastName={customer?.lastName}
            // email={customer?.email}
            // id={customer?.id}
            // password={customer?.password}
          />
        )}

        {activeComponent === "bookingsList" && (
          <BookingsListComponent bookings={bookingListByUserId} />
        )}
      </div>
    </div>
  )
}

export default CustomerPage
