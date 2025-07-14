import React, { useEffect, useState } from 'react';
import '../Styles/Product.css'; // Import the CSS file


const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    amount: '',
    price: '',
    image: '',
    delivery: ''
  });
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);

  const requiredFields = [
    'name', 'category', 'description', 'amount', 'price'
  ];

  useEffect(() => {
    // Load products from backend on component mount
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('❌ Fetch error:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Enable/disable Add button based on form validation
    const filled = requiredFields.every(field => formData[field].trim() !== '' || field === name);
    setIsAddBtnDisabled(!filled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddBtnDisabled) return;

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Saved:', data);
        setProducts(prevProducts => [...prevProducts, data]); // Use backend response
        setFormData({
          name: '',
          category: '',
          description: '',
          amount: '',
          price: '',
          image: '',
          delivery: ''
        });
        setIsAddBtnDisabled(true);
      })
      .catch(err => console.error('❌ Error:', err));
  };

  const handleRemoveProduct = (productToRemove) => {
    setProducts(prevProducts => prevProducts.filter(product => product !== productToRemove));
  };

  const handleFinish = () => {
    if (products.length === 0) {
      alert('Please add at least one product before finishing.');
      return;
    }
    window.location.href = 'Dashboard.html';
  };

  return (
    <div>
      <div id="navbar-placeholder"></div>
      <div className="tabs">
        <button style={{ border: 'none', background: 'none', padding: 0 }}>
          <div className="tab">Seller information</div>
        </button>
        <button style={{ border: 'none', background: 'none', padding: 0 }}>
          <div className="tab active">Product detail</div>
        </button>
        <button style={{ border: 'none', background: 'none', padding: 0 }}>
          <div className="tab">Dashboard</div>
        </button>
      </div>
      <div className="main-content">
        <div className="product-form-container">
          <div className="form-header">Product to sell</div>
          <form className="product-form" id="productForm" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-name">Add product</label>
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-category">Add product category</label>
                <input
                  type="text"
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label htmlFor="product-description">Add product description</label>
                <textarea
                  id="product-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="product-amount">Add product amount</label>
                <input
                  type="number"
                  id="product-amount"
                  name="amount"
                  min="1"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-price">Add product price</label>
                <input
                  type="number"
                  id="product-price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label htmlFor="product-image">Add product image</label>
                <input
                  type="text"
                  id="product-image"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label htmlFor="delivery-charge">Delivery charge</label>
                <input
                  type="text"
                  id="delivery-charge"
                  name="delivery"
                  placeholder="Free or include delivery charges"
                  value={formData.delivery}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="add-btn" id="addBtn" disabled={isAddBtnDisabled}>
              + Add more item
            </button>
          </form>
        </div>
        <div className="product-list" id="productList">
          {products.map((prod, index) => (
            <div className="product-item" key={index}>
              <strong>Product:</strong> {prod.name}<br />
              <strong>Category:</strong> {prod.category}<br />
              <strong>Description:</strong> {prod.description}<br />
              <strong>Amount:</strong> {prod.amount}<br />
              <strong>Price:</strong> ₹{prod.price}<br />
              <strong>Image:</strong> {prod.image ? <img src={prod.image} alt="Product Image" style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '6px' }} /> : 'N/A'}<br />
              <strong>Delivery:</strong> {prod.delivery}
              <button className="remove-btn" type="button" onClick={() => handleRemoveProduct(prod)}>Remove</button>
            </div>
          ))}
        </div>
        <button id="finishBtn" className="add-btn" style={{ background: '#43a047', marginTop: '24px' }} onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
