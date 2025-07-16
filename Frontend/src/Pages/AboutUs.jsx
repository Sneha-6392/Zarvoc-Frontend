import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import logo from "../assets/Zarvoc2.png";
import bgImage from "../assets/BG.png";
const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const galaxy = document.getElementById("galaxy");
      const starCount = 60;
      galaxy.innerHTML = "";

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.position = "absolute";
        star.style.borderRadius = "9999px";
        star.style.backgroundColor = "#90cdf4";
        star.style.opacity = "0.7";
        star.style.boxShadow = "0 0 8px #bee3f8";
        star.style.animation = `floatStar 6s ease-in-out ${delay}s infinite`;

        galaxy.appendChild(star);
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img src={logo} alt="Zarvoc Logo" className="w-40 h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden text-gray-800 bg-white font-[Poppins]">
      <style>
        {`
          @keyframes floatStar {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 0.7; }
          }
        `}
      </style>

      <div
        id="galaxy"
        className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none"
      ></div>

      <Navbar />

      {/*Hero Section*/}
      <section
        className="text-center py-32 px-5 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-md">
          Welcome to Zarvoc
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto mt-6">
          Your Ultimate Online Shopping Experience
        </p>

        <a
          href="/"
          className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow hover:scale-105 hover:shadow-lg transition-all"
        >
          Start Shopping
        </a>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-5 py-20 mt-[-50px] relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-700">Who We Are</h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-blue-400 rounded"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white/50 p-8 rounded-xl shadow-xl backdrop-blur border border-blue-100">
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Cosmic Shopping Redefined
            </h2>
            <p className="text-gray-700 mb-4">
              At Zarvoc, we've transformed online shopping into a stellar
              experience. We're not just another e-commerce platform; we're your
              intergalactic marketplace where convenience meets the stars.
            </p>
            <p className="text-gray-700">
              Our mission is to revolutionize e-commerce by combining stellar
              customer service with competitive prices, lightning-fast delivery,
              and an unforgettable user experience.
            </p>
          </div>
          <div>
            <img
              className="w-full rounded-lg shadow-lg border border-blue-100"
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80"
              alt="Zarvoc"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-700">
            Why Choose Zarvoc?
          </h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-blue-400 rounded"></div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "🚀",
              "Universal Product Range",
              "From fresh fruits & vegetables to electronics and fashion.",
            ],
            [
              "⚡",
              "Warp Speed Delivery",
              'Get your orders faster than you can say "Beam me up, Scotty!"',
            ],
            [
              "💰",
              "Stellar Deals",
              "Enjoy cosmic discounts and black-hole-level savings.",
            ],
            [
              "⭐",
              "Quality Nebula",
              "Only the best products from trusted suppliers.",
            ],
            [
              "🔁",
              "Zero-Gravity Returns",
              "Easy return policy. No questions asked.",
            ],
            [
              "🛸",
              "24/7 Alien Support",
              "Always on standby to assist you day or night.",
            ],
          ].map(([icon, title, text], i) => (
            <div
              key={i}
              className="bg-white/60 p-6 rounded-xl border border-blue-100 shadow-md hover:scale-[1.05] hover:shadow-blue-200 transition-transform duration-300 backdrop-blur"
            >
              <div className="text-4xl text-blue-600 mb-4">{icon}</div>
              <h3 className="text-xl text-blue-800 font-semibold mb-2">
                {title}
              </h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-700">
            Meet Our Team
          </h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-blue-400 rounded"></div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {[
            { name: "Utkarsh Chauhan", role: "Team Leader" },
            { name: "Arpan Jain", role: "Frontend Developer" },
            { name: "Sneha Maurya", role: "UI/UX Designer" },
            { name: "Pawan Kumar", role: "Backend Developer" },
            { name: "Krishan Kant Singh", role: "Database Engineer" },
          ].map((member, i) => (
            <div
              key={i}
              className="text-center bg-white/60 p-6 rounded-xl shadow-md border border-blue-100 hover:scale-[1.05] transition-transform duration-300 backdrop-blur"
            >
              {/* <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-400 shadow" /> */}
              <div className="w-24 h-24 rounded-full bg-blue-200 mx-auto mb-4 border-4 border-blue-400 shadow"></div>
              <h3 className="text-lg font-semibold text-blue-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-700">Our Location</h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-blue-400 rounded"></div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl border border-blue-100">
          <iframe
            className="w-full h-[400px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6195134142135!2d77.68777847512216!3d12.93215878737963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a8d37051e1%3A0x441b54d2e7912e06!2sEmbassy%20TechVillage!5e0!3m2!1sen!2sin!4v1752650865941!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 px-5 bg-blue-50">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">
          Ready for a Cosmic Shopping Experience?
        </h2>
        <button
          onClick={() => navigate("/")}
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow hover:scale-105 hover:shadow-lg transition-all"
        >
          Explore Products
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
