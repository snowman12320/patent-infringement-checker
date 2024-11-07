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
          <GavelIcon sx={{ mr: 1 }} />
          專利侵權檢查器
        </Link>
        <div>
          <Link href="/" className={styles.navLink}>
            <HomeIcon sx={{ mr: 1 }} />
            首頁
          </Link>
          <Link href="/reports" className={styles.navLink}>
            <HistoryIcon sx={{ mr: 1 }} />
            歷史報告
          </Link>
          <Link href="/about" className={styles.navLink}>
            <InfoIcon sx={{ mr: 1 }} />
            關於
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
