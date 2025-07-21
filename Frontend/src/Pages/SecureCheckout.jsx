import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners'; // Import HashLoader

const SecureCheckout = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  const isPayButtonEnabled = selectedPayment !== '';
  const isCouponValid = couponCode.trim() !== '';
  const isUpiValid = upiId.trim() !== '';

  useEffect(() => {
    // Simulate a loading period for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the simulated delay
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handlePaymentSelect = (e) => {
    setSelectedPayment(e.target.value);
  };

  // Show loader while loading is true
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {/* HashLoader component with customizable color and size */}
        <HashLoader color="#3182CE" size={80} />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-white flex justify-between items-center px-6 py-4 shadow">
        <div className="text-xl font-bold">𝓩𝓪𝓻𝓿𝓸𝓬</div>
        <h1 className="text-lg font-semibold">Secure checkout</h1>
        <div className="text-2xl">🛒</div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4">
        {/* Left Column */}
        <section className="md:col-span-2 space-y-4">
          {/* Delivery Address */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">Delivering to xyz</h2>
                <p className="text-sm">
                  EWS 246-247, Ravi khand banglabazar, LUCKNOW, UTTAR PRADESH, 226012, India
                </p>
                <a href="#" className="text-sm text-blue-600 hover:underline">Add delivery instructions</a>
              </div>
              <button className="text-sm font-semibold text-black hover:underline">Change</button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-4">Payment Method</h2>

            {/* Coupon */}
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
                  disabled={!isCouponValid}
                  className={`px-4 rounded-r text-sm transition-all duration-200 ${
                    isCouponValid
                      ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Options */}
            <fieldset className="border border-gray-300 rounded p-4 space-y-4">
              <legend className="font-medium">Another Payment Option</legend>

              {/* Credit Card */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={handlePaymentSelect}
                    className="payment-option"
                  />
                  <span>Credit or debit card</span>
                </label>
                <div className="flex items-center mt-2 space-x-2">
                  <img src="https://img.icons8.com/color/48/visa.png" className="h-6" alt="Visa" />
                  <img src="https://img.icons8.com/color/48/mastercard-logo.png" className="h-6" alt="Mastercard" />
                  <img src="https://img.icons8.com/color/48/amex.png" className="h-6" alt="Amex" />
                  <img src="https://img.icons8.com/color/48/discover.png" className="h-6" alt="Discover" />
                </div>
                <a href="#" className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                  + Add a new credit or debit card
                </a>
              </div>

              {/* Net Banking */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={selectedPayment === 'netbanking'}
                    onChange={handlePaymentSelect}
                  />
                  <span>Net Banking</span>
                </label>
                <select className="mt-1 border border-gray-300 rounded px-2 py-1 w-1/2 text-sm">
                  <option>Choose an option</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                </select>
              </div>

              {/* UPI */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={handlePaymentSelect}
                  />
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
                      isUpiValid
                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Verify
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  The UPI ID is in the format of name/phone number@bankname
                </p>
              </div>

              {/* COD */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === 'cod'}
                    onChange={handlePaymentSelect}
                  />
                  <span>Cash on Delivery/Pay on Delivery</span>
                </label>
              </div>
            </fieldset>
          </div>
        </section>

        {/* Right Column */}
        <aside className="bg-white p-4 rounded shadow h-fit">
          <button
            className={`w-full py-2 rounded text-sm mb-4 transition-all duration-200 ${
              isPayButtonEnabled
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isPayButtonEnabled}
            onClick={() => (window.location.href = 'confirmation.html')}
          >
            Use this payment method
          </button>

          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Items:</span><span>₹2,000.00</span></li>
            <li className="flex justify-between"><span>Delivery:</span><span>₹50.00</span></li>
            <li className="flex justify-between"><span>Total:</span><span>₹2,050.00</span></li>
            <li className="flex justify-between"><span>Promotion Applied:</span><span>- ₹148.00</span></li>
            <hr />
            <li className="flex justify-between font-semibold text-lg mt-2">
              <span>Order Total:</span><span>₹2,198.00</span>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default SecureCheckout;
