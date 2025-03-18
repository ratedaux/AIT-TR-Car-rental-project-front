import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './src/styles/globalStyle.css';
import Layout from 'pages/carRentalApp/Layout/Layout';
import Home from 'pages/carRentalApp/Home/Home';
import BookingForm from 'components/BookingForm/BookingForm'




const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Home />
        <BookingForm></BookingForm>
      </Layout>


    </BrowserRouter>
  );
};

export default App;