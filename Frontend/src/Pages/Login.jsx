import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Assuming you have these components in '../Components/'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

// IMPORTANT: Replace "YOUR_GOOGLE_CLIENT_ID_HERE" with your actual Google Client ID.
// Obtain this from the Google Cloud Console (APIs & Services -> Credentials).
// Ensure your 'Authorized JavaScript origins' in Google Cloud include your app's URL (e.g., http://localhost:3000).
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

const Login = () => { // Renamed from AuthPage to Login as per your file name
    // State for managing local form data (fullName, email, phone, password)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });
    // State to determine if current view is Signup or Signin
    const [isSignup, setIsSignup] = useState(false);
    // State for displaying backend errors
    const [error, setError] = useState('');

    // State to trigger banner content animation
    const [bannerAnimate, setBannerAnimate] = useState(false);

    // Effect to determine the initial active form/mode based on URL query parameter
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode'); // Check for '?mode=signup' in URL

        if (mode === 'signup') {
            setIsSignup(true);
        } else {
            setIsSignup(false);
        }
        setBannerAnimate(true); // Show initial banner content
    }, []);

    // Function to toggle between Sign In and Sign Up modes
    const toggleMode = () => {
        // Start banner content animation out
        setBannerAnimate(false);
        setError(''); // Clear previous errors
        setFormData({ fullName: '', email: '', phone: '', password: '' }); // Clear form fields

        // Delay the form switch and "in" animation to allow "out" animation to play
        setTimeout(() => {
            const newIsSignup = !isSignup;
            setIsSignup(newIsSignup);

            // Update URL to reflect the current mode
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('mode', newIsSignup ? 'signup' : 'signin');
            window.history.pushState({ path: newUrl.href }, '', newUrl.href);

            // Trigger "in" animation for new content
            setBannerAnimate(true);
        }, 300); // This delay should match your banner-content CSS transition duration
    };

    // Handler for local form input changes
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handler for local form submission (Email/Password Sign In/Sign Up)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

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
            window.location.href = '/'; // Redirect to home on success

        } catch (err) {
            console.error('Local Auth Error:', err);
            setError(err.response?.data?.message || err.response?.data?.error || 'Something went wrong');
        }
    };

    // Handler for successful Google authentication
    const handleGoogleSuccess = async (credentialResponse) => {
        console.log("Google Login/Signup Success:", credentialResponse);
        setError(''); // Clear previous errors

        try {
            // Send the Google ID token to your backend for verification
            const response = await axios.post('http://localhost:3000/api/auth/google', {
                token: credentialResponse.credential
            });

            if (response.data) {
                alert(`Welcome, ${response.data.name || response.data.email || 'User'}! Authenticated via Google.`);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Assuming your backend returns user data
                window.location.href = '/'; // Redirect to home on success
            }

        } catch (err) {
            console.error("Error during Google authentication with backend:", err);
            setError(err.response?.data?.message || err.response?.data?.error || 'Google authentication failed on backend.');
        }
    };

    // Handler for failed Google authentication
    const handleGoogleError = () => {
        console.log('Google Login/Signup Failed');
        setError('Google authentication failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Navbar />
            <div className="flex flex-col min-h-[calc(100vh-120px)] items-center justify-center bg-gray-100 py-8 px-4">
                {/*
                    The errors you are seeing (TS1005, TS1381) are typically caused by
                    incorrect syntax *inside* the <style>{`...`}</style> block.
                    Ensure the CSS is a plain string. No JavaScript template literals
                    or variable interpolations should be directly within this string
                    unless the entire string itself is a template literal.
                    The previous code's CSS was already correctly formatted as a single string.
                    Perhaps an accidental character or incomplete curly brace was added.
                    I've verified the CSS below to ensure it's a valid string literal.
                */}
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
                    {/* Banner Section with Animation */}
                    <div className="banner-section">
                        <div className={`banner-content ${bannerAnimate ? 'active' : ''}`}>
                            <h2>Your Journey Starts Here!</h2>
                            <p>Sign in or sign up to explore amazing products and exclusive offers.</p>
                            <img src="https://placehold.co/350x200/007bff/ffffff?text=Great+Deals+Await!" alt="E-commerce promotional banner" className="banner-image" />
                        </div>
                    </div>

                    <div className="auth-section">
                        <h1>Welcome!</h1>
                        {/* Error message display */}
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

                                <div className="google-login-button-wrapper">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                    />
                                </div>
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
                                        name="confirm_password"
                                        className="form-input"
                                        placeholder="Confirm your password"
                                        onChange={handleChange} // You'd need to add confirm_password to formData or handle validation here
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>

                                <div className="divider">
                                    <span>OR</span>
                                </div>

                                <div className="google-login-button-wrapper">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </GoogleOAuthProvider>
    );
};

export default Login;
