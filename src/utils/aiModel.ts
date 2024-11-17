async function fetchGeminiContent (prompt: {
  patent_id: string,
  company_name: string,
  patent_claims: string,
  company_products: string
}) {
  try {
    const res = await fetch('/api/geminiGenerate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prompt)
    })

    if (!res.ok) {
      throw new Error('Error performing infringement check.')
    }

    const analysisResult = await res.json()
    // eslint-disable-next-line no-control-regex
    const cleanedAnalysisResult = analysisResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    const analysisObject = JSON.parse(cleanedAnalysisResult)

    return analysisObject
  } catch (error) {
    alert('please try again or contact support team')
    console.error('Error:', error)
    throw error
  }
}

async function fetchChatGPTContent (prompt: {
  patent_id: string,
  company_name: string,
  patent_claims: string,
  company_products: string
}) {
  try {
    const res = await fetch('/api/chatGPTGenerate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prompt)
    })

    if (!res.ok) {
      throw new Error('Error performing infringement check.')
    }

    const analysisResult = await res.json()
    // eslint-disable-next-line no-control-regex
    const cleanedAnalysisResult = analysisResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    const analysisObject = JSON.parse(cleanedAnalysisResult)

    return analysisObject
  } catch (error) {
    alert('please try again or contact support team')
    console.error('Error:', error)
    throw error
  }
}

async function fetchClaudeContent (prompt: {
  patent_id: string,
  company_name: string,
  patent_claims: string,
  company_products: string
}) {
  try {
    const res = await fetch('/api/claudeGenerate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prompt)
    })

    if (!res.ok) {
      throw new Error('Error performing infringement check.')
    }

    const analysisResult = await res.json()
    // eslint-disable-next-line no-control-regex
    const cleanedAnalysisResult = analysisResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    const analysisObject = JSON.parse(cleanedAnalysisResult)

    return analysisObject
  } catch (error) {
    alert('please try again or contact support team')
    console.error('Error:', error)
    throw error
  }
}

async function fetchGrokContent (prompt: {
  patent_id: string,
  company_name: string,
  patent_claims: string,
  company_products: string
}) {
  try {
    const res = await fetch('/api/grokGenerate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prompt)
    })

    if (!res.ok) {
      throw new Error('Error performing infringement check.')
    }

    const analysisResult = await res.json()
    // eslint-disable-next-line no-control-regex
    const cleanedAnalysisResult = analysisResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    const analysisObject = JSON.parse(cleanedAnalysisResult)

    return analysisObject
  } catch (error) {
    alert('please try again or contact support team')
    console.error('Error:', error)
    throw error
  }
}

export {
  fetchGeminiContent,
  fetchChatGPTContent,
  fetchClaudeContent,
  fetchGrokContent
}
