import { NextApiRequest, NextApiResponse } from 'next'
import geminiApi from '../../utils/geminiApi'

interface GeminiRequest {
  patentClaims: string[];
  companyProducts: string[];
}

interface GeminiResponse {
  data: string; // 根據實際回應結構更新此處
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { patentClaims, companyProducts }: { patentClaims: string[], companyProducts: string[] } = req.body

      // Prepare the data for the Gemini API
      const geminiRequest: GeminiRequest = {
        patentClaims,
        companyProducts
      }

      // Call the Gemini API
      const geminiResponse: GeminiResponse = await geminiApi.post(
        '/v1/infringement-check', // Replace with the actual endpoint
        geminiRequest
      )

      // Send back the analysis result
      res.status(200).json(geminiResponse.data)
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      res.status(500).json({ error: 'Failed to perform infringement check.' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' })
  }
}
