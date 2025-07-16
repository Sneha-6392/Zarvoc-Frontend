import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'; // Ensure Footer.jsx exists

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('Cart load error:', err));
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
    if (qty < 1) qty = 1;
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

  return (
    <>
      <Navbar />

      <div className="w-[90%] max-w-[900px] mx-auto my-30 bg-white p-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>

        {!userId ? (
          <p className="text-center mt-6">Please login to view your cart.</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex border-t py-5 items-center">
                <div className="w-[180px] h-[180px] bg-gray-200 mr-4 rounded overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-lg">{item.name}</div>
                  <div className="text-xl font-bold my-2">₹{item.price}</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2">-</button>
                      <input
                        type="number"
                        value={item.qty}
                        min={1}
                        onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                        className="w-12 text-center border mx-1"
                      />
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2">+</button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="cursor-pointer text-red-500"
                    >
                      🗑 Delete
                    </span>
                    <span className="text-gray-500">| Save for later | Share | See more like this</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right mt-6 text-lg">
              Subtotal ({itemCount} items): <strong>₹{subtotal}.00</strong>
              <br />
              <button
                className="bg-blue-600 text-white px-6 py-2 mt-4 rounded disabled:bg-gray-300"
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
