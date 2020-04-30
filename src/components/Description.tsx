import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

const DescriptionText = () => (
	<Typography color="textSecondary" variant="body2">
		CK-Tree is an open-source cryptokitty ancestor visualization tool.
		<br />
		Enter a kitty id or full kitty id to scan a kittie's ancestors and display
		an awesome network-graph/family tree!
	</Typography>
);

// The expandable panel at the top of the page
export default function(props: any) {
	return (
		<ExpansionPanel style={{ marginBottom: '10px', marginTop:'20px' }}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant='subtitle2'><strong>Description</strong></Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails style={{ justifyContent: 'center' }}>
				{' '}
				<DescriptionText />
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
