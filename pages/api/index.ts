import { NextApiHandler } from "next";

const handler: NextApiHandler = async (_req, res) => {
  res.status(200).json({ api: ['launches', 'payloads'] });
};

export default handler;