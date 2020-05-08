import * as React from 'react';
import {
	Typography,
	Card,
	CardContent,
	CardMedia,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const cardStyle = {
	display: 'flex',
	flexDirection: 'row',
	// justifyContent: '',
} as React.CSSProperties;

//
export default function (props: { SelectedKitty: any }) {
	// React.useEffect(() => {
	// 	console.log('useEffects', props.SelectedKitty);
	// }, []);

	// console.log("Selected kitty=",props.SelectedKitty)
	return (
		<Card
			style={{ position: 'relative' }}
			// elevation={1}
			variant={'outlined'}
			// raised
		>
			<CardContent style={cardStyle}>
				{!props.SelectedKitty.id ? (
					<Skeleton variant="rect" width={200} height={200} />
				) : (
					<CardMedia
						component="img"
						alt="Clicked CryptoKitty"
						height="200px"
						width="200px"
						image={`${props.SelectedKitty.image_url_png}`}
						title="Clicked CryptoKitty"
					/>
				)}
				<span id={'kittyCardText'}>
					<Typography variant="subtitle1" color="textSecondary">
						Name
					</Typography>
					<Typography variant="h5" color="textPrimary">
						{props.SelectedKitty.name ? (
							props.SelectedKitty.name
						) : (
							<Skeleton variant="text" width={100} />
						)}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Kitty ID
					</Typography>
					<Typography variant="h5" color="textPrimary">
						{props.SelectedKitty.id ? (
							props.SelectedKitty.id
						) : (
							<Skeleton variant="text" width={100} />
						)}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Generation
					</Typography>
					<Typography variant="h5" color="textPrimary">
						{props.SelectedKitty.generation >= 0 ? (
							props.SelectedKitty.generation
						) : (
							<Skeleton variant="text" width={100} />
						)}
					</Typography>
				</span>
				
			</CardContent>
		</Card>
	);
}
