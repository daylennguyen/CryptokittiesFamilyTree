import * as React from 'react';
import {  Typography, Card, CardContent } from '@material-ui/core';

//
export default function(props: { SelectedKitty: number; }) {
	return (
		<Card
			style={{ position: 'relative'}}
		>
			<CardContent>
			<Typography variant="h6">
				meow {props.SelectedKitty}
			</Typography>
			</CardContent>
		</Card>
	);
}
