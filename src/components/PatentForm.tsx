import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPatentId, setCompanyName, setIsSubmitting, resetForm } from '@/store/formSlice'
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

interface PatentFormProps {
  onSubmit: (data: { patentId: string, companyName: string }) => Promise<void>
}

const PatentForm: React.FC<PatentFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const { patentId, companyName, isSubmitting } = useSelector((state: RootState) => state.form)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(setIsSubmitting(true))

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await onSubmit({ patentId, companyName })
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
              專利檢查表單
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="專利編號"
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
                label="公司名稱"
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
