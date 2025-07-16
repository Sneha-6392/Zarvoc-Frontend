import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import LandingPage from './Pages/LandingPage.jsx';
import Category from './Pages/Category.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import CartPage from './Pages/CartPage.jsx';
import TrackOrder from './Pages/TrackOrder.jsx';
import Productdetails  from './Pages/Productdetails.jsx'; 
import SellerOnBoarding from './Pages/SellerOnBoarding.jsx';
import SellerForm from './Pages/SellerForm.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import SecureCheckout from './Pages/SecureCheckout.jsx';
import AboutUs from './Pages/AboutUs.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop /> {/* ✅ Scroll fix added here */}
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/productdetails" element={<Productdetails />} />
          <Route path="/seller-boarding" element={<SellerOnBoarding />} />
          <Route path="/sellerform" element={<SellerForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/checkout" element={<SecureCheckout />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
