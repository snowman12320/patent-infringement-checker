import React from 'react'
import Navbar from '@/components/Navbar'
import styles from './about.module.css'

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.aboutContainer}>
        <h1>About Patent Infringement Checker</h1>
        <p>
          Patent Infringement Checker is a tool that helps users quickly check potential patent infringement risks.
          By analyzing patent content and company product information, it provides preliminary infringement risk assessment.
        </p>
      </div>
    </>
  )
}

export default AboutPage
