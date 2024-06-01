import { webcrypto } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { ok: boolean } | { text: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const ip = req.socket.remoteAddress

  console.log(ip)

  if (req.method !== 'GET') {
    return res.status(405).json({ text: 'Method not allowed' });
  }

  return res.status(403).json({ text: 'Hello World' });

}