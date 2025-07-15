import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage.jsx';
import Category from './Pages/Category.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import CartPage from './Pages/CartPage.jsx';
import TrackOrder from './Pages/TrackOrder.jsx';
import AboutUs from './Pages/AboutUs.jsx';


function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;