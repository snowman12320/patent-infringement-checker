import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'

interface SavedReport {
  id: number;
  patent_id: string;
  company_name: string;
  analysis_date: string;
  savedAt: string;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<SavedReport[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('patentReports') || '[]')
    setReports(savedReports)
  }, [])

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const updatedReports = reports.filter(report => report.id !== id)
      localStorage.setItem('patentReports', JSON.stringify(updatedReports))
      setReports(updatedReports)
    }
  }

  const handleView = (report: SavedReport) => {
    router.push(`/reports/${report.id}`)
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Analysis History Reports
          </Typography>
          {reports.length === 0
            ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              No saved analysis reports yet
            </Typography>
              )
            : (
            <List>
              {reports.map((report) => (
                <ListItem
                  key={report.id}
                  secondaryAction={
                    <Box>
                      <IconButton onClick={() => handleView(report)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(report.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={`Patent ${report.patent_id} - ${report.company_name}`}
                    secondary={`Analysis Date: ${new Date(report.analysis_date).toLocaleString('en-US', { hour12: false })}`}
                  />
                </ListItem>
              ))}
            </List>
              )}
        </Paper>
      </Container>
    </>
  )
}

export default ReportsPage
