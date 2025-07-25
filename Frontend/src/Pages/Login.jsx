// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { auth, provider } from '../../utils/firebase';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                email,
                password,
            });
            console.log("login data ", data);


            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('userId', data.user.id);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google-firebase`, {
                token: idToken,
            });

            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err) {
            setError('Google Sign-in failed.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gray-100">
                <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Left Section: Login Form */}
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>
                        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-gray-50"
                        >
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                            Log in with Google
                        </button>

                        <div className="text-center my-4 text-sm text-gray-500">OR LOGIN WITH EMAIL</div>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 mb-4 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Your Password"
                                className="w-full p-3 mb-4 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm">
                                    <input type="checkbox" className="mr-2" />
                                    Keep me logged in
                                </label>
                                {/* <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Forgot password
                                </a> */}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#070A52] text-white py-2 rounded hover:bg-[#FFCC00]"
                            >
                                Log in
                            </button>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Don’t have an account?{' '}
                            <span
                                onClick={() => navigate('/register')}
                                className="text-blue-600 hover:underline cursor-pointer"
                            >
                                Sign up
                            </span>
                        </p>
                    </div>

                    {/* Right Section: Illustration */}
                    <div className="w-full md:w-1/2 bg-blue-50 flex items-center justify-center p-6 relative">

                        <img
                            src="https://i.pinimg.com/736x/b5/a9/78/b5a9786bab9f1536f9a1e0b6e8d8c594.jpg"
                            alt="Illustration"
                            className="max-w-full"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
