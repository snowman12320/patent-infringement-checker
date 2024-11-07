import Link from 'next/link'
import styles from './Navbar.module.css'
import HomeIcon from '@mui/icons-material/Home'
import HistoryIcon from '@mui/icons-material/History'
import InfoIcon from '@mui/icons-material/Info'
import GavelIcon from '@mui/icons-material/Gavel'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLink}>
          <GavelIcon sx={{ mr: 1, color: '#57dc2f' }} />
          Patent Infringement Checker
        </Link>
        <div className={styles.rightBlock}>
          <Link href="/" className={styles.navLink}>
            <HomeIcon sx={{ mr: 1, color: '#57dc2f' }} />
            Home
          </Link>
          <Link href="/reports" className={styles.navLink}>
            <HistoryIcon sx={{ mr: 1, color: '#57dc2f' }} />
            History Reports
          </Link>
          <Link href="/about" className={styles.navLink}>
            <InfoIcon sx={{ mr: 1, color: '#57dc2f' }} />
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
