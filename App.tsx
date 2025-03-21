import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import '@fortawesome/fontawesome-free/css/all.min.css';

import './src/styles/globalStyle.css';
import Layout from 'pages/carRentalApp/Layout/Layout';
import Home from 'pages/carRentalApp/Home/Home';
import BookingForm from 'components/BookingForm/BookingForm';
import Login from 'components/Login/Login';
import UserRegistrationForm from 'components/UserRegistrationForm/UserRegistrationForm';






const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />  
          <Route path='/login/registration' element={<UserRegistrationForm/>}/>
          <Route path="*" element="Page not found" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;