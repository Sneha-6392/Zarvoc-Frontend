import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import logo from '../assets/Zarvoc2.png';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('🗑️ Are you sure you want to delete this product?')) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          alert('✅ Product deleted successfully!');
          setProducts(prev => prev.filter(product => product._id !== id));
        })
        .catch(err => {
          alert('❌ Failed to delete product');
          console.error(err);
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img src={logo} alt="Zarvoc Logo" className="w-40 h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-50 ${
        products.length === 0 ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {products.length > 0 ? (
            products.map(product => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-start bg-white border border-gray-300 rounded-xl shadow-sm p-6 mb-6"
              >
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-6">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium">🚫 No Image</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold mb-2">
                    📝 {product.description}
                  </p>
                  <p className="text-green-600 font-bold mb-1">💰 ₹{product.price}</p>
                  <p className="text-gray-500 mb-2">📦 Amount: {product.amount}</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 text-sm rounded-md font-medium"
                    >
                      🗑️ Delete
                    </button>
                    <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm rounded-md font-medium">
                      🔗 Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-600 font-medium text-lg py-20">
              😔 No products available.
            </p>
          )}

          <button
            className="w-full bg-gray-300 text-white text-lg font-semibold py-3 rounded-md opacity-70 cursor-not-allowed mt-4"
            disabled
          >
            ➕ Add more item
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
