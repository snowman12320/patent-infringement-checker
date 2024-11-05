import { NextApiRequest, NextApiResponse } from 'next'
import patents from '../../data/patents.json'

export default function handler (_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(patents)
}
