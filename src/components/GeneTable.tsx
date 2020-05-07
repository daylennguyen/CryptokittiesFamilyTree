import * as React from 'react';
import {
	Typography,
	Card,
	CardContent,
	CardMedia,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const cardStyle = {
	display: 'flex',
	flexDirection: 'row',
} as React.CSSProperties;

//
export default function (props: { SelectedKitty: any }) {
	return (
		<TableContainer component={Card}>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							<b>P1</b>
						</TableCell>
						<TableCell><b>H1</b></TableCell>
						<TableCell><b>H2</b></TableCell>
						<TableCell><b>H3</b></TableCell>
						<TableCell><b>H4</b></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
						<TableCell>123</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
