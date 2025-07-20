import React from 'react';
import styles from '../Styles/BestSeller.module.css';

const bestSellers = [
  {
    name: 'Apple',
    description: 'Fresh, juicy and clean apples, great for health.',
    price: '80 / Kg',
    image: 'https://i.pinimg.com/736x/87/83/d1/8783d12fc288892db42628034db147ae.jpg'
  },
  {
    name: 'Milk',
    description: 'Full cream fresh milk for everyday needs.',
    price: '60 / ltr',
    image: 'https://i.pinimg.com/736x/36/3a/df/363adfbd007456f62197489f96a8b8f9.jpg'
  },
  {
    name: 'Clothes',
    description: 'High Quality Fabric, Comfortable And Stylish.',
    price: '599 / 20000',
    image: 'https://i.pinimg.com/736x/d3/e5/ff/d3e5ff3d9c73c7ebd9956f56a5dcbdf4.jpg'
  },
  {
    name: 'Branded shoes',
    description: 'Branded shoes, the perfect balance of fashion and functionality.',
    price: '4500 / 1.5 lac',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=687&auto=format&fit=crop'
  },
  {
    name: 'Laptop',
    description: 'Laptops - High Performance Laptops',
    price: '55,000',
    image: 'https://i.pinimg.com/736x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg'
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone, great camera quality.',
    price: '25,000 / 2,000,00',
    image: 'https://i.pinimg.com/736x/ce/e9/a3/cee9a3b405bb308569bc26c76d8cfd63.jpg'
  }
];

const BestSellers = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Best Sellers</h2>
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        {bestSellers.map((product, idx) => (
          <article
            key={idx}
            className={`${styles.productCard} min-w-[270px] max-w-xs flex-shrink-0`}
            tabIndex="0"
          >
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
              loading="lazy"
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDesc}>{product.description}</p>
              <div className={styles.productPrice}>₹{product.price}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
