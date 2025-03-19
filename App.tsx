import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './src/styles/globalStyle.css';
import Layout from 'pages/carRentalApp/Layout/Layout';
import Home from 'pages/carRentalApp/Home/Home';
import UserRegistrationForm from 'components/UserRegistrationForm/UserRegistrationForm';




const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Home />
        <UserRegistrationForm/>  
      </Layout>


    </BrowserRouter>
  );
};

export default App;