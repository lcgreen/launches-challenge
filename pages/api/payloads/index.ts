import { NextApiHandler } from 'next';
import { PayloadService } from '@@/api/services';

const handler: NextApiHandler = async (req, res) => {
  try {
    // query the launches api
    const json = await PayloadService.all();
    res.status(200).json({
      ok: true,
      body: json,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export default handler;
