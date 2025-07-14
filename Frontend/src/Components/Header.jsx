import styles from '../Styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <a href="#" className={styles.logo}>Zor<span>vac</span></a>
        <nav className={styles.navLinks}>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Contact Us</a>
        </nav>
      </div>
    </header>
  )
}

export default Header