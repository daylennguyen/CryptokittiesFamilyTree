import * as React from 'react';
import {
	Typography,
	Card,
	CardContent,
	CardMedia,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const cardStyle = {
	display: 'flex',
	flexDirection: 'row',
} as React.CSSProperties;

// This component accepts the json response given by the ck api
// we parse the json and display the data above the network graph
export default function (props: { SelectedKitty: any }) {
	return (
		<Card style={{ position: 'relative' }} variant={'outlined'}>
			<CardContent style={cardStyle}>
				{/* Cant find the kitty image? display a loading/skeleton component*/}
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
					<ValueText
						children={
							<a
								href={`https://www.cryptokitties.co/kitty/${props.SelectedKitty.id}`}
							>
								{`${
									props.SelectedKitty.name === null
										? ''
										: props.SelectedKitty.name+'\n'
								} (#${props.SelectedKitty.id})`}
							</a>
						}
					/>

					<InfoHeader
						text={
							<a
								href={
									'https://cryptokitties.co/profile/' +
									props.SelectedKitty.owner.address
								}
							>
								{props.SelectedKitty.owner.nickname}
							</a>
						}
						icon={<AccountCircleIcon />}
					/>

					<InfoHeader text={`Gen ${props.SelectedKitty.generation}`} />
				</span>
			</CardContent>
		</Card>
	);
}

function ValueText({ children, ...otherProps }) {
	return (
		<Typography variant="h6" color="textPrimary" {...otherProps}>
			{children}
		</Typography>
	);
}
function InfoHeader({ icon = <span />, text, ...otherProps }) {
	return (
		<span
			style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
		>
			{icon}
			<Typography
				variant="subtitle1"
				color="textSecondary"
				style={{  }}
				{...otherProps}
			>
				{text}
			</Typography>
		</span>
	);
}
