import React, { useState } from "react"
import BookingComponent from "components/BookingComponent/BookingComponent"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import Button from "components/Button/Button"
import { useNavigate } from "react-router-dom"
import BookingsListComponent from "components/BookingsList/BookingsListComponent/BookingsListComponent"

// example booking data delete later
const bookingData = [
  {
    startDate: "20.03.2025",
    endDate: "21.03.2025",
    carBrand: "Toyota",
    carModel: "Corolla",
    status: false,
    price: 50,
    renterFirstName: "Masha",
    renterLastName: "Neshyna",
    updateBookingDate: "19.03.2025",
    createBookingDate: "18.03.2025",
  },
  {
    startDate: "24.03.2025",
    endDate: "25.03.2025",
    carBrand: "Ford",
    carModel: "Focus",
    status: true,
    price: 55,
    renterFirstName: "Anna",
    renterLastName: "Smith",
    updateBookingDate: "23.03.2025",
    createBookingDate: "22.03.2025",
  },
  {
    startDate: "22.03.2025",
    endDate: "23.03.2025",
    carBrand: "Honda",
    carModel: "Civic",
    status: true,
    price: 60,
    renterFirstName: "John",
    renterLastName: "Doe",
    updateBookingDate: "21.03.2025",
    createBookingDate: "20.03.2025",
  },
]

const customerData = {
  firstName: "Masha",
  lastName: "Neshyna",
  email: "test@email.com",
  drivingLicense: "12345QWERTY",
  bornDate: "11.11.1111",
}

const bookingsListComponent = {}

function CustomerPage() {
  const navigate = useNavigate() // Use useNavigate hook to programmatically navigate

  // Handle Rent button click
  const handleRentButtonClick = () => {
    navigate("/") // Replace '/rent' with the actual route you want to navigate to
  }

  const [activeComponent, setActiveComponent] = useState("customerData") // Состояние для выбора компонента

  // Функции для отображения компонентов
  const showCustomerData = () => setActiveComponent("customerData")
  const showBookingsList = () => setActiveComponent("bookingsList")

  return (
    <div className="flex flex-row w-auto bg-gray-100 justify-center rounded-lg">
      {/* левая часть с навигацией */}
      <div className="w-1/3 items-center m-6">
        <div className="flex flex-col w-auto p-3 rounded-lg rounded-br-lg m-4">
          <div className="bg-black text-white font-bold rounded-tl-lg rounded-tr-lg p-3 ">
            Hi, {customerData.firstName}!
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
        {/* Отображаем компонент в зависимости от состояния */}
        {activeComponent === "customerData" && (
          <CustomerComponent
            firstName={customerData.firstName}
            lastName={customerData.lastName}
            email={customerData.email}
            drivingLicense={customerData.drivingLicense}
            bornDate={customerData.bornDate}
          />
        )}

        {activeComponent === "bookingsList" && (
          <BookingsListComponent bookings={bookingData} />
        )}
      </div>
    </div>
  )
}

export default CustomerPage
