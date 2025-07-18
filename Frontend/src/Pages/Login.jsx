import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ fullName: '', email: '', phone: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? 'http://localhost:3000/api/users/signup'
      : 'http://localhost:3000/api/users/login';

    try {
      const { data } = await axios.post(url, formData);
      
      if (isSignup) {
        alert('Signup successful!');
      } else {
        alert('Login successful!');
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-[550px] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={toggleMode} className="text-blue-600 underline ml-1">
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
