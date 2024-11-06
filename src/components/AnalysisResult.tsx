import React from 'react'
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Box
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
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          專利侵權分析結果
        </Typography>

        {/* 新增基本資訊區塊 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>專利編號：</strong> {analysis.patent_id}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>公司名稱：</strong> {analysis.company_name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>分析日期：</strong> {new Date(analysis.analysis_date).toLocaleDateString('zh-TW')}
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
                      label={`侵權可能性: ${product.infringement_likelihood}`}
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
                    <strong>相關專利權利要求：</strong>
                    {product.relevant_claims.join(', ')}
                  </Typography>

                  <Typography variant="body1" paragraph>
                    <strong>說明：</strong>
                    {product.explanation}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    <strong>特定功能：</strong>
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
            整體風險評估
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
