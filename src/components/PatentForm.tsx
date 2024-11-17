import React, { FormEvent, useState } from 'react'
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
import { fetchGeminiContent, fetchChatGPTContent, fetchClaudeContent } from '@/utils/aiModel'
import ConfirmDialog from '@/components/ConfirmDialog'

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
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [model, setModel] = useState('chatgpt')

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
        setDialogMessage('Patent ID does not exist.')
        setDialogOpen(true)
        return
      }

      if (!company) {
        setDialogMessage('Company name does not exist.')
        setDialogOpen(true)
        return
      }

      dispatch(setIsSubmitting(true))

      const requestData = {
        patent_id: patentId,
        company_name: company.name,
        patent_claims: patent.claims,
        company_products: company.products
      }

      let analysisObject
      if (model === 'gemini') {
        analysisObject = await fetchGeminiContent(requestData)
      } else if (model === 'chatgpt') {
        analysisObject = await fetchChatGPTContent(requestData)
      } else {
        analysisObject = await fetchClaudeContent(requestData)
      }

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
    try {
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
                placeholder="ex. US-11950529-B2"
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
                placeholder="ex. Walmart Inc."
                fullWidth
                required
                margin="normal"
                variant="outlined"
                disabled={isSubmitting}
                sx={{ mb: 3 }}
              />

              <TextField
                select
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                disabled={isSubmitting}
                sx={{ mb: 3 }}
                SelectProps={{
                  native: true
                }}
              >
                <option value="gemini">Gemini (1.5pro)</option>
                <option value="chatgpt">ChatGPT (4o-mini)</option>
                <option value="claude">Claude (3-5-haiku-20241022)</option>
              </TextField>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#57dc2f',
                  mt: 2,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#45b824'
                  }
                }}
                fullWidth
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Submit'}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>

      <ConfirmDialog
        open={dialogOpen}
        title="Notice"
        content={dialogMessage}
        onClose={() => setDialogOpen(false)}
      />
      </>
  )
}

export default PatentForm
