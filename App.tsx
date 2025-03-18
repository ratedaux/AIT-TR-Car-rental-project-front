import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './src/styles/globalStyle.css';
import Layout from 'pages/carRentalApp/Layout/Layout';
import Home from 'pages/carRentalApp/Home/Home';




const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="*" element="Page not found" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;