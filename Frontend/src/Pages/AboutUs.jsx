import styles from '../styles/AboutUs.module.css'

const About = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionTitle}>
        <h2>Who We Are</h2>
      </div>
      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <h2>Cosmic Shopping Redefined</h2>
          <p>At Zorvac, we've transformed online shopping into a stellar experience. We're not just another e-commerce platform; we're your intergalactic marketplace where convenience meets the stars.</p>
          <p>Our mission is to revolutionize e-commerce by combining stellar customer service with competitive prices, lightning-fast delivery, and an unforgettable user experience.</p>
        </div>
        <div className={styles.aboutImage}>
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Zorvac Night Shopping" />
        </div>
      </div>
    </section>
  )
}

export default AboutUs