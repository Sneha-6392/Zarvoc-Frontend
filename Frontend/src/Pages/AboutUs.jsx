import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    const galaxy = document.getElementById('galaxy');
    const starCount = 100;
    const shootingStarCount = 5;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 2 + 3}s`;
      galaxy.appendChild(star);
    }

    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      shootingStar.style.top = `${Math.random() * 100}vh`;
      shootingStar.style.animationDuration = `${Math.random() * 2 + 3}s`;
      galaxy.appendChild(shootingStar);
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden text-slate-200 bg-slate-900 font-[Poppins]">
      {/* Galaxy Background */}
      <div id="galaxy" className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 shadow border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <a href="#" className="text-2xl font-bold text-violet-600">Zor<span className="text-amber-500">vac</span></a>
          <nav className="flex gap-6 text-slate-200 font-medium">
            <a href="#" className="hover:text-violet-600">Home</a>
            <a href="#" className="hover:text-violet-600">Shop</a>
            <a href="#" className="hover:text-violet-600">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-32 px-5 bg-gradient-to-br from-violet-600/10 to-amber-500/10 relative">
        <h1 className="text-5xl font-bold text-slate-50 drop-shadow-md animate-fadeInUp">Welcome to Zorvac</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-6 animate-fadeInUp delay-200">Your Ultimate Online Shopping Experience in the Dark</p>
        <a href="#" className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-violet-600 to-amber-500 rounded-full text-white font-medium shadow hover:scale-105 transition-all animate-fadeInUp delay-300">Start Shopping</a>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-5 py-20 bg-slate-800/70 backdrop-blur rounded-lg mt-[-50px] relative z-10 border border-white/10 shadow-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">Who We Are</h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-gradient-to-r from-violet-600 to-amber-500 rounded"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-violet-600 mb-4">Cosmic Shopping Redefined</h2>
            <p className="text-slate-400 leading-relaxed mb-4">At Zorvac, we've transformed online shopping into a stellar experience. We're not just another e-commerce platform; we're your intergalactic marketplace where convenience meets the stars.</p>
            <p className="text-slate-400 leading-relaxed">Our mission is to revolutionize e-commerce by combining stellar customer service with competitive prices, lightning-fast delivery, and an unforgettable user experience.</p>
          </div>
          <div>
            <img className="w-full rounded-lg shadow-lg border border-white/10" src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Zorvac" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">Why Choose Zorvac?</h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-gradient-to-r from-violet-600 to-amber-500 rounded"></div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['🚀', 'Universal Product Range', 'From fresh fruits & vegetables to electronics and fashion.'],
            ['⚡', 'Warp Speed Delivery', 'Get your orders faster than you can say "Beam me up, Scotty!"'],
            ['💰', 'Stellar Deals', 'Enjoy cosmic discounts and black-hole-level savings.'],
            ['⭐', 'Quality Nebula', 'Only the best products from trusted suppliers.'],
            ['🔁', 'Zero-Gravity Returns', 'Easy return policy. No questions asked.'],
            ['🛸', '24/7 Alien Support', 'Always on standby to assist you day or night.'],
          ].map(([icon, title, text], i) => (
            <div key={i} className="bg-slate-800/80 p-6 rounded-lg border border-white/10 shadow-lg hover:scale-[1.02] transition-transform">
              <div className="text-4xl bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-4">{icon}</div>
              <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">Meet Our Team</h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-gradient-to-r from-violet-600 to-amber-500 rounded"></div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {[
            ['Screenshot 2025-06-23 151557.png', 'Utkarsh Chauhan', 'Team leader'],
            ['image.png', 'Arpan Jain', 'Team member'],
            ['https://media.licdn.com/dms/image/v2/D5603AQFOc-eDqqSBeg/profile-displayphoto-shrink_400_400/B56ZdjbFqpG0Ak-/0/1749719735510?e=1756339200&v=beta&t=cdUvUr-iDzlzqZA2ZokQPgPkY8ZdUN7Aa5Hf4P0xJu0', 'Sneha Maurya', 'Team member'],
            ['image copy.png', 'Pawan', 'Team member'],
            ['image copy 2.png', 'Krishan Kant Singh', 'Team member'],
          ].map(([img, name, role], i) => (
            <div key={i} className="text-center bg-slate-800/80 p-6 rounded-lg shadow-lg border border-white/10 hover:scale-[1.02] transition-transform">
              <img src={img} alt={name} className="w-36 h-36 rounded-full object-cover mx-auto mb-4 border-4 border-violet-600 shadow" />
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-sm text-slate-400">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white">Our Location</h2>
          <div className="h-1 w-20 mx-auto mt-4 bg-gradient-to-r from-violet-600 to-amber-500 rounded"></div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl border border-white/10">
          <iframe className="w-full h-[400px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6345457114085!2d77.59446037550595!3d27.604857676241505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c6341!2sGLA%20University!5e0!3m2!1sen!2sin!4v1750656695270!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 px-5">
        <h2 className="text-3xl font-semibold text-white mb-6">Ready for a Cosmic Shopping Experience?</h2>
        <a href="#" className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-amber-500 rounded-full text-white font-medium shadow hover:scale-105 transition-all">Explore Products</a>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/95 text-white py-12 text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-left px-5">
          <div>
            <h3 className="text-2xl font-bold mb-3">Zor<span className="text-amber-500">vac</span></h3>
            <p className="text-slate-400">Your Ultimate Online Supermarket Experience.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-slate-200">
              <li><a href="#" className="hover:text-violet-600">Home</a></li>
              <li><a href="#" className="hover:text-violet-600">Products</a></li>
              <li><a href="#" className="hover:text-violet-600">Offers</a></li>
              <li><a href="#" className="hover:text-violet-600">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Categories</h3>
            <ul className="space-y-2 text-slate-200">
              <li><a href="#" className="hover:text-violet-600">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-violet-600">Bakery</a></li>
              <li><a href="#" className="hover:text-violet-600">Clothes</a></li>
              <li><a href="#" className="hover:text-violet-600">Electronics</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Contact</h3>
            <ul className="space-y-2 text-slate-200">
              <li>📍 GLA University, Mathura</li>
              <li>📞 +91 6399003541</li>
              <li>📧 info@zorvac.com</li>
              <li>⏰ 24/7 Service</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-slate-400 border-t border-white/10 pt-4">
          &copy; 2025-2027 Zorvac. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
