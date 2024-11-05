import React from 'react'
import { Container, Typography } from '@mui/material'

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

interface AnalysisResultProps {
  analysis: Analysis | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  if (!analysis) return null

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Infringement Analysis
      </Typography>
      <Typography variant="subtitle1">
        <strong>Patent ID:</strong> {analysis.patent_id}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Company Name:</strong> {analysis.company_name}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Analysis Date:</strong> {analysis.analysis_date}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Top Infringing Products:
      </Typography>
      {analysis.top_infringing_products.map((product, index) => (
        <div key={index}>
          <Typography variant="h6">{product.product_name}</Typography>
          <Typography>
            <strong>Infringement Likelihood:</strong> {product.infringement_likelihood}
          </Typography>
        </div>
      ))}
    </Container>
  )
}

export default AnalysisResult
