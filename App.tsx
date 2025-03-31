import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './src/styles/globalStyle.css';
import Layout from 'pages/Layout/Layout';
import Home from 'pages/Home/Home';

import BookingForm from 'components/BookingForm/BookingForm';
import Login from 'components/Login/Login';
import UserRegistrationForm from 'components/UserRegistrationForm/UserRegistrationForm';

import LoginNotification from 'components/LoginNotification/LoginNotification';
import MyAccount from 'pages/CustomerPage/MyAccount';
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';
import EditBookingPage from 'pages/carRentalApp/EditBoookingPage/EditBookingPage';
import CarPage from 'pages/CarPage/CarPage';
import AdminPage from 'pages/AdminPage/AdminPage';



const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path='/login/registration' element={<UserRegistrationForm />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/cars/:id" element={<CarPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/edit-booking" element={<EditBookingPage />} />


        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;