import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          alert('Product deleted successfully!');
          setProducts(products.filter(product => product._id !== id)); // Update state to remove deleted product
        })
        .catch(err => {
          alert('Failed to delete product');
          console.error(err);
        });
    }
  };

  return (
    <div className="dashboard-container">
      {products.length > 0 ? (
        products.map(product => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '6px' }} alt="Product" />
              ) : (
                'No Image'
              )}
            </div>
            <div className="product-info">
              <div className="product-desc">{product.description}</div>
              <div className="product-price">₹{product.price}</div>
              <div className="product-meta">
                <span className="amount-badge">Amount: {product.amount}</span>
                <button className="icon-btn delete-btn" title="Delete" onClick={() => handleDelete(product._id)}>&#128465;</button>
                <button className="icon-btn" title="Share">&#128203;</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>Failed to load products.</p>
      )}
      <button className="add-btn" disabled>+Add more item</button>
    </div>
  );
};

export default Dashboard;
