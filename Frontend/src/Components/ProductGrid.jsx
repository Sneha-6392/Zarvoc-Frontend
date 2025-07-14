import React, { useRef, useState } from "react";

const products = [
  {
    name: "Apple",
    desc: "Fresh, juicy and clean apples, great for health.",
    price: "₹80 / Kg",
    img: "https://i.pinimg.com/736x/87/83/d1/8783d12fc288892db42628034db147ae.jpg",
  },
  {
    name: "Milk",
    desc: "Full cream fresh milk for everyday needs.",
    price: "₹60 / ltr",
    img: "https://i.pinimg.com/736x/36/3a/df/363adfbd007456f62197489f96a8b8f9.jpg",
  },
  {
    name: "Clothes",
    desc: "High Quality Fabric, Comfortable And Stylish.",
    price: "₹599 / ₹20000",
    img: "https://i.pinimg.com/736x/d3/e5/ff/d3e5ff3d9c73c7ebd9956f56a5dcbdf4.jpg",
  },
  {
    name: "Branded shoes",
    desc: "Branded shoes, the perfect balance of fashion and functionality.",
    price: "₹4500 / ₹1.5 lac",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Laptop",
    desc: "Laptops - High Performance Laptops",
    price: "₹55,000",
    img: "https://i.pinimg.com/736x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg",
  },
  {
    name: "Smartphone",
    desc: "Latest smartphone, great camera quality.",
    price: "₹25,000 / ₹2,000,00",
    img: "https://i.pinimg.com/736x/ce/e9/a3/cee9a3b405bb308569bc26c76d8cfd63.jpg",
  },
  {
    name: "Headphone",
    desc: "High quality headphones, great sound experience.",
    price: "₹6,500",
    img: "https://plus.unsplash.com/premium_photo-1679513691485-711d030f7e94?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Notebook",
    desc: "Ideal Notebook for Study, for All Subjects.",
    price: "₹150",
    img: "https://i.pinimg.com/736x/74/d3/e3/74d3e3226cd9e305c74a59439538a5ea.jpg",
  },
];

const BestSellers = () => {
  const containerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const cardWidth = 290;
  const visibleCards = 4;

  const scroll = (dir) => {
    const maxIndex = products.length - visibleCards;
    let newIndex = scrollIndex + dir;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;
    setScrollIndex(newIndex);
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${
        newIndex * cardWidth
      }px)`;
    }
  };

  return (
    <section className="px-4 py-6 relative overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-left">Best Sellers</h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 transition-transform duration-300 ease-in-out"
        >
          {products.map((item, index) => (
            <article
              key={index}
              className="min-w-[270px] max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
              tabIndex={0}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
                <div className="mt-2 font-medium text-emerald-700">
                  {item.price}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-gray-200"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-gray-200"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default BestSellers;
