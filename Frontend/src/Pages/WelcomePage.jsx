import React, { useState } from 'react';

function WelcomePage() {
  const [active, setActive] = useState('user');

  const handleClick = (type) => {
    setActive(type);
    if (type === 'seller') {
      window.location.href = 'frontend/SellerOnboarding.html';
    } else {
      window.location.href = 'shopping cart/index.html';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-['Roboto']">
      <div className="flex w-[90%] max-w-[1200px] h-[600px] bg-white shadow-lg rounded-xl overflow-hidden flex-col md:flex-row">
        {/* Left Panel */}
        <div className="flex flex-col items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-gray-300 w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-12">Welcome!</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={() => handleClick('user')}
              className={`flex-1 py-3 px-4 rounded-md border font-bold text-lg transition duration-300 shadow-sm ${
                active === 'user'
                  ? 'bg-green-500 text-white border-green-500 shadow-md -translate-y-1'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-blue-500 hover:border-blue-500'
              }`}
            >
              User
            </button>
            <button
              onClick={() => handleClick('seller')}
              className={`flex-1 py-3 px-4 rounded-md border font-bold text-lg transition duration-300 shadow-sm ${
                active === 'seller'
                  ? 'bg-green-500 text-white border-green-500 shadow-md -translate-y-1'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-blue-500 hover:border-blue-500'
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col items-center justify-center p-8 text-center bg-blue-500 text-white w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 leading-snug">Your Journey Starts Here!</h2>
          <p className="text-xl opacity-90 mb-10 max-w-[85%] leading-relaxed">
            Explore amazing products and exclusive offers. Your next great find is just a click away!
          </p>
          <div className="bg-green-500 py-6 px-10 text-3xl font-bold rounded-lg shadow-lg transition transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
            Great Deals Await!
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
