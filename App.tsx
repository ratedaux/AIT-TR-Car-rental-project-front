import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { authActions, authSelectors } from "store/redux/AuthSlice/authSlice"
import EditUserPage from "pages/EditUserPage/EditUserPage"


const App = () => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(authSelectors.accessToken)
  useEffect(() => {
    if (localStorage.getItem("accessToken"))
      dispatch(authActions.getCurrentUser())
  }, [accessToken])
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/registration" element={<UserRegistrationForm />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/edit-booking/:id" element={<EditBookingPage />} />
          <Route path="/edit-car/:id" element={<EditCarPage/>}/>
          <Route path="/rent-car/:id" element={<RentCarPage/>}/>
          <Route path="/edit-user/:id" element={<EditUserPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
