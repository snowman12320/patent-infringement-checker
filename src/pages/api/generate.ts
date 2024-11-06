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
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(400).json({ error: '請求必須是 application/json 格式' })
    }

    const { prompt } = req.body

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: '缺少必要的 prompt 參數' })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent(prompt)
    const response = await result.response

    return res.status(200).json({ content: response.text() })
  } catch (error) {
    console.error('API 錯誤:', error)
    return res.status(500).json({ error: '生成內容失敗' })
  }
}
