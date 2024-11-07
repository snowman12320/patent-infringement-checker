import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPatentId, setCompanyName, setIsSubmitting, resetForm } from '@/store/formSlice'
import { setAnalysis, setLoading, setError } from '@/store/patentSlice'
import { RootState } from '@/store/store'
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
  styled
} from '@mui/material'

const AnimatedBackdrop = styled(Backdrop)`
  background-image: linear-gradient(-45deg, #e94235, #4286f5, #34a853, #fbbb06) !important;
  background-size: 400% 400% !important;
  animation: gradient-background 4s ease infinite;
  opacity: 0.7 !important;

  @keyframes gradient-background {
    0%, 100% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
  }
`

const PatentForm: React.FC = () => {
  const dispatch = useDispatch()
  const { patentId, companyName, isSubmitting } = useSelector((state: RootState) => state.form)

  const handleFormSubmit = async ({ patentId, companyName }: { patentId: string, companyName: string }) => {
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
        analysis_date: new Date().toLocaleString('zh-TW', { hour12: false })
      }))
    } catch (error) {
      console.error(error)
      dispatch(setError('An error occurred during the infringement check.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(setIsSubmitting(true))

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await handleFormSubmit({ patentId, companyName })
      dispatch(resetForm())
    } finally {
      dispatch(setIsSubmitting(false))
    }
  }

  return (
    <>
      <AnimatedBackdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </AnimatedBackdrop>

      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Patent Infringement Checker
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Patent ID"
                value={patentId}
                onChange={(e) => dispatch(setPatentId(e.target.value))}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                disabled={isSubmitting}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Company Name"
                value={companyName}
                onChange={(e) => dispatch(setCompanyName(e.target.value))}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                disabled={isSubmitting}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                {isSubmitting ? '處理中...' : '提交'}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default PatentForm
