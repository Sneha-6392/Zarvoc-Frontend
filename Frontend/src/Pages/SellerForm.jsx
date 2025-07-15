import React, { useState, useRef } from 'react';
import Navbar from '../Components/Navbar.jsx';
import '../Styles/SellerForm.css';


const SellerForm = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    country: '',
    shipping: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [allFilled, setAllFilled] = useState(false);
  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setAllFilled(Object.values(updatedForm).every(val => val.trim() !== ''));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/sellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('✅ Seller registered successfully');
      window.location.href = 'ProductDetails.html';
    } catch {
      alert('❌ Error submitting form');
    }
  };

  return (
    <>
      <Navbar />
      <div className="seller-fullscreen-container">
        <div className="tabs">
          <div className="tab active">Seller information</div>
          <div className="tab">Product detail</div>
          <div className="tab">Dashboard</div>
        </div>
        <div className="centered-content-row">
          {/* LEFT: FORM */}
          <form className="seller-form" id="sellerForm" onSubmit={handleSubmit} autoComplete="off">
            <h2 className="form-title">Tell us about your business</h2>
            <label htmlFor="shop-name">Set a name for your shop</label>
            <input type="text" id="shop-name" name="shopName" value={formData.shopName} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="category">Select product category</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="pincode">Pin code</label>
            <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="address">Enter your business address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} autoComplete="off" />

            <label htmlFor="shipping">Shipping option</label>
            <input type="text" id="shipping" name="shipping" value={formData.shipping} onChange={handleInputChange} placeholder="Self shipping or partner shipping" />

            <button
              type="submit"
              className="continue-btn"
              disabled={!allFilled}
              style={{
                cursor: allFilled ? 'pointer' : 'not-allowed',
                opacity: allFilled ? 1 : 0.7
              }}
            >
              Continue
            </button>
          </form>
          {/* RIGHT: IMAGE + UPLOAD BUTTON */}
          <div className="image-upload-outer">
            <button
              type="button"
              className="upload-btn-outside"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              Upload Shop Image
            </button>
            <input
              type="file"
              id="shopImage"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div className="image-placeholder" id="imagePreview">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Shop"
                    style={{
                      maxWidth: '96%',
                      maxHeight: '380px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 12px rgba(4,120,87,0.13)',
                      border: '2px solid #d1fae5',
                      marginBottom: '10px'
                    }}
                  />
                  <span style={{ color: '#047857', fontSize: '1rem', fontWeight: 500 }}>Preview</span>
                </>
              ) : (
                <span style={{ color: '#047857', fontSize: '1.3rem', fontWeight: 600 }}>Image</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerForm;