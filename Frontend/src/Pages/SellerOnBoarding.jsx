import React, { useEffect } from "react";
import "../Styles/SellerOnBoarding.css";
import Navbar from '../Components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const SellerOnBoarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("navbar.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;
      });
  }, []);

  const handleClick = () => {
    navigate('/sellerform'); // ✅ React route ke according correct route set karein
  };

  return (
    <>
    <Navbar />
      <div id="navbar-placeholder"></div>
      <div className="container">
        <div className="banner">
          <img
            src="https://img.freepik.com/premium-vector/work-from-home-concept-happy-woman-selling-products-online-home_218660-278.jpg?w=1380"
            alt="Ads"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        </div>
        <h2>How to become a seller</h2>
        <div className="steps">
          <div className="step-card">
            <div className="step-title">Step 1: Register your account</div>
            <div className="step-image">
              <img
                src="https://i.pinimg.com/736x/d8/8f/a4/d88fa43aa79db7dfd147f459b4c71d00.jpg"
                alt="Register Account"
              />
            </div>
          </div>
          <div className="step-card">
            <div className="step-title">Step 2: Choose storage & shipping</div>
            <div className="step-image">
              <img
                src="https://i.pinimg.com/736x/38/bd/e2/38bde2763e83f705839b7eb1ccca4178.jpg"
                alt="Storage and Shipping"
              />
            </div>
          </div>
          <div className="step-card">
            <div className="step-title">Step 3: List your products</div>
            <div className="step-image">
              <img
                src="https://i.pinimg.com/736x/91/7a/37/917a37e331d38bdeadad76e10abaf29a.jpg"
                alt="List Products"
              />
            </div>
          </div>
          <div className="step-card">
            <div className="step-title">Step 4: Complete orders & get paid</div>
            <div className="step-image">
              <img
                src="https://i.pinimg.com/736x/d1/4e/ff/d14eff0a928847d42b7a86ccb93a6d26.jpg"
                alt="Get Paid"
              />
            </div>
          </div>
        </div>

        {/* Replace <a> with <button> and navigate programmatically */}
        <button onClick={handleClick} className="start-btn">
          Start selling
        </button>
      </div>
    </>
  );
};

export default SellerOnBoarding;
