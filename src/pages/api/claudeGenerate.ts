import type { NextApiRequest, NextApiResponse } from 'next'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
})

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
      - Provide the result as an object or JSON file only, without any extra text or JSON code blocks.
      - Ensure that the product name is exactly as listed in ${req.body.company_products.products}.

      **Expected Output

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

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            }
          ]
        }
      ]
    })

    if (!response) {
      throw new Error('Failed to generate content')
    }

    return res.status(200).json((response.content[0] as { text: string }).text)
  } catch (error) {
    console.error('API error:', error)
    return res.status(500).json({ error: 'Failed to generate content' })
  }
}
