import React from 'react'
import Navbar from '@/components/Navbar'
import styles from './about.module.css'

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.aboutContainer}>
        <h1>關於專利侵權檢查器</h1>
        <p>
          專利侵權檢查器是一個幫助使用者快速檢查潛在專利侵權風險的工具。
          透過分析專利內容和公司產品資訊，提供初步的侵權風險評估。
        </p>
      </div>
    </>
  )
}

export default AboutPage
