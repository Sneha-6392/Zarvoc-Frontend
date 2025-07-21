import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar'; // Assuming Navbar is part of your theme
import Footer from '../Components/Footer'; // Assuming Footer is part of your theme
import { HashLoader } from 'react-spinners'; // Import HashLoader

function HelpCenter() {
  const [isTawkApiLoaded, setIsTawkApiLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate a loading period for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the simulated delay
    }, 3000); // 3 seconds delay

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function () {
      setIsTawkApiLoaded(true);
    };
    if (window.Tawk_API && window.Tawk_API.isLoaded) {
      setIsTawkApiLoaded(true);
    }

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // Update search query state
  };

  const startLiveChat = () => {
    if (isTawkApiLoaded && window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
      toast.success("Connecting you to UrbanTales Live Chat! A representative will be with you shortly.");
    } else {
      toast.error("Live chat is not available right now. Please try again in a moment or contact us via email.");
      console.warn("Tawk_API is not loaded or ready yet.", window.Tawk_API);
    }
  };

  const redirectToGmailCompose = () => {
    const recipient = 'arpanjain00123@gmail.com';
    const bodyText = encodeURIComponent('Hi, I am visiting from your UrbanTalesian website.');
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&body=${bodyText}`;
    
    window.open(gmailComposeUrl, '_blank');
  };

  // Function to filter FAQs based on search query
  const filterFaqs = (faqs) => {
    if (!searchQuery) {
      return faqs; // If no search query, return all FAQs
    }
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery) || 
      faq.answer.toLowerCase().includes(searchQuery)
    );
  };

  // Define your FAQ data (consider moving this to a separate data file if it grows large)
  const faqData = {
    orderingPayments: [
      { question: "How do I place an order?", answer: "To place an order, simply browse our categories, add desired items to your cart, and proceed to checkout. Follow the on-screen prompts to enter your shipping details and payment information." },
      { question: "What payment methods do you accept?", answer: "We accept major credit/debit cards (Visa, MasterCard, RuPay), Net Banking, UPI, and select digital wallets. All transactions are secure and encrypted." },
      { question: "Can I change or cancel my order?", answer: "Orders can be changed or canceled only if they haven't been processed for shipping. Please contact our support team immediately via live chat or email with your order number." },
      { question: "Is my payment information secure?", answer: "Absolutely. We use industry-standard SSL encryption and secure payment gateways to protect your personal and financial data. Your security is our top priority." },
    ],
    shippingDelivery: [
      { question: "What are your shipping options and costs?", answer: "We offer standard and express shipping options across India. Shipping costs vary based on your location and chosen delivery speed, which will be calculated at checkout." },
      { question: "How long will my order take to arrive?", answer: "Standard delivery usually takes 3-7 business days, while express delivery takes 1-3 business days, depending on your location." },
      { question: "How can I track my order?", answer: "Once your order is dispatched, you'll receive a tracking number via email and SMS. You can track your order status directly on our Track Order page." },
      { question: "Do you ship internationally?", answer: "Currently, we only ship within India. We hope to expand our shipping destinations soon!" },
    ],
    returnsRefunds: [
      { question: "What is your return policy?", answer: "We offer a 7-day return policy for most items, starting from the date of delivery. Items must be unused, in original packaging, and with all tags intact. Some exclusions may apply." },
      { question: "How do I return an item?", answer: "To initiate a return, log in to your account, go to 'My Orders,' select the item you wish to return, and follow the instructions. You can also contact our support team for assistance." },
      { question: "When will I receive my refund?", answer: "Once your returned item is received and inspected, refunds are typically processed within 5-7 business days to your original payment method." },
      { question: "What if my item is damaged or incorrect?", answer: "If you receive a damaged or incorrect item, please contact us immediately (within 24 hours of delivery) with photos of the product and packaging. We'll arrange for a replacement or full refund." },
    ],
    accountManagement: [
      { question: "How do I create an account?", answer: "Click on the 'Login/Sign Up' icon at the top right corner of our website and follow the simple steps to register." },
      { question: "How do I reset my password?", answer: "On the login page, click 'Forgot Password?' and enter your registered email address. We'll send you a link to reset your password." },
      { question: "How can I update my profile information?", answer: "Log in to your account, navigate to 'My Profile', and you can edit your personal details, shipping addresses, and communication preferences there." },
      { question: "What are the benefits of having an account?", answer: "An account allows for faster checkout, order tracking, viewing order history, managing wishlists, and receiving exclusive offers." },
    ],
  };

  // Show loader while loading is true
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {/* HashLoader component with customizable color and size */}
        <HashLoader color="#3182CE" size={80} />
      </div>
    );
  }

  return (
    <>
      <Navbar /> {/* Assuming Navbar is part of your website's consistent theme */}
      <div className="bg-gray-50 text-gray-900 font-sans min-h-screen"> {/* Main container background and text color */}
        <div className="container mx-auto p-6 md:p-10">
          <header className="text-center mb-12 pt-8"> {/* Added padding top */}
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">UrbanTales Help Center</h1>
            <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
              Your guide to a seamless shopping experience. Find answers to common questions, explore our FAQs, or connect with our support team.
            </p>
          </header>

          <hr className="my-10 border-gray-300" />

          {/* Search Bar Section */}
          <section className="max-w-3xl mx-auto mb-16 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 text-center">Search Our Knowledge Base</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions (e.g., 'shipping,' 'returns,' 'password reset')"
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 text-lg text-gray-700"
                onChange={handleSearch}
                value={searchQuery}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                Showing results for "{searchQuery}"
              </p>
            )}
          </section>

          <hr className="my-10 border-gray-300" />

          {/* Popular Topics Section */}
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Popular Topics</h2>

            {/* Ordering & Payments */}
            {filterFaqs(faqData.orderingPayments).length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 hover:shadow-xl transition duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <span className="text-3xl mr-3">🛒</span> Ordering & Payments
                </h3>
                <ul className="space-y-6">
                  {filterFaqs(faqData.orderingPayments).map((faq, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-xl text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shipping & Delivery */}
            {filterFaqs(faqData.shippingDelivery).length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 hover:shadow-xl transition duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <span className="text-3xl mr-3">🚚</span> Shipping & Delivery
                </h3>
                <ul className="space-y-6">
                  {filterFaqs(faqData.shippingDelivery).map((faq, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-xl text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer.includes("Track Order") ? (
                          <>
                            {faq.answer.split('Track Order')[0]}
                            <Link to="/trackorder" className="text-blue-600 hover:underline font-medium">Track Order</Link>
                            {faq.answer.split('Track Order')[1]}
                          </>
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Returns & Refunds */}
            {filterFaqs(faqData.returnsRefunds).length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 hover:shadow-xl transition duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <span className="text-3xl mr-3">↩️</span> Returns & Refunds
                </h3>
                <ul className="space-y-6">
                  {filterFaqs(faqData.returnsRefunds).map((faq, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-xl text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Account Management */}
            {filterFaqs(faqData.accountManagement).length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 hover:shadow-xl transition duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <span className="text-3xl mr-3">👤</span> Account Management
                </h3>
                <ul className="space-y-6">
                  {filterFaqs(faqData.accountManagement).map((faq, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-xl text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer.includes("Login/Sign Up") ? (
                          <>
                            {faq.answer.split('Login/Sign Up')[0]}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">Login/Sign Up</Link>
                            {faq.answer.split('Login/Sign Up')[1]}
                          </>
                        ) : faq.answer.includes("My Profile") ? (
                          <>
                            {faq.answer.split('My Profile')[0]}
                            <Link to="/profile" className="text-blue-600 hover:underline font-medium">My Profile</Link>
                            {faq.answer.split('My Profile')[1]}
                          </>
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No results message */}
            {!searchQuery || (
              filterFaqs(faqData.orderingPayments).length === 0 &&
              filterFaqs(faqData.shippingDelivery).length === 0 &&
              filterFaqs(faqData.returnsRefunds).length === 0 &&
              filterFaqs(faqData.accountManagement).length === 0
            ) && searchQuery && (
              <div className="text-center text-gray-600 text-xl p-8 bg-white rounded-xl shadow-lg">
                <p>No results found for "{searchQuery}". Please try a different search term.</p>
              </div>
            )}
          </section>

          <hr className="my-10 border-gray-300" />

          {/* Contact Section */}
          <section className="max-w-5xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Need More Help? Talk to Us!</h2>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              If you can't find the answer you're looking for, our friendly support team is here to assist you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Live Chat */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center md:justify-start">
                    <span className="text-3xl mr-3">💬</span> Live Chat
                  </h3>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Click the button below to start a chat with one of our representatives for immediate assistance.
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    <span className="font-semibold text-gray-700">Availability:</span> Monday - Saturday, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
                <button
                  onClick={startLiveChat}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 inline-block w-full md:w-auto mt-auto"
                >
                  Start Live Chat
                </button>
              </div>

              {/* Email Support */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center md:justify-start">
                    <span className="text-3xl mr-3">📧</span> Email Support
                  </h3>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Send us an email anytime and we'll get back to you within 24-48 hours.
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    <span className="font-semibold text-gray-700">Email:</span> arpanjain00123@gmail.com
                  </p>
                </div>
                <button
                  onClick={redirectToGmailCompose}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out inline-block w-full md:w-auto mt-auto focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Email Us
                </button>
              </div>

              {/* Phone Support */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center md:justify-start">
                    <span className="text-3xl mr-3">📞</span> Phone Support
                  </h3>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    Prefer to talk? Give us a call during our business hours.
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    <span className="font-semibold text-gray-700">Availability:</span> Monday - Friday, 10:00 AM - 5:00 PM IST
                  </p>
                </div>
                <a
                  href="tel:+91XXXXXXXXXX" // Remember to replace XXXXXXXXXX with your actual phone number
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out inline-block w-full md:w-auto mt-auto focus:outline-none focus:ring-4 focus:ring-purple-300"
                >
                  Call Us
                </a>
                <p className="text-gray-600 text-sm mt-3">+91-XXXXXXXXXX</p>
              </div>
            </div>
          </section>

          <hr className="my-10 border-gray-300" />

          {/* Copyright Section - Updated */}
          <section className="max-w-3xl mx-auto text-center mt-12 mb-6">
            <p className="text-lg text-gray-600">
              &copy; {new Date().getFullYear()} UrbanTales. All rights reserved.
            </p>
          </section>
        </div>
      </div>
      <Footer /> {/* Assuming Footer is part of your website's consistent theme */}
    </>
  );
}

export default HelpCenter;
