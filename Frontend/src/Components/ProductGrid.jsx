import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    title:
      "TheGiftKart Shockproof Crystal Clear Back Cover Case for Mi Redmi 13 5G / Poco M6 Plus 5G",
    mainImage:
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Purple-5_800x.jpg?v=1727357376",
    price: 199,
    mrp: 999,
    smallImages: [
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Brown-9_800x.jpg?v=1727357396",
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Pink-10_800x.jpg?v=1727357401",
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Dark-Green-8_800x.jpg?v=1727357391",
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Sky-Blue-4_800x.jpg?v=1727357370",
    ],
    heading: "Keep shopping for",
  },
  {
    title: "YELONA Gorilla Grip Durable Kitchen Cutting Board Set of 3",
    mainImage:
      "https://s.alicdn.com/@sc04/kf/A72985e53e4294e76ac33d971b3edef0f8.jpg_720x720q50.jpg",
    price: 749,
    mrp: 1999,
    smallImages: [
      "https://s.alicdn.com/@sc04/kf/Ha69f187a2fb949eb9a0eddd522bd8ba48.jpg_720x720q50.jpg",
      "https://s.alicdn.com/@sc04/kf/H3eddaab0557346c9942fc8805e662606M.jpg_720x720q50.jpg",
      "https://s.alicdn.com/@sc04/kf/Hb9d41cbe8ba34062a6518fac4f436742D.jpg_720x720q50.jpg",
      "https://s.alicdn.com/@sc04/kf/H5f9f7a4b29a247baa7508719a8a1d482z.png_720x720q50.jpg",
    ],
    heading: "Up to 60% off | Top kitchen essentials available nearby",
  },
  {
    title:
      "eightone Women Floral Print Cotton Midi Dress, Short Sleeve, White with Yellow and Red Flowers",
    mainImage:
      "https://i.pinimg.com/736x/ff/aa/2d/ffaa2d1e18872b06e95a4d8b393e6e3a.jpg",
    price: 670,
    mrp: 1999,
    smallImages: [
      "https://i.pinimg.com/736x/b6/52/1e/b6521e1258ab935cf5b4eb705f02610e.jpg",
      "https://i.pinimg.com/736x/ee/e8/8e/eee88e5ecfef1a0405edfecc4faa079a.jpg",
      "https://i.pinimg.com/736x/0f/f8/75/0ff875c7298e459964264782da3a0ff1.jpg",
      "https://i.pinimg.com/736x/cb/51/df/cb51dfe6680936620da07eb36f4b5b6b.jpg",
    ],
    heading: "Up to 75% off | Get casual ready from Small Businesses",
  },
  {
    title: "YELONA Gorilla Grip Durable Kitchen Cutting Board Set of 3",
    mainImage:
      "https://m.media-amazon.com/images/I/611fDFAhGgL._AC_SY350_.jpg",
    price: 749,
    mrp: 1999,
    smallImages: [
      "https://m.media-amazon.com/images/I/61eRCp5blLL._AC_SY110_.jpg",
      "https://m.media-amazon.com/images/I/71y2aqXqVHL._AC_SY110_.jpg",
      "https://m.media-amazon.com/images/I/61OKBU87U5L._AC_SY110_.jpg",
      "https://m.media-amazon.com/images/I/611fDFAhGgL._AC_SY110_.jpg",
    ],
    heading: "Pick up where you left off",
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    const query = new URLSearchParams({
      title: product.title,
      mainImage: product.mainImage,
      price: product.price,
      mrp: product.mrp,
      smallImages: product.smallImages.join(","),
    }).toString();
    navigate(`/product_detail?${query}`);
  };

  return (
    <div className="bg-gray-100 px-4 py-6 font-inter">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
        Top Picks For You
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[18rem] bg-white rounded-lg shadow-md p-4 cursor-pointer hover:scale-[1.01] hover:-translate-y-1 transition-transform flex flex-col justify-between"
            onClick={() => handleCardClick(product)}
          >
            <div className="h-[4.5rem] overflow-hidden mb-2">
              <h3 className="font-semibold text-lg">{product.heading}</h3>
            </div>
            <div className="flex items-center justify-center h-48 mb-4">
              <img
                src={product.mainImage}
                alt="Product"
                className="max-w-full max-h-full object-contain rounded-md shadow-sm"
              />
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              ₹{product.price}
              <sup className="text-xs align-super">00</sup>
              <span className="text-sm text-gray-500 line-through font-normal ml-1">
                M.R.P: ₹{product.mrp}.00
              </span>
            </div>
            <div className="flex gap-2 flex-wrap items-center h-10 mb-4">
              {product.smallImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`small-${i}`}
                  className="w-10 h-10 rounded-md border border-gray-200"
                />
              ))}
            </div>
            <span className="text-sm text-blue-600 hover:text-blue-700 mt-auto">
              See more
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
