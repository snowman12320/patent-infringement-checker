import React from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Button
} from '@mui/material'

interface Product {
  product_name: string;
  infringement_likelihood: 'High' | 'Moderate' | 'Low';
  relevant_claims: string[];
  explanation: string;
  specific_features: string[];
}

interface Analysis {
  patent_id: string;
  company_name: string;
  analysis_date: string;
  top_infringing_products: Product[];
  overall_risk_assessment: string;
}

interface AnalysisResultProps {
  analysis: Analysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const router = useRouter()
  const isReportsPage = router.pathname.includes('/reports')

  const handleDownload = () => {
    const fileName = `patent-analysis-${analysis.patent_id}-${analysis.analysis_date}.json`
    const jsonStr = JSON.stringify(analysis, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSaveReport = () => {
    try {
      const reports = JSON.parse(localStorage.getItem('patentReports') || '[]')
      const reportWithId = {
        ...analysis,
        id: Date.now(),
        savedAt: new Date().toLocaleString('en-US', { hour12: false })
      }
      reports.push(reportWithId)
      localStorage.setItem('patentReports', JSON.stringify(reports))
      alert('Report saved successfully!')
    } catch (error) {
      console.error('Failed to save report:', error)
      alert('Error occurred while saving report')
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Patent Infringement Analysis Results
          </Typography>
          <Box>
            {!isReportsPage && (
              <Button
                variant="contained"
                onClick={handleSaveReport}
                sx={{ mr: 2 }}
              >
                Save Report
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={handleDownload}
            >
              Download Report
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Patent Number:</strong> {analysis.patent_id}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Company Name:</strong> {analysis.company_name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Analysis Date:</strong> {new Date(analysis.analysis_date).toLocaleString('en-US', { hour12: false })}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {analysis.top_infringing_products.map((product, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">
                    {product.product_name}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`Infringement Likelihood: ${product.infringement_likelihood}`}
                      color={
                        product.infringement_likelihood === 'High'
                          ? 'error'
                          : product.infringement_likelihood === 'Moderate'
                            ? 'warning'
                            : 'success'
                      }
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Typography variant="body1" paragraph>
                    <strong>Relevant Patent Claims:</strong>
                    {product.relevant_claims.join(', ')}
                  </Typography>

                  <Typography variant="body1" paragraph>
                    <strong>Explanation:</strong>
                    {product.explanation}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Specific Features:</strong>
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {product.specific_features.map((feature, idx) => (
                      <Typography component="li" key={idx}>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="h5" gutterBottom color="error">
            Overall Risk Assessment
          </Typography>
          <Typography variant="body1">
            {analysis.overall_risk_assessment}
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default AnalysisResult
