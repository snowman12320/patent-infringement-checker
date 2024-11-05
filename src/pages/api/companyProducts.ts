import { NextApiRequest, NextApiResponse } from 'next'
import companyProducts from '../../data/company_products.json'

export default function handler (_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(companyProducts)
}
