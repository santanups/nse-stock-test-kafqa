import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const gainers = await axios
		.get('https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json', {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		.then(({ data }) => data);

	const losers = await axios
		.get('https://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/niftyLosers1.json', {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		.then(({ data }) => data);

	const topValue = await axios
		.get('https://www1.nseindia.com/live_market/dynaContent/live_analysis/most_active/allTopValue1.json', {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		.then(({ data }) => data);

	const topVolume = await axios
		.get('https://www1.nseindia.com/live_market/dynaContent/live_analysis/most_active/allTopVolume1.json', {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		.then(({ data }) => data);

	res.status(200).json({ gainers, losers, topValue, topVolume });
};
