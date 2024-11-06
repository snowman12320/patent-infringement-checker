import type { NextApiRequest, NextApiResponse } from 'next'
// import { GoogleGenerativeAI } from '@google/generative-ai'

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
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    // const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // 構建提示，使用 LLM 進行分析
    // const prompt = `
    //     The app will allow users to:
    //     Input a patent ID and a company name.
    //     Run a patent infringement check against the specified company.
    //     Return the top two infringing products of the company along with explanations of why these
    //     products potentially infringe the patent, specifically detailing which claims are at issue.
    //     The patent ID and its corresponding patent claims are provided in the patents.json file. Additionally,
    //     you will receive a list of companies and their corresponding products and summaries in the
    //     company_products.json file.

    //     User Input
    //     Patent ID: ${req.body.patent_id} (get patent_claims from patents.json file)
    //     Company Name: ${req.body.company_name} (get company_products from company_products.json)
    //     patent_claims: ${req.body.patent_claims}
    //     company_products: ${req.body.company_products}

    //     Output Example
    //     Infringement Analysis output
    //     just give result object data like output object and not use json code block
    //     i do not want to see not real product_name again,please check the products name

    //     output:{
    //     "analysis_id": "1",
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

    // const result = await model.generateContent(prompt)
    // const response = await result.response
    // const responseText = await response.text()
    const responseText = `{
  "analysis_id": "1",
  "top_infringing_products": [
    {
      "product_name": "John Deere Combine Sense",
      "infringement_likelihood": "High",
      "relevant_claims": [
        "1",
        "2",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "explanation": "John Deere Combine Sense is an agricultural technology system that measures stalk diameters and locations, and generates yield maps based on this data. It implements many of the key elements of the patent claims, including stalk diameter measurement, yield mapping, and geo-referencing of data. The system's integration with agricultural machinery and its focus on improving agricultural science make it highly likely to infringe on the patent claims.",
      "specific_features": [
        "Stalk diameter measurement using feelers",
        "Yield mapping based on stalk diameter data",
        "Geo-referencing of yield data",
        "Integration with agricultural machinery",
        "Display of harvest data on a screen in the combine"
      ]
    },
    {
      "product_name": "John Deere GreenStar 3 2630 Display",
      "infringement_likelihood": "Moderate",
      "relevant_claims": [
        "6",
        "7",
        "8",
        "9",
        "10",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "explanation": "The John Deere GreenStar 3 2630 Display is an agricultural display system that can display harvest data, including stalk diameter and yield information. It does not directly measure stalk diameters or generate yield maps, but it can display data from other systems that do. This makes it less likely to infringe on the patent claims than John Deere Combine Sense, but still poses a moderate risk of infringement due to its potential use with other infringing systems.",
      "specific_features": [
        "Display of harvest data, including stalk diameter and yield information",
        "Integration with other agricultural systems",
        "GPS and mapping capabilities"
      ]
    }
  ],
  "overall_risk_assessment": "High risk of infringement due to the implementation of key patent claims in John Deere Combine Sense, which directly measures stalk diameters and generates yield maps. John Deere GreenStar 3 2630 Display poses a moderate risk of infringement due to its potential use with other infringing systems.",
  "patent_id": "US-11950529-B2",
  "company_name": "John Deere",
  "analysis_date": "2024-11-06"
}`

    return res.status(200).json(responseText)
  } catch (error) {
    console.error('API 錯誤:', error)
    return res.status(500).json({ error: '生成內容失敗' })
  }
}
