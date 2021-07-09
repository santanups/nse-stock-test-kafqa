import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Stock } from '../types/stock';

declare type ListTableType = {
	data: Stock[];
	hidePrice?: boolean;
	time: string;
};

function ListTable({ data, hidePrice, time }: ListTableType): JSX.Element {
	return (
		<TableContainer component={Paper} elevation={2}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Symbol</TableCell>
						<TableCell align="right">LTP</TableCell>
						<TableCell align="right">% change</TableCell>
						<TableCell align="right">Volume</TableCell>
						<TableCell align="right">Last updated at</TableCell>
						{!hidePrice && (
							<React.Fragment>
								<TableCell align="right">High Price</TableCell>
								<TableCell align="right">Low Price</TableCell>
							</React.Fragment>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((each) => (
						<TableRow key={each.symbol}>
							<TableCell component="th" scope="row">
								{each.symbol}
							</TableCell>
							<TableCell align="right">₹{each.ltp}</TableCell>
							<TableCell align="right">{each.netPrice}</TableCell>
							<TableCell align="right">{each.tradedQuantity}</TableCell>
							<TableCell align="right">{time}</TableCell>
							{!hidePrice && (
								<React.Fragment>
									<TableCell align="right">{each.highPrice}</TableCell>
									<TableCell align="right">{each.lowPrice}</TableCell>
								</React.Fragment>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default ListTable;
