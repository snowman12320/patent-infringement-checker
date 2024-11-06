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
    if (window.confirm('確定要刪除此報告？')) {
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
            歷史分析報告
          </Typography>
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
                  primary={`專利 ${report.patent_id} - ${report.company_name}`}
                  secondary={`分析日期: ${new Date(report.analysis_date).toLocaleDateString('zh-TW')}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  )
}

export default ReportsPage
