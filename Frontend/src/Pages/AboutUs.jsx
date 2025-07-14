import React, { useEffect } from "react";
function AboutUs(){

      useEffect(() => {
        const galaxy = document.getElementById("galaxy");
        const starCount = 100;
        const shootingStarCount = 5;
    
        for (let i = 0; i < starCount; i++) {
          const star = document.createElement("div");
          star.className = "absolute rounded-full bg-white animate-twinkle";
          const size = Math.random() * 3 + 1;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.top = `${Math.random() * 100}vh`;
          star.style.left = `${Math.random() * 100}vw`;
          star.style.animationDuration = `${Math.random() * 2 + 3}s`;
          galaxy.appendChild(star);
        }
    
        for (let i = 0; i < shootingStarCount; i++) {
          const shootingStar = document.createElement("div");
          shootingStar.className =
            "absolute w-1 h-1 bg-white rounded-full animate-shooting shadow-lg";
          shootingStar.style.top = `${Math.random() * 100}vh`;
          shootingStar.style.animationDuration = `${Math.random() * 2 + 3}s`;
          galaxy.appendChild(shootingStar);
        }
      }, []);
    return(
        <div className="relative text-slate-200 bg-slate-900 font-[Poppins] overflow-x-hidden">
      {/* Galaxy Background */}
      <div id="galaxy" className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <a href="#" className="text-3xl font-bold text-purple-600">
            Zor<span className="text-amber-500">vac</span>
          </a>
          <nav className="flex gap-8">
            <a href="#" className="hover:text-purple-600">
              Home
            </a>
            <a href="#" className="hover:text-purple-600">
              Shop
            </a>
            <a href="#" className="hover:text-purple-600">
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-32 px-4 bg-gradient-to-br from-purple-600/10 to-amber-400/10">
        <h1 className="text-5xl text-slate-50 drop-shadow-lg animate-fadeInUp">Welcome to Zorvac</h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-400 animate-fadeInUp delay-100">
          Your Ultimate Online Shopping Experience in the Dark
        </p>
        <a
          href="#"
          className="mt-6 inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium shadow-lg hover:-translate-y-1 transition-all animate-fadeInUp delay-200"
        >
          Start Shopping
        </a>
      </section>

      {/* Add other sections like About, Features, Team, Location, CTA, Footer below similarly */}

      {/* Example CTA */}
      <section className="text-center py-20">
        <h2 className="text-4xl text-slate-50 mb-6 animate-fadeInUp">Ready for a Cosmic Shopping Experience?</h2>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium shadow-lg hover:-translate-y-1 transition-all animate-fadeInUp delay-100"
        >
          Explore Products
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Zor<span className="text-amber-500">vac</span></h2>
            <p>Your Ultimate Online Supermarket Experience. Fresh, Fast, and Affordable.</p>
          </div>
          <div>
            <h3 className="text-amber-500 font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-500">Home</a></li>
              <li><a href="#" className="hover:text-purple-500">Products</a></li>
              <li><a href="#" className="hover:text-purple-500">Offers</a></li>
              <li><a href="#" className="hover:text-purple-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-500 font-semibold mb-2">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-500">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-purple-500">Bakery</a></li>
              <li><a href="#" className="hover:text-purple-500">Clothes</a></li>
              <li><a href="#" className="hover:text-purple-500">Electronic Items</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-500 font-semibold mb-2">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li>📍 GLA University, Mathura</li>
              <li>📞 +91 6399003541</li>
              <li>✉️ info@zorvac.com</li>
              <li>🕒 24/7 Service</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-slate-400 text-sm border-t border-white/10 pt-6">
          &copy; 2025-2027 Zorvac. All Rights Reserved.
        </div>
      </footer>
    </div>
    )
}
export default AboutUs