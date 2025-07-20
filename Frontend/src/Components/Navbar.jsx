import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Fashion",
      href: "/category?cat=fashionProducts",
      links: ["Men", "Women", "Kids", "Accessories", "Luggages"],
    },
    {
      label: "Electronics",
      href: "/category?cat=electronic",
      links: ["Laptops", "Tablets", "Cameras", "Headphones", "Smartwatches"],
    },
    {
      label: "Home & Furniture",
      href: "/category?cat=furnitureProducts",
      links: ["Living Room", "Bedroom", "Kitchen", "Office", "Outdoor"],
    },
    { label: "Appliances", href: "/category?cat=kitchenProducts" },
    {
      label: "Toys",
      href: "/category?cat=childrenToysProducts",
      links: ["Action Figures", "Dolls", "Puzzles", "Board Games"],
    },
    { label: "Cosmetics", href: "/category?cat=cosmeticProducts" },
    { label: "Kilos", href: "/category?cat=foodProducts" },
    { label: "Sports", href: "/category?cat=sportsProducts" },
  ];

  return (
    <nav className="bg-white w-full p-4 rounded-2xl shadow-md font-inter">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="text-3xl font-bold text-blue-700 whitespace-nowrap">
          𝓩𝓪𝓻𝓿𝓸𝓬
        </div>

        {/* Search Bar */}
        <div className="w-full md:flex-1 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for products, categories, or ideas..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {[
            {
              to: "/welcomepage",
              color: "from-blue-500 to-purple-600",
              iconPath:
                "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0",
            },
            {
              to: "/cartpage",
              color: "from-green-400 to-teal-500",
              iconPath:
                "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17a2 2 0 100 4 2 2 0 000-4z",
            },
            {
              to: "/notifications",
              color: "from-pink-500 to-red-500",
              iconPath:
                "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 11-4 0m4 0h-4",
            },
          ].map((item, idx) => (
            <Link to={item.to} key={idx}>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-r ${item.color} hover:shadow-lg transition-transform hover:-translate-y-1`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.iconPath}
                  />
                </svg>
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Nav Links */}
      <div className="mt-6">
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-center py-2 px-4 rounded-full font-semibold shadow-md">
          <ul className="flex flex-wrap justify-center items-center gap-20">
            {navItems.map((item, idx) => (
              <li key={idx} className="relative group inline-block">
                <Link
                  to={item.href || "#"}
                  className="text-white hover:text-gray-200 flex items-center"
                >
                  {item.label} {item.links && <span className="ml-1">▾</span>}
                </Link>

                {item.links && (
                  <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg z-50 py-2 px-3 text-left min-w-[10rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.links.map((sub, subIdx) => (
                      <li
                        key={subIdx}
                        className="py-2 px-3 hover:bg-gray-100 rounded"
                      >
                        <Link
                          to={`${item.href}&sub=${encodeURIComponent(sub)}`}
                          className="block hover:text-blue-500"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
