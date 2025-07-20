import React, { useState } from 'react';
import Navbar from '../Components/Navbar';  
import Footer from '../Components/Footer';


const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isSignup) {
      const exists = users.find(user => user.email === email);
      if (exists) {
        setError('User already exists. Please sign in.');
        return;
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('userId', email);
      alert('Signup successful!');
      window.location.href = '/';
    } else {
      const matchedUser = users.find(user => user.email === email && user.password === password);
      if (!matchedUser) {
        setError('Invalid credentials. Please try again.');
        return;
      }
      localStorage.setItem('userId', matchedUser.email);
      alert('Login successful!');
      window.location.href = '/';
    }
  };

  return (
    <>
    <Navbar />
    <div className="h-[500px] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
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
