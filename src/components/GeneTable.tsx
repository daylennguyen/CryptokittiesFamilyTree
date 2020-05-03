import * as React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const cardStyle = {
	display: 'flex',
	flexDirection: 'row',
} as React.CSSProperties;

//
export default function (props: { SelectedKitty: any }) {

    

	return (
		<Card
			style={{ position: 'relative' }}
			// elevation={1}
			variant={'outlined'}
			// raised
		>
			<CardContent style={cardStyle}>
				
			</CardContent>
		</Card>
	);
}
