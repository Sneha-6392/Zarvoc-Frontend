import React from 'react';
import GalaxyBackground from './components/GalaxyBackground'; // Import the Galaxy Background component
import './index.css'; // Import your main global styles (containing Header, Hero, Footer styles)
// No need to import individual module.css files here if they are all in index.css or handled by components

function App() {
  return (
    <div>
      {/* Galaxy Background at the top level, fixed position */}
      <GalaxyBackground />

      {/* Header/Navigation */}
      <header>
        <div className="navbar">
          <a href="#" className="logo">Zor<span>vac</span></a>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="animated">Welcome to Zorvac</h1>
        <p className="animated delay-1">Your Ultimate Online Shopping Experience in the Dark</p>
        <a href="#" className="btn animated delay-2">Start Shopping</a>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="section-title animated">
          <h2>Who We Are</h2>
        </div>
        <div className="about-content">
          <div className="about-text animated">
            <h2>Cosmic Shopping Redefined</h2>
            <p>At Zorvac, we've transformed online shopping into a stellar experience. We're not just another e-commerce platform; we're your intergalactic marketplace where convenience meets the stars.</p>
            <p>Our mission is to revolutionize e-commerce by combining stellar customer service with competitive prices, lightning-fast delivery, and an unforgettable user experience.</p>
          </div>
          <div className="about-image animated delay-1">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Zorvac Night Shopping" />
          </div>
        </div>
      </section>

      {/* Features Section (using about-section class for padding/styling) */}
      <section className="about-section"> 
        <div className="section-title animated delay-1">
          <h2>Why Choose Zorvac?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card animated">
            <div className="feature-icon">🚀</div>
            <h3>Universal Product Range</h3>
            <p>From fresh fruits & vegetables to the latest electronics and fashionable clothes, we've got everything you need across galaxies.</p>
          </div>
          <div className="feature-card animated delay-1">
            <div className="feature-icon">⚡</div>
            <h3>Warp Speed Delivery</h3>
            <p>Our logistics network moves at lightspeed. Get your orders faster than you can say "Beam me up, Scotty!"</p>
          </div>
          <div className="feature-card animated delay-2">
            <div className="feature-icon">💰</div>
            <h3>Stellar Deals</h3>
            <p>Enjoy cosmic discounts and black-hole-level savings with our daily offers and seasonal promotions.</p>
          </div>
          <div className="feature-card animated">
            <div className="feature-icon">⭐</div>
            <h3>Quality Nebula</h3>
            <p>We source directly from trusted suppliers across the universe to ensure only the best reaches you.</p>
          </div>
          <div className="feature-card animated delay-1">
            <div className="feature-icon">🔁</div>
            <h3>Zero-Gravity Returns</h3>
            <p>Our return policy is as easy as floating in space. No questions asked if you're not satisfied.</p>
          </div>
          <div className="feature-card animated delay-2">
            <div className="feature-icon">🛸</div>
            <h3>24/7 Alien Support</h3>
            <p>Our friendly customer service team is always on standby, ready to assist you day or night.</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>To be the leading intergalactic supermarket, providing unparalleled convenience and a unique shopping experience that transcends traditional boundaries.</p>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-title animated">
          <h2>Meet Our Team</h2>
        </div>
        <div className="team-grid">
          <div className="team-card animated">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" className="team-img" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-card animated delay-1">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" className="team-img" />
            <h3>Jane Smith</h3>
            <p>Marketing Head</p>
          </div>
          <div className="team-card animated delay-2">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" className="team-img" />
            <h3>Mike Johnson</h3>
            <p>Product Manager</p>
          </div>
          <div className="team-card animated">
            <img src="https://via.placeholder.com/150" alt="Team Member 4" className="team-img" />
            <h3>Emily Davis</h3>
            <p>Customer Support</p>
          </div>
          <div className="team-card animated delay-1">
            <img src="https://via.placeholder.com/150" alt="Team Member 5" className="team-img" />
            <h3>Chris Lee</h3>
            <p>Logistics Coordinator</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="section-title animated">
          <h2>Our Location</h2>
        </div>
        <div className="map-container">
          {/* Note: Google Maps embed might require an API key or proper embed URL */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6345457114085!2d77.59446037550595!3d27.604857676241505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c6341!2sGLA%20University!5e0!3m2!1sen!2sin!4v1750656695270!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="animated">Ready for a Cosmic Shopping Experience?</h2>
        <a href="#" className="btn animated delay-1">Explore Products</a>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">Zor<span>vac</span></div>
            <p>Your Ultimate Online Supermarket Experience. Fresh, Fast, and Affordable.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Offers</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Categories</h3>
            <ul>
              <li><a href="#">Fruits & Vegetables</a></li>
              <li><a href="#">Bakery</a></li>
              <li><a href="#">Clothes</a></li>
              <li><a href="#">Electronic Items</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Contact Us</h3>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> GLA University, Mathura</li>
              <li><i className="fas fa-phone"></i> +91 6399003541</li>
              <li><i className="fas fa-envelope"></i> info@zorvac.com</li>
              <li><i className="fas fa-clock"></i> 24/7 Service</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025-2027 Zorvac. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;