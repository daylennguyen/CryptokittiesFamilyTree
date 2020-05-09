import * as React from 'react';
import {

	Card,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@material-ui/core';


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
export default function (props: { SelectedKitty: any }) {
	return (
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
						<TableCell>Fur</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Pattern</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Eye Color</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Eye Shape</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Base Colour</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Highlight Colour</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Accent Colour</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Wild Element</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Mouth</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Environment</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Secret</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Purrstige</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
