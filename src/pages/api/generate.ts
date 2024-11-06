import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允許 POST 請求' })
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = 'how are you'
    // 構建提示，使用 LLM 進行分析
    // const prompt = `
    //     patent_claims: ${req.body.patent_claims}
    //     company_products: ${req.body.company_products}

    //     Example
    //     User Input
    //     Patent ID: US-RE49889-E1 (get patent_claims)
    //     Company Name: Walmart (get company_products)
    //     Infringement Analysis output (just give result object data like output object )
    //     output:{
    //     "analysis_id": "1",
    //     "patent_id": "US-RE49889-E1",
    //     "company_name": "Walmart Inc.",
    //     "analysis_date": "2024-10-31",
    //     "top_infringing_products": [
    //     {
    //     "product_name": "Walmart Shopping App",
    //     "infringement_likelihood": "High",
    //     "relevant_claims": ["1", "2", "3", "20", "21"],
    //     "explanation": "The Walmart Shopping App implements several key
    //     elements of the patent claims including the direct advertisement-to-list
    //     functionality, mobile application integration, and shopping list
    //     synchronization. The app's implementation of digital advertisement display
    //     and product data handling closely matches the patent's specifications.",
    //     "specific_features": [
    //     "Direct advertisement-to-list functionality",
    //     "Mobile app integration",
    //     "Shopping list synchronization",
    //     "Digital weekly ads integration",
    //     "Product data payload handling"
    //     ]
    //     },
    //     {
    //     "product_name": "Walmart+",
    //     "infringement_likelihood": "Moderate",
    //     "relevant_claims": ["1", "40", "41", "42"],
    //     "explanation": "The Walmart+ membership program includes shopping
    //     list features that partially implement the patent's claims, particularly
    //     regarding list synchronization and deep linking capabilities. While not as
    //     complete an implementation as the main Shopping App, it still incorporates
    //     key patented elements in its list management functionality.",
    //     "specific_features": [
    //     "Shopping list synchronization across devices",
    //     "Deep linking to product lists","Advertisement integration in member benefits",
    //     "Cloud-based list storage"
    //     ]
    //     }
    //     ],
    //     "overall_risk_assessment": "High risk of infringement due to
    //     implementation of core patent claims in multiple products, particularly
    //     the Shopping App which implements most key elements of the patent claims.
    //     Walmart+ presents additional moderate risk through its partial
    //     implementation of the patented technology."
    //     }
    // `

    const result = await model.generateContent(prompt)
    const response = await result.response

    console.info('11111111111 test 11111111111')
    // console.info(typeof response.text()) // string
    // console.dir(response.text()) // "I am Gemini, a multi-modal AI model, developed by Google. I don't have personal feelings or emotions, but I am designed to be informative and helpful. How can I assist you today?"
    // const responseText = "I am Gemini, a multi-modal AI model, developed by Google. I don't have personal feelings or emotions, but I am designed to be informative and helpful. How can I assist you today?"

    const responseText = await response.text()
    return res.status(200).json(responseText)
  } catch (error) {
    console.error('API 錯誤:', error)
    return res.status(500).json({ error: '生成內容失敗' })
  }
}
