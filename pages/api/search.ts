import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

function stripTags(string: string) {
	return string.replace(/<(.|\n)*?>/g, '').trim();
}

function searchTransformer(isIndex: boolean) {
	let matcher: RegExp | string = '';
	if (isIndex) {
		matcher = /underlying=(.*?)&/;
	} else {
		matcher = /symbol=(.*?)&/;
	}

	return function (data: string) {
		const matches = data.match(/<li>(.*?)<\/li>/g);
		if (!matches) return [];
		return matches.map(function (value1: string) {
			const symbol = value1.match(matcher);
			if (symbol) {
				value1 = stripTags(value1).replace(symbol[1], '');
			}
			return {
				name: value1 || '',
				symbol: !symbol || symbol[1] || '',
			};
		});
	};
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const options = {
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
		},
		transformResponse: searchTransformer(false),
	};

	const data = await axios
		.get(
			'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxCompanySearch.jsp?search=' +
				// @ts-ignore
				encodeURIComponent(req.query.q),
			options,
		)
		.then(({ data }) => data);

	res.status(200).json(data);
};
