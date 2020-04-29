import * as React from 'react';
import { CircularProgress, Box, Typography } from '@material-ui/core';

//
export default function(props: { count: React.ReactNode; activeStep: number; }) {
	return (
		<Box
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<CircularProgress style={{ marginBottom: 10 }} />
			<Typography variant="h6">
				{props.count}{' '}
				{props.activeStep === 1
					? 'Kitties Scanned'
					: 'Kitties Converted to Graph Elements'}
			</Typography>
		</Box>
	);
}
