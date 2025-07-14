import styles from '../Styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerAbout}>
          <div className={styles.footerLogo}>Zor<span>vac</span></div>
          <p>Your Ultimate Online Supermarket Experience. Fresh, Fast, and Affordable.</p>
          <div className={styles.socialLinks}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        
        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        
        <div className={styles.footerLinks}>
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Fruits & Vegetables</a></li>
            <li><a href="#">Bakery</a></li>
            <li><a href="#">Clothes</a></li>
            <li><a href="#">Electronic Items</a></li>
          </ul>
        </div>
        
        <div className={styles.footerLinks}>
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> GLA University, Mathura</li>
            <li><i className="fas fa-phone"></i> +91 6399003541</li>
            <li><i className="fas fa-envelope"></i> info@zorvac.com</li>
            <li><i className="fas fa-clock"></i> 24/7 Service</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <p>&copy; 2025-2027 Zorvac. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer