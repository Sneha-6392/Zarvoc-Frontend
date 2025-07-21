import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'; // Ensure Footer.jsx exists
import { HashLoader } from "react-spinners"; // Import HashLoader

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true); // New state for loading

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setLoading(false); // No user, so no loading needed
      return;
    }

    setLoading(true); // Start loading
    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data);
        setLoading(false); // End loading on success
      })
      .catch(err => {
        console.error('Cart load error:', err);
        setLoading(false); // End loading on error
      });
  }, [userId]);

  useEffect(() => {
    let total = 0;
    let count = 0;
    cartItems.forEach(item => {
      total += item.price * item.qty;
      count += item.qty;
    });
    setSubtotal(total);
    setItemCount(count);
  }, [cartItems]);

  const updateQty = (itemId, qty) => {
    if (qty < 1) qty = 1; // Ensure quantity is at least 1
    fetch(`http://localhost:5000/api/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId, qty })
    })
      .then(() => {
        setCartItems(prev =>
          prev.map(item =>
            item.id === itemId ? { ...item, qty } : item
          )
        );
      })
      .catch(err => console.error('Update failed', err));
  };

  const deleteItem = (itemId) => {
    fetch(`http://localhost:5000/api/cart/remove`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId })
    })
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      })
      .catch(err => console.error('Delete failed', err));
  };

  // Show HashLoader while loading is true
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <HashLoader color="#3B82F6" size={80} /> {/* Using a common blue color */}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="w-[90%] max-w-[900px] mx-auto my-10 md:my-20 bg-white p-6 md:p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h1>

        {!userId ? (
          <p className="text-center text-lg text-gray-600 mt-6">Please login to view your cart.</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row border-t py-5 items-center justify-between">
                <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 mr-4 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base md:text-lg text-gray-900">{item.name}</div>
                    <div className="text-lg md:text-xl font-bold my-1 text-gray-800">₹{item.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 md:space-x-4 flex-wrap justify-center md:justify-end w-full md:w-auto">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-l-md transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      min={1}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      className="w-12 text-center border-x border-gray-300 py-1 text-gray-800 focus:outline-none"
                    />
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-r-md transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition-colors text-sm md:text-base mt-2 md:mt-0"
                  >
                    <span className="mr-1">🗑</span> Delete
                  </button>
                  {/* You can re-add these if they have functionality later */}
                  {/* <span className="text-gray-500 text-sm">| Save for later | Share | See more like this</span> */}
                </div>
              </div>
            ))}
            <div className="border-t pt-6 mt-6 text-right">
              <div className="text-xl font-semibold text-gray-800">
                Subtotal ({itemCount} items): <strong className="text-blue-600">₹{subtotal.toFixed(2)}</strong>
              </div>
              <button
                className="bg-blue-600 text-white px-8 py-3 mt-6 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={itemCount === 0}
                onClick={() => window.location.href = 'checkout.html'}
              >
                Proceed to Pay
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
