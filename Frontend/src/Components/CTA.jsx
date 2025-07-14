import styles from '../Styles/CTA.module.css'

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <h2 className="animated">Ready for a Cosmic Shopping Experience?</h2>
      <a href="#" className={`${styles.btn} animated delay-1`}>Explore Products</a>
    </section>
  )
}

export default CTA