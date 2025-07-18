import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import logo from "../assets/Zarvoc2.png";

export default function ContactUs() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [faqEmail, setFaqEmail] = useState("");
  const [faqMessage, setFaqMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "0accc7d5-adab-43a4-a5b9-b90b7879c4dc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully ✅");
      event.target.reset();
    } else {
      console.error("Error", data);
      setResult("Something went wrong ❌");
    }
  };

  const onFaqSubmit = async (e) => {
    e.preventDefault();
    setFaqMessage("Sending...");

    const formData = new FormData();
    formData.append("access_key", "0accc7d5-adab-43a4-a5b9-b90b7879c4dc");
    formData.append("email", faqEmail);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setFaqMessage("Submitted ✅");
      setFaqEmail("");
    } else {
      console.error("Error", data);
      setFaqMessage("Submission failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img src={logo} alt="Zarvoc Logo" className="w-40 h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-gray-900 font-sans">
        {/* Contact Form Section */}
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">
              Email, call, or complete the form to learn how Zarvoc can solve your messaging problem.
            </p>
            <p className="text-sm text-gray-600">info@zarvoc.com</p>
            <p className="text-sm text-gray-600 mb-2">921-231-221</p>
            <a href="#" className="text-blue-600 underline text-sm">Customer Support</a>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold">Customer Support</h4>
                <p className="text-sm text-gray-600">
                  Our support team is available 24/7 to assist with technical or general questions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Feedback and Suggestions</h4>
                <p className="text-sm text-gray-600">
                  We appreciate feedback and ideas. Your input helps us shape the future of Zarvoc.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Media Inquiries</h4>
                <p className="text-sm text-gray-600">
                  For media-related questions or partnerships, reach out to media@zarvoc.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                className="w-full border rounded-lg px-4 py-2"
              />
              <textarea
                name="message"
                placeholder="How can we help?"
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
              >
                Submit
              </button>
              {result && (
                <p className="text-center text-sm text-green-600 mt-2">{result}</p>
              )}
              <p className="text-xs text-center text-gray-500">
                By contacting us, you agree to our{" "}
                <a className="underline" href="#">Terms of service</a> and{" "}
                <a className="underline" href="#">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6195134142135!2d77.68777847512216!3d12.93215878737963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a8d37051e1%3A0x441b54d2e7912e06!2sEmbassy%20TechVillage!5e0!3m2!1sen!2sin!4v1752650865941!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zarvoc Location"
              ></iframe>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <h4 className="text-lg font-medium">Connecting Near and Far</h4>
              <p className="mt-2 text-sm">
                Zarvoc Inc. <br />
                Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
                Outer Ring Road, Devarabeesanahalli Village, <br />
                Bengaluru, 560103, <br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-100 py-10">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
            <div className="mb-6">
              <h4 className="text-lg font-medium">Do you have any questions for us?</h4>
              <form className="mt-2 flex gap-4" onSubmit={onFaqSubmit}>
                <input
                  type="email"
                  name="email"
                  value={faqEmail}
                  onChange={(e) => setFaqEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 border rounded-lg px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
              {faqMessage && (
                <p className="text-sm text-green-600 mt-2">{faqMessage}</p>
              )}
            </div>

            <div className="space-y-4">
              {[{
                q: "What makes Zarvoc different from other e-commerce platforms?",
                a: "Zarvoc stands out with its user-friendly interface, lightning-fast performance, and a carefully curated collection of quality products."
              }, {
                q: "How secure is shopping on Zarvoc?",
                a: "We use industry-standard encryption and secure payment gateways to protect your personal and payment details."
              }, {
                q: "Can I personalize my Zarvoc experience?",
                a: "Yes! Customize notifications, manage preferences, and track orders in your account."
              }, {
                q: "What features does Zarvoc offer for groups or communities?",
                a: "Group buying, shared wishlists, referral rewards, and curated product collections are all available."
              }].map((item, index) => (
                <details key={index} className="bg-white rounded-lg p-4 shadow">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to experience the ease and excitement of shopping with Zarvoc?
          </h2>
          <div className="space-x-4">
            <Link to="/">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
