import React from 'react';

const TrackOrder = () => {
  const orderSteps = [
    {
      label: 'Order Placed',
      icon: 'fa-bag-shopping',
      time: '20 Feb 2024\n11:00 AM',
      status: 'completed',
    },
    {
      label: 'Accepted',
      icon: 'fa-check',
      time: '20 Feb 2024\n11:15 AM',
      status: 'completed',
    },
    {
      label: 'In Progress',
      icon: 'fa-box',
      time: 'Expected\n21 Feb 2024',
      status: 'pending',
    },
    {
      label: 'On the Way',
      icon: 'fa-truck',
      time: 'Expected\n22-23 Feb',
      status: 'pending',
    },
    {
      label: 'Delivered',
      icon: 'fa-box-open',
      time: 'Expected\n24 Feb',
      status: 'pending',
    },
  ];

  const products = [
    {
      name: 'Trendy Brown Coat',
      color: 'Brown',
      size: 'XXL',
      qty: 4,
      image:
        'https://assets.ajio.com/medias/sys_master/root/20240318/QuNj/65f8415616fd2c6e6a665789/-473Wx593H-467178188-brown-MODEL.jpg',
    },
    {
      name: 'Classy Light Coat',
      color: 'Cream',
      size: 'XXL',
      qty: 1,
      image:
        'https://assets.ajio.com/medias/sys_master/root/20240318/QuNj/65f8415616fd2c6e6a665789/-473Wx593H-467178188-brown-MODEL.jpg',
    },
    {
      name: 'Light Brown Sweater',
      color: 'Light Brown',
      size: 'S',
      qty: 1,
      image:
        'https://assets.ajio.com/medias/sys_master/root/20240318/QuNj/65f8415616fd2c6e6a665789/-473Wx593H-467178188-brown-MODEL.jpg',
    },
    {
      name: 'Modern Brown Dress',
      color: 'Brown',
      size: 'S',
      qty: 2,
      image:
        'https://assets.ajio.com/medias/sys_master/root/20240318/QuNj/65f8415616fd2c6e6a665789/-473Wx593H-467178188-brown-MODEL.jpg',
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="text-center py-6">
        <h1 className="text-3xl font-semibold">Track Your Order</h1>
        <p className="text-sm text-gray-500 mt-1">Home / Track Your Order</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <p className="text-sm text-gray-600 mb-4">
          Order ID : <span className="font-semibold">#SDGT1254FD</span>
        </p>

        <div className="grid grid-cols-5 gap-2 text-center mb-6 relative">
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
          {orderSteps.map((step, index) => (
            <div key={index} className="relative z-10">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-yellow-500' : 'bg-gray-300'
                } text-white`}
              >
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <p className="text-sm mt-2">{step.label}</p>
              <p className="text-xs text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: step.time.replace(/\n/g, '<br/>') }} />
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-4">Products</h3>
          <div className="space-y-4">
            {products.map((product, i) => (
              <div key={i} className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Color: {product.color} | Size: {product.size} | Qty: {product.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-base hover:bg-blue-700 transition"
        >
          Continue Shopping
        </a>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm mt-8 py-6 border-t">
        <div>
          <i className="fa-solid fa-box text-xl text-yellow-500 mb-2"></i>
          <p className="font-semibold">Free Shipping</p>
          <p className="text-gray-500">Free shipping for order above $180</p>
        </div>
        <div>
          <i className="fa-solid fa-wallet text-xl text-yellow-500 mb-2"></i>
          <p className="font-semibold">Flexible Payment</p>
          <p className="text-gray-500">Multiple secure payment options</p>
        </div>
        <div>
          <i className="fa-solid fa-headset text-xl text-yellow-500 mb-2"></i>
          <p className="font-semibold">24x7 Support</p>
          <p className="text-gray-500">We support online all days.</p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;