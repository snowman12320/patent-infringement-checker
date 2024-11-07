import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnalysis, setLoading, setError } from '@/store/patentSlice'
import { RootState } from '@/store/store'
import Navbar from '@/components/Navbar'
import AnalysisResult from '@/components/AnalysisResult'
import PatentForm from '@/components/PatentForm'
import styles from '@/pages/index.module.css'

interface FormSubmitData {
  patentId: string;
  companyName: string;
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const analysis = useSelector((state: RootState) => state.patent.analysis)

  const handleFormSubmit = async ({ patentId, companyName }: FormSubmitData) => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const [patentsRes, companiesRes] = await Promise.all([
        fetch('/api/patents'),
        fetch('/api/companyProducts')
      ])

      const patents = await patentsRes.json()
      const companies = await companiesRes.json()

      const patent = patents.find((p: { publication_number: string }) => p.publication_number === patentId)
      const company = companies.find(
        (c: { name: string }) => new RegExp(`\\b${companyName}\\b`, 'i').test(c.name)
      )

      if (!patent) {
        alert('Patent not found.')
        return
      }

      if (!company) {
        alert('Company not found.')
        return
      }

      const requestData = {
        patent_id: patentId,
        company_name: company.name,
        patent_claims: patent.claims,
        company_products: company.products
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      if (!res.ok) {
        throw new Error('Error performing infringement check.')
      }

      const analysisResult = await res.json()
      // eslint-disable-next-line no-control-regex
      const cleanedAnalysisResult = analysisResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      const analysisObject = JSON.parse(cleanedAnalysisResult)
      console.log(analysisObject)

      dispatch(setAnalysis({
        ...analysisObject,
        patent_id: patentId,
        company_name: company.name,
        analysis_date: new Date().toISOString().split('T')[0]
      }))
    } catch (error) {
      console.error(error)
      dispatch(setError('An error occurred during the infringement check.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.homepageContainer}>
        <PatentForm onSubmit={handleFormSubmit} />
        {analysis && <AnalysisResult analysis={analysis} />}
      </div>
    </>
  )
}

export default HomePage
