export async function fetchGeneratedContent (prompt: string) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      throw new Error('API 請求失敗')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('錯誤:', error)
    throw error
  }
}
