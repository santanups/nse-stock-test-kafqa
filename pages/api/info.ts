import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const data = await axios
		.get(
			'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=' +
				// @ts-ignore
				encodeURIComponent(req.query.q),
			{
				headers: {
					Referer:
						'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=' +
						// @ts-ignore
						encodeURIComponent(req.query.q),
					'X-Requested-With': 'XMLHttpRequest',
				},
			},
		)
		.then(({ data }) => data);

	res.status(200).json(data);
};
