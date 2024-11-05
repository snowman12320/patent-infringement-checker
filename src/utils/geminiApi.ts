import axios from 'axios'

const geminiApi = axios.create({
  baseURL: 'https://api.gemini.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

geminiApi.interceptors.request.use((config) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})

export default geminiApi
