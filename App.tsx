import { HashRouter, Routes, Route } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./src/styles/globalStyle.css"
import Layout from "pages/Layout/Layout"
import Home from "pages/Home/Home"
import Login from "components/Login/Login"
import UserRegistrationForm from "components/UserRegistrationForm/UserRegistrationForm"
import MyAccount from "pages/CustomerPage/MyAccount"
import NotFoundPage from "components/NotFoundPage/NotFoundPage"
import AdminPage from "pages/AdminPage/AdminPage"
import EditCarPage from "pages/EditCarPage/EditCarPage"
import RentCarPage from "pages/RentCarPage/RentCarPage"
import EditBookingPage from "pages/EditBoookingPage/EditBookingPage"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"
import EditUserPage from "pages/EditUserPage/EditUserPage"
import LoginPage from "pages/LoginPage/LoginPage"
import CustomerComponent from "components/CustomerComponent/CustomerComponent"
import BookingsListComponent from "components/BookingsList/BookingsListComponent"
import CustomerListComponent from "components/CustomersListComponent/CustomersList"
import CarList from "components/CarList/CarList"
import AddNewCarForm from "components/AddNewCarForm/AddNewCarForm"
import { bookingActions, bookingSelectors } from "store/redux/BookingSlice/BookingSlice"
import { userActions, userSelectors } from "store/redux/UserSlice/UserSlise"
import {
  rentCarSelectors,
  rentCarActions,
} from "store/redux/rentCarSlice/rentCarSlice"
import EmailConfirmation from "components/EmailConfirmation/EmailConfirmation"
import EmailConfirmationPage from "pages/EmailConfirmation/EmailConfirmation"

const App = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(authSelectors.accessToken)
  useEffect(() => {
    if (localStorage.getItem("accessToken"))
      dispatch(authActions.getCurrentUser())
  }, [accessToken])

  //for My Account page
  const user = useAppSelector(authSelectors.userData)
    const bookingListByUser = useAppSelector(
    bookingSelectors.selectBookingListByUser,
  )

  useEffect(() => {
    dispatch(bookingActions.getBookingsByUser(accessToken))
  }, [dispatch])

   //for admin page
  const cars = useAppSelector(rentCarSelectors.selectAllCars)
  const customerList = useAppSelector(userSelectors.selectAllUsers)
  const bookingList = useAppSelector(bookingSelectors.selectBookingList)

  useEffect(() => {
    dispatch(rentCarActions.getAllCars())
  }, [dispatch])

  useEffect(() => {
    dispatch(bookingActions.getAllBookings(accessToken))
  }, [dispatch])

  useEffect(() => {
    dispatch(userActions.getAllUsers(accessToken))
  }, [dispatch])

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/login/registration"
            element={<UserRegistrationForm />}
          />
          <Route path="/account" element={<MyAccount />}>
            <Route
              path="/account/myData"
              element={<CustomerComponent customer={user} />}
            />
            <Route
              path="/account/myBookings"
              element={<BookingsListComponent bookings={bookingListByUser} />}
            />
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route
              path="/admin/allUsers"
              element={<CustomerListComponent users={customerList} />}
            />
            <Route
              path="/admin/allBookings"
              element={<BookingsListComponent bookings={bookingList} />}
            />
            <Route path="/admin/allCars" element={<CarList cars={cars} />} />
            <Route path="/admin/newCar" element={<AddNewCarForm />} />
          </Route>
          <Route path="/edit-booking/:id" element={<EditBookingPage />} />
          <Route path="/edit-car/:id" element={<EditCarPage />} />
          <Route path="/confirm-email/:token" element={<EmailConfirmation />} />
          <Route path="/rent-car/:id" element={<RentCarPage />} />
          <Route path="/edit-user/:id" element={<EditUserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
