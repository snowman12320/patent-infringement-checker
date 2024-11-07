import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import AnalysisResult from '@/components/AnalysisResult'

interface Product {
  product_name: string;
  infringement_likelihood: 'High' | 'Moderate' | 'Low';
  relevant_claims: string[];
  explanation: string;
  specific_features: string[];
}

interface Analysis {
  id: number;
  patent_id: string;
  company_name: string;
  analysis_date: string;
  savedAt: string;
  top_infringing_products: Product[];
  overall_risk_assessment: string;
}

const ReportDetail: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [report, setReport] = useState<Analysis | null>(null)

  useEffect(() => {
    if (id) {
      const reports = JSON.parse(localStorage.getItem('patentReports') || '[]')
      const foundReport = reports.find((r: Analysis) => r.id === Number(id))
      if (foundReport) {
        setReport(foundReport)
      } else {
        router.push('/reports')
      }
    }
  }, [id, router])

  if (!report) {
    return (
      <>
        <Navbar />
        <div>Loading...</div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <AnalysisResult analysis={report} />
    </>
  )
}

export default ReportDetail
