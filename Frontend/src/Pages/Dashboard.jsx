import React, { useState } from "react"; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  const salesData = [
    { year: "2015", sales: 20 },
    { year: "2016", sales: 15 },
    { year: "2017", sales: 22 },
    { year: "2018", sales: 35 },
    { year: "2019", sales: 18 },
    { year: "2020", sales: 30 },
  ];

  const topProducts = [
    { name: "Red Tape Sports Shoes for Men", sales: 29, available: true },
    { name: "Fastrack FS1 Pro Smartwatch", sales: 12, available: true },
    { name: "Leriya Fashion Men's Shirt", sales: 7, available: true },
  ];

  const [orders, setOrders] = useState([
    {
      id: "#2456JL",
      product: "Nike Sportswear",
      date: "Jan 12, 12:23 pm",
      price: "₹100",
      payment: "Transfer",
      status: "Delivered",
    },
    {
      id: "#2456JL",
      product: "Nike Sportswear",
      date: "Jan 12, 12:23 pm",
      price: "₹100",
      payment: "Transfer",
      status: "Shipped",
    },
    {
      id: "#2456JL",
      product: "Nike Sportswear",
      date: "Jan 12, 12:23 pm",
      price: "₹100",
      payment: "Transfer",
      status: "Confirmed",
    },
  ]);

  const statusColor = {
    Delivered: "bg-yellow-400 text-black",
    Shipped: "bg-blue-500 text-white",
    Confirmed: "bg-green-500 text-white",
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 font-sans space-y-8">
      {/* Header */}
      <header className="bg-[#070A52] text-white rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold">Hi, Seller</h1>
        <p className="text-lg mt-2">
          Welcome back, seller! Ready to grow your business today?
        </p>
      </header>

      {/* Stats Section */}
<section className="grid grid-cols-1 sm:grid-cols-3 gap-10">
  {[
    { label: "Total Earnings", value: "₹1000" },
    { label: "Product Added", value: "20" },
    { label: "Product Sold", value: "10" },
  ].map((stat, i) => (
    <div
      key={i}
      className="bg-[#FFCC00] p-4 rounded-xl text-center shadow-md"
    >
      <h2 className="text-base font-semibold">{stat.label}</h2>
      <p className="text-4xl font-bold mt-1">{stat.value}</p>
    </div>
  ))}
</section>


      {/* Charts & Top Products */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">Sales Over the Years</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#070A52"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Selling Products</h2>
            <button className="text-blue-600 font-medium text-sm">
              See All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.sales} Sales</p>
                </div>
                <span className="text-green-600 text-sm font-semibold">
                  {item.available ? "• Available" : "Out of Stock"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Orders */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Product</th>
                <th className="py-2 px-4">Order Date</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Payment</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.product}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.price}</td>
                  <td className="py-2 px-4">{order.payment}</td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(idx, e.target.value)
                      }
                      className={`px-2 py-1 text-xs font-medium rounded-full border outline-none ${statusColor[order.status]}`}
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

     {/* Added Products Section */}
<section className="bg-white p-6 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Added Products</h2>
  <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
    {[
      {
        name: "Nike Sports Shoes",
        desc: "High quality running shoes.",
        price: "₹1,200",
        stock: "15 pcs",
        img: "https://i.pinimg.com/736x/0e/66/28/0e6628c244eba991906e52dd0d033bc2.jpg",
      },
      {
        name: "Fastrack Smartwatch",
        desc: "Feature-packed smartwatch.",
        price: "₹3,500",
        stock: "10 pcs",
        img: "https://i.pinimg.com/736x/5a/0b/a7/5a0ba7f3a3f13cbb6ce0f83db3f9dfa1.jpg",
      },
      {
        name: "Leriya Men's Shirt",
        desc: "Cotton casual shirt for men.",
        price: "₹799",
        stock: "25 pcs",
        img: "https://i.pinimg.com/736x/64/9a/b3/649ab3625052cfafd0be9e4f29995cbe.jpg",
      },
      {
        name: "Red Tape Sneakers",
        desc: "Trendy casual sneakers.",
        price: "₹1,800",
        stock: "12 pcs",
        img: "https://i.pinimg.com/736x/43/c0/fa/43c0fa091f98ebf2d9156ce695b36e2d.jpg",
      },
      {
        name: "Apple AirPods",
        desc: "Wireless earbuds with great sound.",
        price: "₹10,999",
        stock: "8 pcs",
        img: "https://i.pinimg.com/736x/93/52/3d/93523debf14f1aa3223e67f0c9a8b6c6.jpg",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="min-w-[240px] bg-white border rounded-xl p-4 shadow hover:shadow-xl transition"
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-64 object-cover rounded-lg mb-3"
        />
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-500 text-sm">{item.desc}</p>
        <p className="mt-2 text-blue-600 font-bold text-lg">{item.price}</p>
        <p className="text-sm text-gray-600">Stock: {item.stock}</p>
      </div>
    ))}
  </div>
</section>



      {/* Add Product Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/productdetails")}
          className="bg-[#070A52] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#FFCC00] transition duration-300 "
        >
          + Add Product
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
}
