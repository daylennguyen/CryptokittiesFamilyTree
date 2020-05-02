import * as React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';

const cardStyle = {
	display: 'flex',
	flexDirection: 'row',
	// justifyContent: '',
} as React.CSSProperties;

//
export default function (props: { SelectedKitty: number }) {
	return (
		<Card
			style={{ position: 'relative' }}
			// elevation={1}
			variant={'outlined'}
			// raised
		>
			<CardContent style={cardStyle}>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="200px"
					width="200px"
					image="https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png"
					title="Contemplative Reptile"
				/>
				<span id={'kittyCardText'}>
					<Typography variant="subtitle1" color="textSecondary">
						Name
					</Typography>
					<Typography variant="h5" color="textPrimary">
						Rick James
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Kitty ID
					</Typography>
					<Typography variant="h5" color="textPrimary">
						420
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Generation
					</Typography>
					<Typography variant="h5" color="textPrimary">
						69
					</Typography>
					
				</span>
			</CardContent>
		</Card>
	);
}
