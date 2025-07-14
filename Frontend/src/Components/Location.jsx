import styles from '../Styles/Location.module.css'

const Location = () => {
  return (
    <section className={styles.locationSection}>
      <div className={styles.sectionTitle}>
        <h2>Our Location</h2>
      </div>
      <div className={styles.mapContainer}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.6345457114085!2d77.59446037550595!3d27.604857676241505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bffc039%3A0xfe5fc3da92c6341!2sGLA%20University!5e0!3m2!1sen!2sin!4v1750656695270!5m2!1sen!2sin" 
          width="600" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Zorvac Location"
        ></iframe>
      </div>
    </section>
  )
}

export default Location