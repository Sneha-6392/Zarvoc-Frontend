import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';


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
  const category = searchParams.get('cat');


  useEffect(() => {
    if (!category) {
      setError('Invalid category');
      return;
    }

    fetch(`http://localhost:3000/api/products/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch products');
      });
  }, [category]);

  const addToCart = async (id, name, price, image) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to add items to cart.');
      return;
    }

    const item = { id, name, price, image, qty: 1 };

    try {
      const res = await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, item })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.msg || 'Added to cart!');
      } else {
        alert(data.msg || 'Failed to add to cart.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error');
    }
  };

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