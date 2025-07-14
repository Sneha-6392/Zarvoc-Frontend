import styles from '../Styles/Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className="animated">Welcome to Zorvac</h1>
      <p className="animated delay-1">Your Ultimate Online Shopping Experience</p>
      <a href="#" className={`${styles.btn} animated delay-2`}>Start Shopping</a>
    </section>
  )
}

export default Hero