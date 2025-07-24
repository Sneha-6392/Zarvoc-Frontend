import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BASE_API_URL =
  import.meta.env.VITE_BACKEND_API_URL || import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/api/users/signup`,
        formData
      );

      alert("Signup successful. Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Create Account</h2>
            <a
              href="/login"
              className="text-sm text-blue-700 underline mb-6 inline-block"
            >
              Already have an account? Sign In
            </a>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 mb-3 border border-gray-300 rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 mb-3 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mb-3 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mb-3 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#070A52] text-white py-2 rounded hover:bg-[#FFCC00] transition"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Right - Image */}
          <div className="w-full md:w-1/2 bg-blue-50 flex items-center justify-center p-4">
            <img
              src="https://i.pinimg.com/736x/9d/f8/98/9df89840e668b11f0165040513d968b1.jpg"
              alt="Signup Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
