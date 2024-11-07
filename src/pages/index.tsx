import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Navbar from '@/components/Navbar'
import AnalysisResult from '@/components/AnalysisResult'
import PatentForm from '@/components/PatentForm'
import styles from '@/pages/index.module.css'

const HomePage: React.FC = () => {
  const analysis = useSelector((state: RootState) => state.patent.analysis)

  return (
    <>
      <Navbar />
      <div className={styles.homepageContainer}>
        <PatentForm />
        {analysis && <AnalysisResult analysis={analysis} />}
      </div>
    </>
  )
}

export default HomePage
