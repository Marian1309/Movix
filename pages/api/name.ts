import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    return res.status(200).json({ name: 'John Doe' })
  }
}

export default handler
