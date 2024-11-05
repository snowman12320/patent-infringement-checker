import React, { useState } from 'react'
import AnalysisResult from '@/components/AnalysisResult'
import PatentForm from '@/components/PatentForm'

interface FormSubmitData {
  patentId: string;
  companyName: string;
}

interface Product {
  product_name: string;
  infringement_likelihood: string;
}

interface Analysis {
  patent_id: string;
  company_name: string;
  analysis_date: string;
  top_infringing_products: Product[];
}

const HomePage: React.FC = () => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)

  const handleFormSubmit = async ({ patentId, companyName }: FormSubmitData) => {
    try {
      // Fetch patent and company data
      const [patentsRes, companiesRes] = await Promise.all([
        fetch('/api/patents'),
        fetch('/api/companyProducts')
      ])

      const patents = await patentsRes.json()
      const companies = await companiesRes.json()

      // Find the specific patent and company
      const patent = patents.find((p: { patent_id: string }) => p.patent_id === patentId)
      const company = companies.find(
        (c: { company_name: string }) => c.company_name.toLowerCase() === companyName.toLowerCase()
      )

      if (!patent) {
        alert('Patent not found.')
        return
      }

      if (!company) {
        alert('Company not found.')
        return
      }

      // Prepare data for the Gemini API
      const requestData = {
        patent_claims: patent.claims,
        company_products: company.products
      }

      // Call the backend API route
      const res = await fetch('/api/infringementCheck', {
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

      setAnalysis({
        ...analysisResult,
        patent_id: patentId,
        company_name: company.company_name,
        analysis_date: new Date().toISOString().split('T')[0],
        top_infringing_products: analysisResult.top_infringing_products
      })
    } catch (error) {
      console.error(error)
      alert('An error occurred during the infringement check.')
    }
  }

  return (
    <div>
      <PatentForm onSubmit={handleFormSubmit} />
      <AnalysisResult analysis={analysis} />
    </div>
  )
}

export default HomePage
