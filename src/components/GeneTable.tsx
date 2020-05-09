import * as React from 'react';
import {
	Card,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	ExpansionPanel,
	ExpansionPanelSummary,
	Typography,
	ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const cardStyle = {
// 	display: 'flex',
// 	flexDirection: 'row',
// } as React.CSSProperties;

//0: {group_n: 1, group_tag: "FU", codex_type: "fur", api_type: "body", api_desc: Array(32), …}
// 1: {group_n: 2, group_tag: "PA", codex_type: "pattern", api_type: "pattern", api_desc: Array(32), …}
// 2: {group_n: 3, group_tag: "EC", codex_type: "eye color", api_type: "coloreyes", api_desc: Array(32), …}
// 3: {group_n: 4, group_tag: "ES", codex_type: "eye shape", api_type: "eyes", api_desc: Array(32), …}
// 4: {group_n: 5, group_tag: "BC", codex_type: "base colour", api_type: "colorprimary", api_desc: Array(32), …}
// 5: {group_n: 6, group_tag: "HC", codex_type: "highlight colour", api_type: "colorsecondary", api_desc: Array(32), …}
// 6: {group_n: 7, group_tag: "AC", codex_type: "accent colour", api_type: "colortertiary", api_desc: Array(32), …}
// 7: {group_n: 8, group_tag: "WE", codex_type: "wild element", api_type: "wild", api_desc: Array(32), …}
// 8: {group_n: 9, group_tag: "MO", codex_type: "mouth", api_type: "mouth", api_desc: Array(32), …}
// 9: {group_n: 10, group_tag: "EN", codex_type: "environment", api_type: "environment", api_desc: Array(32), …}
// 10: {group_n: 11, group_tag: "SE", codex_type: "secret", api_type: "secret", api_desc: Array(32), …}
// 11: {group_n: 12, group_tag: "PU", codex_type: "purrstige", api_type: "purrstige", api_desc: Array(32), …}
const DefaultCells = (props) => (
	<React.Fragment>
		<TableCell key={123}>-</TableCell>
		<TableCell key={124}>-</TableCell>
		<TableCell key={125}>-</TableCell>
		<TableCell key={126}>-</TableCell>
	</React.Fragment>
);
const ExpansionWrapper = (props) => {
	return (
		<ExpansionPanel style={{ marginBottom: '10px', marginTop: '20px' }}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle2">
					<strong>CKBox Gene Table</strong>
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails
				style={{
					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{props.children}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};
export default function (props: { traits: [][] }) {
	var i = 69420;
	const createCellsForRow = (traits: [][], index: number) => {
		return traits.length > 0 ? (
			traits[index].map((traitName) => (
				<TableCell key={i++}>{traitName}</TableCell>
			))
		) : (
			<DefaultCells />
		);
	};
	console.log(props.traits);
	return (
		<ExpansionWrapper>
			{props.traits.length > 0 ? (
				<TableContainer component={Card}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>
									<b>Trait Type</b>
								</TableCell>
								<TableCell>
									<b>Primary</b>
								</TableCell>
								<TableCell>
									<b>Hidden 1</b>
								</TableCell>
								<TableCell>
									<b>Hidden 2</b>
								</TableCell>
								<TableCell>
									<b>Hidden 3</b>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<b>Fur</b>
								</TableCell>
								{createCellsForRow(props.traits, 0)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Pattern</b>
								</TableCell>
								{createCellsForRow(props.traits, 1)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Eye Color</b>
								</TableCell>
								{createCellsForRow(props.traits, 2)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Eye Shape</b>
								</TableCell>
								{createCellsForRow(props.traits, 3)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Base Colour</b>
								</TableCell>
								{createCellsForRow(props.traits, 4)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Highlight Colour</b>
								</TableCell>
								{createCellsForRow(props.traits, 5)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Accent Colour</b>
								</TableCell>
								{createCellsForRow(props.traits, 6)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Wild Element</b>
								</TableCell>
								{createCellsForRow(props.traits, 7)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Mouth</b>
								</TableCell>
								{createCellsForRow(props.traits, 8)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Environment</b>
								</TableCell>
								{createCellsForRow(props.traits, 9)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Secret</b>
								</TableCell>
								{createCellsForRow(props.traits, 10)}
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Purrstige</b>
								</TableCell>
								{createCellsForRow(props.traits, 11)}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography variant="h6">Click a kitty to display gene data</Typography>
			)}
		</ExpansionWrapper>
	);
}
