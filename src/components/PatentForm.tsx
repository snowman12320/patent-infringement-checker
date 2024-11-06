import React, { useState, FormEvent } from 'react'
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Backdrop,
  CircularProgress
} from '@mui/material'

interface PatentFormProps {
  onSubmit: (data: { patentId: string, companyName: string }) => Promise<void>
}

const PatentForm: React.FC<PatentFormProps> = ({ onSubmit }) => {
  const [patentId, setPatentId] = useState<string>('US-11950529-B2')
  const [companyName, setCompanyName] = useState<string>('John Deere')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({ patentId, companyName })
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLoading(false)
    }
  }

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
                onChange={(e) => setPatentId(e.target.value)}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <TextField
                label="公司名稱"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                提交
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default PatentForm
