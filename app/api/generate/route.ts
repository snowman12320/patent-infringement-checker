import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// 設定 CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

// OPTIONS 請求處理
export async function OPTIONS () {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST (req: Request) {
  try {
    // 檢查 Content-Type
    if (req.headers.get('content-type') !== 'application/json') {
      return NextResponse.json(
        { error: '請求必須是 application/json 格式' },
        { status: 400, headers: corsHeaders }
      )
    }

    const data = await req.json()

    // 驗證 prompt
    if (!data.prompt || typeof data.prompt !== 'string') {
      return NextResponse.json(
        { error: '缺少必要的 prompt 參數' },
        { status: 400, headers: corsHeaders }
      )
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(data.prompt)
    const response = await result.response

    return NextResponse.json(
      { content: response.text() },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('API 錯誤:', error)
    return NextResponse.json(
      { error: '生成內容失敗' },
      { status: 500, headers: corsHeaders }
    )
  }
}
