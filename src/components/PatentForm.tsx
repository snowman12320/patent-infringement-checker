import React, { useState, FormEvent } from 'react'
import { TextField, Button, Container } from '@mui/material'

interface PatentFormProps {
  onSubmit: (data: { patentId: string, companyName: string }) => void
}

const PatentForm: React.FC<PatentFormProps> = ({ onSubmit }) => {
  const [patentId, setPatentId] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ patentId, companyName })
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Patent ID"
          value={patentId}
          onChange={(e) => setPatentId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default PatentForm
