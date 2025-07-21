import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { HashLoader } from "react-spinners"; // Import HashLoader

const categoryMap = {
  fashionProducts: 'fashion',
  cosmeticProducts: 'cosmetic',
  electronic: 'electronic',
  furnitureProducts: 'furniture',
  kitchenProducts: 'kitchen',
  childrenToysProducts: 'childrenToys',
  foodProducts: 'food',
  sportsProducts: 'sports'
};

const Category = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const categoryKey = searchParams.get('cat');
  const category = categoryMap[categoryKey];

  useEffect(() => {
    // Set a timeout to hide the loader after 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  useEffect(() => {
    if (!loading) { // Only fetch data after loading is false
      if (!category) {
        setError('Invalid category');
        return;
      }

      fetch(`http://localhost:5000/api/products/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch products');
        });
    }
  }, [category, loading]); // Dependency on category and loading state

  const addToCart = async (id, name, price, image) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // Using a custom modal/message box instead of alert()
      // For simplicity, a console log is used here, but in a real app,
      // you would render a modal component.
      console.log('You must be logged in to add items to cart.');
      return;
    }

    const item = { id, name, price, image, qty: 1 };

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, item })
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data.msg || 'Added to cart!'); // Use console.log instead of alert
      } else {
        console.log(data.msg || 'Failed to add to cart.'); // Use console.log instead of alert
      }
    } catch (err) {
      console.error('Error:', err);
      console.log('Server error'); // Use console.log instead of alert
    }
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

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-xl hover:scale-[1.02] duration-300 border"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-black-600 font-bold text-lg">₹{product.price}</span>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                onClick={() =>
                  addToCart(
                    product._id,
                    product.name,
                    product.price,
                    product.image
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
