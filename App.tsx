import { HashRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./src/styles/globalStyle.css";
import Layout from "pages/Layout/Layout";
import Home from "pages/Home/Home";
import UserRegistrationForm from "components/UserRegistrationForm/UserRegistrationForm";
import MyAccount from "pages/CustomerPage/MyAccount";
import NotFoundPage from "components/NotFoundPage/NotFoundPage";
import AdminPage from "pages/AdminPage/AdminPage";
import EditCarPage from "pages/EditCarPage/EditCarPage";
import RentCarPage from "pages/RentCarPage/RentCarPage";
import EditBookingPage from "pages/EditBoookingPage/EditBookingPage";
import EditUserPage from "pages/EditUserPage/EditUserPage";
import LoginPage from "pages/LoginPage/LoginPage";
import BookingsListComponent from "components/BookingsList/BookingsListComponent";
import CustomerListComponent from "components/CustomersListComponent/CustomersList";
import CarList from "components/CarList/CarList";
import AddNewCarForm from "components/AddNewCarForm/AddNewCarForm";
import EmailConfirmation from "components/EmailConfirmation/EmailConfirmation";
import CustomerContainer from "components/CustomerContainer/CustomerContainer";
import AboutUs from "pages/AboutUs/AboutUs";


const App = () => {

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/login/registration"
            element={<UserRegistrationForm />}
          />
          <Route path="/account" element={<MyAccount />}>
            <Route
              path="/account/myData"
              element={<CustomerContainer />}
            />
            <Route
              path="/account/myBookings"
              element={<BookingsListComponent />}
            />
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route
              path="/admin/allUsers"
              element={<CustomerListComponent />}
            />
            <Route
              path="/admin/allBookings"
              element={<BookingsListComponent />}
            />
            <Route path="/admin/allCars" element={<CarList />} />
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
  );
};

export default App;
