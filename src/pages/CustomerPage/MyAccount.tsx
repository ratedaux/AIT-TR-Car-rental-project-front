import React, { useEffect, useState } from "react"
import Button from "components/Button/Button"
import { Outlet, useNavigate } from "react-router-dom"
import {
  bookingActions,
  bookingSelectors,
} from "store/redux/BookingSlice/BookingSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authSelectors } from "store/redux/AuthSlice/authSlice"
import { userSelectors } from "store/redux/UserSlice/UserSlise"

function CustomerPage() {
  const navigate = useNavigate()

  const handleRentButtonClick = () => {
    navigate("/")
  }

  // const [activeComponent, setActiveComponent] = useState("customerData")
  // const showCustomerData = () => setActiveComponent("customerData")
  // const showBookingsList = () => setActiveComponent("bookingsList")

  const showCustomerData = () => navigate("/account/myData")
  const showBookingsList = () => navigate("/account/myBookings")

  const user = useAppSelector(authSelectors.userData)
  // const bookingListByUserId = useAppSelector(
  //   bookingSelectors.selectBookingListByUser,
  // )

  // if (!user || !bookingListByUserId) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="flex flex-row w-auto bg-gray-100 justify-center rounded-lg">
      {/* левая часть с навигацией */}
      <div className="w-1/3 items-center m-4">
        <div className="flex flex-col w-auto p-3 rounded-lg rounded-br-lg m-4">
          <div className="bg-black text-white font-bold rounded-tl-lg rounded-tr-lg p-3 ">
            Hi, {user?.firstName}!
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
        <Outlet />
        {/* {activeComponent === "customerData" && (
          <CustomerComponent customer={user} />
        )}

        {activeComponent === "bookingsList" && (
          <BookingsListComponent bookings={bookingListByUserId} />
        )} */}
      </div>
    </div>
  )
}

export default CustomerPage
