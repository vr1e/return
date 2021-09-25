import { NextApiRequest, NextApiResponse } from 'next';
import { getFireData } from '../../utils/get-data';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const data = await getFireData();
		if (!data) {
			throw new Error('Cannot find user data');
		}

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
