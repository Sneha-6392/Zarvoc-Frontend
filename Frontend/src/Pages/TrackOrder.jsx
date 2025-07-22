// SecureCheckout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const SecureCheckout = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [address, setAddress] = useState('EWS 246-247, Ravi khand banglabazar, LUCKNOW, UTTAR PRADESH, 226012, India');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const baseTotal = 2198;
  const discountedTotal = baseTotal - discount;

  const isPayButtonEnabled = selectedPayment !== '';
  const isCouponValid = couponCode.trim() !== '';
  const isUpiValid = upiId.trim() !== '';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePaymentSelect = (e) => {
    setSelectedPayment(e.target.value);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'URBANTALES' || code === 'AJ001') {
      setDiscount(baseTotal * 0.2);
      alert('✅ Coupon Applied: 20% discount');
    } else {
      setDiscount(0);
      alert('❌ Invalid Coupon');
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: discountedTotal })
      });

      const data = await res.json();

      const options = {
        key: 'rzp_test_QMG1XV6hszJZlA',
        amount: data.amount,
        currency: data.currency,
        name: 'Zarvoc',
        description: 'Order Payment',
        order_id: data.id,
        handler: function (response) {
          alert('✅ Payment successful!');
          console.log(response);
          navigate('/track-order');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: { color: '#070A52' },
        image: 'https://seeklogo.com/images/R/razorpay-logo-B4B31B7918-seeklogo.com.png'
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('Razorpay error', err);
      alert('Something went wrong!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <HashLoader color="#070A52" size={80} />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 text-gray-800 min-h-screen">
      <header className="bg-white flex justify-between items-center px-6 py-4 shadow">
        <div className="text-xl font-bold">𝓩𝓪𝓻𝓿𝓸𝓬</div>
        <h1 className="text-lg font-semibold">Secure checkout</h1>
        <div className="text-2xl">🛒</div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4">
        <section className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div className="w-full">
                <h2 className="font-semibold">Delivering to xyz</h2>
                {isEditingAddress ? (
                  <textarea
                    className="w-full border mt-1 p-2 text-sm rounded"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <p className="text-sm">{address}</p>
                )}
                <a href="#" className="text-sm text-blue-600 hover:underline block mt-1" onClick={() => alert('You can now write instructions below.')}>Add delivery instructions</a>
                <textarea
                  className="w-full mt-2 border border-gray-300 rounded p-2 text-sm"
                  placeholder="Write any delivery instructions here..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
              <button onClick={() => setIsEditingAddress(!isEditingAddress)} className="text-sm font-semibold text-black hover:underline ml-2">
                {isEditingAddress ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-4">Payment Method</h2>
            <div className="mb-4">
              <label className="font-medium">Apply coupon</label>
              <div className="flex mt-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border border-gray-300 rounded-l px-3 py-1 w-full"
                  placeholder="Enter coupon code"
                />
                <button
                  onClick={applyCoupon}
                  className={`px-4 rounded-r text-sm transition-all duration-200 ${
                    isCouponValid ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!isCouponValid}
                >
                  Apply
                </button>
              </div>
            </div>

            <fieldset className="border border-gray-300 rounded p-4 space-y-4">
              <legend className="font-medium">Another Payment Option</legend>
              <div>
                <label className="flex items-center space-x-2 hover:scale-105 hover:shadow transition duration-150 cursor-pointer">
                  <input type="radio" name="payment" value="card" checked={selectedPayment === 'card'} onChange={handlePaymentSelect} />
                  <span className="flex items-center space-x-2">
                    <img src="https://seeklogo.com/images/R/razorpay-logo-B4B31B7918-seeklogo.com.png" className="h-5 w-5" alt="razorpay" />
                    <span>Credit/Debit via Razorpay</span>
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" value="netbanking" checked={selectedPayment === 'netbanking'} onChange={handlePaymentSelect} />
                  <span>Net Banking</span>
                </label>
                <select className="mt-1 border border-gray-300 rounded px-2 py-1 w-1/2 text-sm">
                  <option>Choose an option</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" value="upi" checked={selectedPayment === 'upi'} onChange={handlePaymentSelect} />
                  <span>Other UPI Apps</span>
                </label>
                <div className="flex mt-1 items-center space-x-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Add UPI ID"
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  />
                  <button
                    disabled={!isUpiValid}
                    className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                      isUpiValid ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Verify
                  </button>
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" value="cod" checked={selectedPayment === 'cod'} onChange={handlePaymentSelect} />
                  <span>Cash on Delivery/Pay on Delivery</span>
                </label>
              </div>
            </fieldset>
          </div>
        </section>

        <aside className="bg-white p-4 rounded shadow h-fit">
          <button
            className={`w-full py-2 rounded text-sm mb-4 transition-all duration-200 ${
              isPayButtonEnabled ? 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isPayButtonEnabled}
            onClick={handleRazorpayPayment}
          >
            Use this payment method
          </button>

          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Items:</span><span>₹2,000.00</span></li>
            <li className="flex justify-between"><span>Delivery:</span><span>₹50.00</span></li>
            <li className="flex justify-between"><span>Total:</span><span>₹2,050.00</span></li>
            <li className="flex justify-between"><span>Promotion Applied:</span><span>- ₹{discount.toFixed(2)}</span></li>
            <hr />
            <li className="flex justify-between font-semibold text-lg mt-2">
              <span>Order Total:</span><span>₹{discountedTotal.toFixed(2)}</span>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default SecureCheckout;
