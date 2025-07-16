import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";


export default function ContactUs() {
  const [result, setResult] = useState("");
  const [faqEmail, setFaqEmail] = useState("");
  const [faqMessage, setFaqMessage] = useState("");

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
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
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

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-gray-900 font-sans">
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-2">
              Email, call, or complete the form to learn how Zarvoc can solve
              your messaging problem.
            </p>
            <p className="text-sm text-gray-600">info@zarvoc.com</p>
            <p className="text-sm text-gray-600 mb-2">921-231-221</p>
            <a href="#" className="text-blue-600 underline text-sm">
              Customer Support
            </a>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold">Customer Support</h4>
                <p className="text-sm text-gray-600">
                  Our support team is available 24/7 to assist with technical or
                  general questions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Feedback and Suggestions</h4>
                <p className="text-sm text-gray-600">
                  We appreciate feedback and ideas. Your input helps us shape
                  the future of Zarvoc.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Media Inquiries</h4>
                <p className="text-sm text-gray-600">
                  For media-related questions or partnerships, reach out to
                  media@zarvoc.com
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
                By contacting us, you agree to our {" "}
                <a className="underline" href="#">
                  Terms of service
                </a>{" "}
                and {" "}
                <a className="underline" href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-600">[Map Placeholder]</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <h4 className="text-lg font-medium">Connecting Near and Far</h4>
              <p className="mt-2 text-sm">
                Zarvoc Inc.
                <br />
                Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
                Outer Ring Road, Devarabeesanahalli Village,
                <br />
                Bengaluru, 560103,
                <br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-10">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
            <div className="mb-6">
              <h4 className="text-lg font-medium">
                Do you have any questions for us?
              </h4>
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
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  What makes Zarvoc different from other e-commerce platforms?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Zarvoc stands out with its user-friendly interface, lightning-fast performance, and a carefully curated collection of quality products — all designed to make your shopping experience smooth and enjoyable.
                </p>
              </details>
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  How secure is shopping on Zarvoc?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Your security is our top priority. We use industry-standard encryption and secure payment gateways to ensure your personal and payment details are protected at every step.
                </p>
              </details>
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  Can I personalize my Zarvoc experience?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Absolutely! You can manage your preferences, save favorite items, track your orders, and customize your notifications in your account settings for a more tailored shopping journey.
                </p>
              </details>
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  What features does Zarvoc offer for groups or communities?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Zarvoc supports group buying deals, shared wishlists, referral rewards, and the ability to create and share curated product collections — perfect for friends, families, or communities shopping together.
                </p>
              </details>
            </div>
          </div>
        </div>

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
