// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../utils/firebase'; // Adjust path if needed
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

const Login = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const [bannerAnimate, setBannerAnimate] = useState(false);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');

        if (mode === 'signup') {
            setIsSignup(true);
        } else {
            setIsSignup(false);
        }
        setBannerAnimate(true);
    }, []);

    const toggleMode = () => {
        setBannerAnimate(false);
        setError('');
        setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });

        setTimeout(() => {
            const newIsSignup = !isSignup;
            setIsSignup(newIsSignup);

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('mode', newIsSignup ? 'signup' : 'signin');
            window.history.pushState({ path: newUrl.href }, '', newUrl.href);

            setBannerAnimate(true);
        }, 300);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isSignup && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const url = isSignup
            ? `${BASE_API_URL}/api/users/signup`
            : `${BASE_API_URL}/api/users/login`;

        try {
            const { data } = await axios.post(url, formData);

            if (isSignup) {
                alert(data.message || 'Signup successful! You can now log in.');
                // After successful signup, switch to login mode
                toggleMode(); 
            } else {
                alert(data.message || 'Login successful!');
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/'); // Redirect to home page
            }

        } catch (err) {
            console.error('Local Auth Error:', err);
            setError(err.response?.data?.message || err.message || 'Something went wrong.');
        }
    };

    const handleFirebaseGoogleSignIn = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            console.log("Firebase Google Login Success:", result.user);

            const response = await axios.post(`${BASE_API_URL}/api/auth/google-firebase`, {
                token: idToken
            });

            if (response.data) {
                alert(`Welcome, ${response.data.user.fullName || response.data.user.email || 'User'}! Authenticated via Google.`);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/'); // Redirect to home page
            }

        } catch (err) {
            console.error("Error during Firebase Google authentication:", err);
            const errorMessage = err.message || 'Firebase Google authentication failed.';
            setError(errorMessage);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-[calc(100vh-120px)] items-center justify-center bg-gray-100 py-8 px-4">
                <style>{`
                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #f0f2f5;
                        margin: 0;
                    }

                    .main-container {
                        margin: auto;
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        max-width: 75rem;
                        background-color: #fff;
                        box-shadow: 0 0.625rem 1.5625rem rgba(148, 187, 10, 0.1);
                        border-radius: 0.75rem;
                        overflow: hidden;
                        transition: flex-direction 0.5s ease-in-out;
                    }

                    @media (min-width: 768px) {
                        .main-container {
                            flex-direction: row;
                        }
                        .main-container.reverse-layout {
                            flex-direction: row-reverse;
                        }

                        .banner-section {
                            border-radius: 0.75rem 0 0 0.75rem;
                        }
                        .reverse-layout .banner-section {
                            border-radius: 0 0.75rem 0.75rem 0;
                        }
                        .auth-section {
                            border-radius: 0 0.75rem 0.75rem 0;
                        }
                        .reverse-layout .auth-section {
                            border-radius: 0.75rem 0 0 0.75rem;
                        }
                    }

                    .auth-section {
                        padding: 2.5rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 100%;
                    }

                    .auth-section h1 {
                        font-size: 2.25rem;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 1.875rem;
                        text-align: center;
                    }

                    .tab-buttons {
                        display: flex;
                        background-color: #f0f2f5;
                        border-radius: 0.5rem;
                        padding: 0.25rem;
                        margin-bottom: 2.5rem;
                    }

                    .tab-button {
                        flex: 1;
                        padding: 0.875rem 1.25rem;
                        font-size: 1rem;
                        font-weight: 500;
                        color: #555;
                        background-color: transparent;
                        border: none;
                        border-radius: 0.375rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    }

                    .tab-button:hover { background-color: #e5e7eb; }
                    .tab-button.active {
                        background-color: #42d9e4;
                        color: #fff;
                        box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
                    }

                    .form-section { display: none; flex-direction: column; }
                    .form-section.active { display: flex; }

                    .form-group { margin-bottom: 1.5rem; }
                    .form-group label {
                        display: block;
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: #444;
                        margin-bottom: 0.5rem;
                    }
                    .form-input {
                        width: 100%;
                        padding: 0.875rem 1rem;
                        border: 1px solid #d1d5db;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                        color: #333;
                        transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    }
                    .form-input:focus {
                        outline: none;
                        border-color: #42d9e4;
                        box-shadow: 0 0 0 0.1875rem rgba(59, 130, 246, 0.2);
                    }

                    .btn {
                        width: 100%;
                        padding: 0.875rem 1.25rem;
                        border: none;
                        border-radius: 0.5rem;
                        font-size: 1.1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background-color 0.3s ease, box-shadow 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.625rem;
                    }
                    .btn-primary {
                        background-color: #3b82f6;
                        color: #fff;
                        box-shadow: 0 0.25rem 0.75rem rgba(59, 130, 246, 0.3);
                        margin-bottom: 1rem;
                    }
                    .btn-primary:hover {
                        background-color: #2563eb;
                        box-shadow: 0 0.375rem 1rem rgba(59, 130, 246, 0.4);
                    }

                    .google-login-button-wrapper > div {
                        width: 100% !important;
                        display: flex;
                        justify-content: center;
                    }

                    .divider {
                        display: flex;
                        align-items: center;
                        text-align: center;
                        margin: 1.5rem 0;
                    }
                    .divider::before, .divider::after {
                        content: '';
                        flex: 1;
                        border-bottom: 1px solid #d1d5db;
                    }
                    .divider span {
                        padding: 0 1rem;
                        font-size: 0.85rem;
                        color: #6b7280;
                    }

                    .banner-section {
                        background: linear-gradient(135deg, #3b82f6, #9333ea);
                        padding: 2.5rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        color: #fff;
                        width: 100%;
                        min-height: 15.625rem;
                        border-bottom-left-radius: 0.75rem;
                        border-bottom-right-radius: 0.75rem;
                        position: relative;
                        overflow: hidden;
                    }
                    .banner-content {
                        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                        opacity: 0;
                        transform: translateY(20px);
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        color: #fff;
                    }

                    .banner-content.active {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .banner-section h2 {
                        font-size: 2.5rem;
                        font-weight: 800;
                        line-height: 1.2;
                        margin-bottom: 0.9375rem;
                    }
                    .banner-section p {
                        font-size: 1.25rem;
                        font-weight: 300;
                        opacity: 0.9;
                        margin-bottom: 1.875rem;
                    }
                    .banner-image {
                        max-width: 100%;
                        height: auto;
                        border-radius: 0.5rem;
                        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
                        margin-top: 1.25rem;
                    }
                `}</style>

                <div className={`main-container ${isSignup ? 'reverse-layout' : ''}`}>
                    <div className="banner-section">
                        <div className={`banner-content ${bannerAnimate ? 'active' : ''}`}>
                            <h2>Your Journey Starts Here!</h2>
                            <p>Sign in or sign up to explore amazing products and exclusive offers.</p>
                            <img src="https://placehold.co/350x200/007bff/ffffff?text=Great+Deals+Await!" alt="E-commerce promotional banner" className="banner-image" />
                        </div>
                    </div>

                    <div className="auth-section">
                        <h1>Welcome!</h1>
                        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                        <div className="tab-buttons">
                            <button
                                id="signup-tab"
                                className={`tab-button ${isSignup ? 'active' : ''}`}
                                onClick={toggleMode}
                            >
                                Sign Up
                            </button>
                            <button
                                id="signin-tab"
                                className={`tab-button ${!isSignup ? 'active' : ''}`}
                                onClick={toggleMode}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Sign In Form Section */}
                        <div id="signin-form-section" className={`form-section ${!isSignup ? 'active' : ''}`}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="signin-email">Email Address</label>
                                    <input
                                        type="email"
                                        id="signin-email"
                                        name="email"
                                        className="form-input"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signin-password">Password</label>
                                    <input
                                        type="password"
                                        id="signin-password"
                                        name="password"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign In</button>

                                <div className="divider">
                                    <span>OR</span>
                                </div>

                                {/* Firebase Google Sign-in Button */}
                                <button
                                    type="button"
                                    onClick={handleFirebaseGoogleSignIn}
                                    className="btn bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.24 10.27v2.4h3.64c-.16 1.09-.64 2-1.37 2.68-.73.68-1.7.99-2.73.99-2.2 0-3.92-1.63-3.92-3.88s1.72-3.88 3.92-3.88c1.23 0 2.29.47 3.09 1.25l1.7-1.7c-1.07-1.07-2.5-1.74-4.2-1.74-3.56 0-6.4 2.89-6.4 6.45s2.84 6.45 6.4 6.45c3.56 0 6.4-2.89 6.4-6.45 0-.46-.07-.9-.19-1.32h-6.21zm-1.89-4.82c-.85-.85-1.92-1.3-3.08-1.3-2.18 0-3.9 1.76-3.9 3.92s1.72 3.92 3.9 3.92c1.16 0 2.23-.45 3.08-1.3l-1.42-1.4z" />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </form>
                        </div>

                        {/* Sign Up Form Section */}
                        <div id="signup-form-section" className={`form-section ${isSignup ? 'active' : ''}`}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="signup-name">Full Name</label>
                                    <input
                                        type="text"
                                        id="signup-name"
                                        name="fullName"
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-email">Email Address</label>
                                    <input
                                        type="email"
                                        id="signup-email"
                                        name="email"
                                        className="form-input"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-phone">Mobile Number</label>
                                    <input
                                        type="tel"
                                        id="signup-phone"
                                        name="phone"
                                        className="form-input"
                                        placeholder="Enter your mobile number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-password">Set Password</label>
                                    <input
                                        type="password"
                                        id="signup-password"
                                        name="password"
                                        className="form-input"
                                        placeholder="Set your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        name="confirmPassword"
                                        className="form-input"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>

                                <div className="divider">
                                    <span>OR</span>
                                </div>

                                {/* Firebase Google Sign-in Button */}
                                <button
                                    type="button"
                                    onClick={handleFirebaseGoogleSignIn}
                                    className="btn bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.24 10.27v2.4h3.64c-.16 1.09-.64 2-1.37 2.68-.73.68-1.7.99-2.73.99-2.2 0-3.92-1.63-3.92-3.88s1.72-3.88 3.92-3.88c1.23 0 2.29.47 3.09 1.25l1.7-1.7c-1.07-1.07-2.5-1.74-4.2-1.74-3.56 0-6.4 2.89-6.4 6.45s2.84 6.45 6.4 6.45c3.56 0 6.4-2.89 6.4-6.45 0-.46-.07-.9-.19-1.32h-6.21zm-1.89-4.82c-.85-.85-1.92-1.3-3.08-1.3-2.18 0-3.9 1.76-3.9 3.92s1.72 3.92 3.9 3.92c1.16 0 2.23-.45 3.08-1.3l-1.42-1.4z" />
                                    </svg>
                                    Sign up with Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
