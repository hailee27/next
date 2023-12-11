import type { NextApiRequest, NextApiResponse } from 'next';

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({ data: 'success' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.status(500).json({ error });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line no-console
  console.log(req);
  if (req.method === 'POST') {
    return POST(req, res);
  }
  return res.status(200).json({ req });
}
