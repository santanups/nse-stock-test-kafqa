import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

declare type SearchListItemType = {
	stock: {
		symbol: string;
		name: string;
	};
};

const SearchListItem = ({ stock }: SearchListItemType): JSX.Element => {
	const [stats, setStats] = useState<
		{ lastUpdateTime: string; data: [{ pChange: number; lastPrice: number }] } | undefined
	>();

	useEffect(() => {
		axios
			.get(`/api/info?q=${stock.symbol}`)
			.then(({ data }) => data)
			.then(setStats);
	}, []);

	return (
		<Grid item md={3} sm={6} xs={12}>
			<Box
				component={Paper}
				p={2}
				// @ts-ignore
				elevation={2}
				display="flex"
				flexDirection="column"
				height="100%"
				justifyContent="space-between"
			>
				<div>
					<Typography variant="h6">{stock.name}</Typography>
					<Typography variant="caption" color="secondary">
						{stock.symbol}
					</Typography>
				</div>
				<div>
					{stats === undefined ? (
						<Box>
							<Skeleton variant="text" />
							<Skeleton variant="text" />
						</Box>
					) : (
						stats !== null && (
							<React.Fragment>
								<Box display="flex" justifyContent="space-between" mt={1} mb={1}>
									<Box display="flex">
										{stats.data[0].pChange} %
										{stats.data[0].pChange > 0 ? (
											<Box color="#1ebf24" fontSize={26} height={24} mt={-0.5}>
												<ArrowDropUpIcon color="inherit" fontSize="inherit" />
											</Box>
										) : (
											<Box color="red" fontSize={26} height={24} mt={-0.5}>
												<ArrowDropDownIcon color="inherit" fontSize="inherit" />
											</Box>
										)}
									</Box>
									<Box>₹{stats.data[0].lastPrice}</Box>
								</Box>
								<Box>{stats.lastUpdateTime}</Box>
							</React.Fragment>
						)
					)}
				</div>
			</Box>
		</Grid>
	);
};

export default SearchListItem;
