import Link from 'next/link'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLink}>
          專利侵權檢查器
        </Link>
        <div>
          <Link href="/" className={styles.navLink}>
            首頁
          </Link>
          <Link href="/about" className={styles.navLink}>
            關於
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
