import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ListTable from '../components/ListTable';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import useDebounce from '../hooks/useDebounce';
import { CircularProgress } from '@material-ui/core';
import SearchListItem from '../components/SearchListItem';
import { Stock } from '../types/stock';

export default function Index(): JSX.Element {
	type ResponseData = {
		time: string;
		data: Stock[];
	};

	const [{ gainers = null, losers = null, topValue = null, topVolume = null }, setData] = useState<{
		gainers?: ResponseData;
		losers?: ResponseData;
		topValue?: ResponseData;
		topVolume?: ResponseData;
	}>({});

	const [searchValue, setSearchValue] = useState<string>('');
	const [searchLoading, setSearchLoading] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<{ symbol: string; name: string }[]>([]);

	useEffect(() => {
		axios
			.get('/api/get-top')
			.then(({ data }) => data)
			.then(setData);
	}, []);

	useEffect(() => {
		setSearchLoading(true);
		setSearchResults([]);
		axios
			.get(`/api/search?q=${searchValue}`)
			.then(({ data }) => data)
			.then(setSearchResults)
			.finally(() => setSearchLoading(false));
	}, [useDebounce(searchValue)]);

	const topList = [
		{
			title: 'Top Gainers',
			...(gainers || {}),
		},
		{
			title: 'Top Losers',
			...(losers || {}),
		},
		{
			title: 'Top Value',
			...(topValue || {}),
			hidePrice: true,
		},
		{
			title: 'Top Volume',
			...(topVolume || {}),
			hidePrice: true,
		},
	].filter((each) => Boolean(each.data));

	return (
		<Container>
			<Box mt={4} display="flex" justifyContent="space-between">
				<Typography variant="h3" component="h1" gutterBottom>
					NSE Stocks
				</Typography>
				<TextField
					variant="outlined"
					placeholder="Search..."
					// helperText="Please search valid symbol"
					onChange={(event) => setSearchValue(event.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Box>
			{searchValue && (
				<Box mt={4} mb={4}>
					{searchLoading ? (
						<Box fontSize={20} display="flex" alignItems="center">
							<Box mr={2}>Loading Results</Box> <CircularProgress size={28} />
						</Box>
					) : searchResults && searchResults.length ? (
						<React.Fragment>
							<Box fontSize={18} mb={2}>
								Search Result:
							</Box>
							<Grid container spacing={2}>
								{searchResults.map((eachResult) => (
									<SearchListItem stock={eachResult} key={eachResult.symbol} />
								))}
							</Grid>{' '}
						</React.Fragment>
					) : (
						<Box fontSize={18}>No results found</Box>
					)}
				</Box>
			)}
			<Grid container spacing={4}>
				{topList.map((eachTable) => (
					<Grid sm={12} md={12} item key={eachTable.title}>
						<Box mt={2} />
						<Typography variant="h5" gutterBottom>
							{eachTable.title}
						</Typography>
						{/* @ts-ignore */}
						<ListTable data={eachTable.data} time={eachTable.time} hidePrice={eachTable.hidePrice} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
