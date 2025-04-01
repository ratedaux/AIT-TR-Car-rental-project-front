import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './src/styles/globalStyle.css';
import Layout from 'pages/Layout/Layout';
import Home from 'pages/Home/Home';
import Login from 'components/Login/Login';
import UserRegistrationForm from 'components/UserRegistrationForm/UserRegistrationForm';
import MyAccount from 'pages/CustomerPage/MyAccount';
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';
import CarPage from 'pages/CarPage/CarPage';
import AdminPage from 'pages/AdminPage/AdminPage';
import EditCarPage from 'pages/EditCarPage/EditCarPage'
import RentCarPage from 'pages/RentCarPage/RentCarPage';
import EditBookingPage from 'pages/EditBoookingPage/EditBookingPage';
import EditUserPage from 'pages/EditUserPage/EditUserPage';

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

          <Route path="/edit-booking/:id" element={<EditBookingPage />} />
          <Route path="/edit-car/:id" element={<EditCarPage/>}/>
          <Route path="/rent-car/:id" element={<RentCarPage/>}/>
          <Route path="/edit-user/:id" element={<EditUserPage/>}/>

        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;