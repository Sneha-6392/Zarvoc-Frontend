import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-gray-900 font-sans">
        {/* Contact Header */}
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

          {/* Form */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full border rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="How can we help?"
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
              ></textarea>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700">
                Submit
              </button>
              <p className="text-xs text-center text-gray-500">
                By contacting us, you agree to our{" "}
                <a className="underline" href="#">
                  Terms of service
                </a>{" "}
                and{" "}
                <a className="underline" href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        {/* Map & Location */}
        <div className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
              {/* Replace with real map */}
              <span className="text-gray-600">[Map Placeholder]</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <h4 className="text-lg font-medium">Connecting Near and Far</h4>
              <p className="mt-2 text-sm">
                Zarvoc Inc.
                <br />
                Buildings Alyssa, Begonia & Clove Embassy Tech Village, 
                <br />
                Outer Ring Road, Devarabeesanahalli Village,
                <br />
                Bengaluru, 560103,
                <br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-100 py-10">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
            <div className="mb-6">
              <h4 className="text-lg font-medium">
                Do you have any questions for us?
              </h4>
              <div className="mt-2 flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="flex-1 border rounded-lg px-4 py-2"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  What makes Snappy different from other messaging apps?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Snappy focuses on speed, privacy, and intuitive design to
                  deliver a better experience.
                </p>
              </details>
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  How secure are my conversations on Snappy?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  All conversations are end-to-end encrypted to ensure your
                  privacy.
                </p>
              </details>
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  Can I personalize my Snappy experience?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Yes, you can change themes, notification sounds, and more in
                  settings.
                </p>
              </details>
              <details className="bg-white rounded-lg p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  What group features does Snappy offer?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Snappy offers group chats, polls, event scheduling, and shared
                  media galleries.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to experience the speed and simplicity of Snappy?
          </h2>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">
              Learn more
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
