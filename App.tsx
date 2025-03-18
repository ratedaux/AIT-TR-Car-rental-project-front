import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './src/styles/globalStyle.css';
import Layout from 'pages/carRentalApp/Layout/Layout';
import Home from 'pages/carRentalApp/Home/Home';




const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Home />
      </Layout>


    </BrowserRouter>
  );
};

export default App;