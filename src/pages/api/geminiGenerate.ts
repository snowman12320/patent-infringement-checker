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
    return res.status(405).json({ error: 'Only allow POST requests' })
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' })

    const prompt = `
      The app will allow users to:

      - Input a patent ID and a company name.
      - Run a patent infringement check against the specified company.
      - Return the top two infringing products of the company along with explanations of why these products potentially infringe the patent, specifically detailing which claims are at issue.
      - The patent ID and its corresponding patent claims are provided in the patents.json file.
      - Additionally, you will receive a list of companies and their corresponding products and summaries in the company_products.json file.

      **User Input**

      - Patent ID: ${req.body.patent_id} (get patent_claims from patents.json file)
      - Company Name: ${req.body.company_name} (get company_products from company_products.json)

      **Data**

      - patent_claims:${req.body.patent_claims}
      - company_products: ${JSON.stringify(req.body.company_products)}

      **Instructions**

      - Generate an infringement analysis output.
      - Provide the result as an JSON only,and just start with { and string text.
      - Please enter the full product name from  ${req.body.company_products.products} into the product_name field without adding any extra words.
      - Ensure that the product name is exactly as listed in ${req.body.company_products.products}.

      **Expected Output Format**

      //json
      {
        "analysis_id": "<unique_analysis_id>",
        "top_infringing_products": [
          {
            "product_name": "<Product Name>",
            "infringement_likelihood": "<High/Moderate/Low>",
            "relevant_claims": ["<claim numbers>"],
            "explanation": "<Explanation of potential infringement>",
            "specific_features": [
              "<Feature 1>",
              "<Feature 2>",
              // Additional features...
            ]
          },
          {
            "product_name": "<Product Name>",
            "infringement_likelihood": "<High/Moderate/Low>",
            "relevant_claims": ["<claim numbers>"],
            "explanation": "<Explanation of potential infringement>",
            "specific_features": [
              "<Feature 1>",
              "<Feature 2>",
              // Additional features...
            ]
          }
        ],
        "overall_risk_assessment": "<Overall risk assessment summarize>"
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = await response.text()

    return res.status(200).json(responseText)
  } catch (error) {
    console.error('API error:', error)
    return res.status(500).json({ error: 'Failed to generate content' })
  }
}
