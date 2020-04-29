import {
	Box,
	Card,
	Container,
	CssBaseline,
	Step,
	StepLabel,
	Stepper,
	ThemeProvider,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { render } from 'react-dom';
import DarkModeToggleButton from './components/DarkModeToggleButton';
import Description from './components/Description';
import KittySubmit from './components/KittySubmit';
import ScanningKittiesLoader from './components/ScanningKittiesLoader';
import Title from './components/Title';
import { StructureNetwork } from './network';
import './styles/styles.css';
import {
	asyncGetKittyJSON,
	checkForFullKittyAddress,
	fullAddressToShortID,
} from './util/fetchKitty';
import PageStepper from './components/PageStepper';
// Material UI theme objects passed to theme provide, primarily used to toggle dark theme
const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
});
const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
	},
});

// Root Application Component
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Node components given to visjs graph; updated by fetchkitty.js
			kittyNodes: [],
			// Edge compoenents given to visjs graph
			kittyEdges: [],
			// Stepper progress
			activeStep: 0,
			// Count of kitties fetched through api
			scannedKitties: 0,
			theme: {
				isDark: false,
			},
		};
	}

	render() {
		return (
			<ThemeProvider
				theme={this.state.theme.isDark === false ? lightTheme : darkTheme}
			>
				<CssBaseline />
				<DarkModeToggleButton
					isDark={this.state.theme.isDark}
					onClick={() => {
						this.setState({
							theme: {
								isDark: this.state.theme.isDark === true ? false : true,
							},
						});
					}}
				/>
				<Box className="App">
					<Title />
					<Container>
						<Description />
						<Card variant="outlined" style={{ padding: '100px' }}>
							{this.state.activeStep === 0 ? (
								<KittySubmit
									onKittySubmit={(input) => {
										if (checkForFullKittyAddress(input)) {
											//parse the id from the url
											input = fullAddressToShortID(input);
										}
										// check for invalid input and parse int NaN==NotANumber
										if (!isNaN(Number.parseInt(input, 10)) && input !== '0') {
											input = Number.parseInt(input, 10);
											this.setState({ activeStep: 1 });
											asyncGetKittyJSON(
												input,
												(Nodes, Edges) => {
													this.setState({
														kittyNodes: Nodes,
														kittyEdges: Edges,
													});
												},
												(ScannedCount) => {
													this.setState({ scannedKitties: ScannedCount });
												},
												(step) => {
													this.setState({ activeStep: step });
												}
											);
										}
									}}
								/>
							) : (
								''
							)}
							{/* Show a loading bar on steps 1 & 2 */}
							{this.state.activeStep === 1 || this.state.activeStep === 2 ? (
								<ScanningKittiesLoader
									activeStep={this.state.activeStep}
									count={this.state.scannedKitties}
								/>
							) : (
								''
							)}
							<main>
								{this.state.activeStep === 4 ? (
									<StructureNetwork
										className={'network'}
										isDark={this.state.theme.isDark}
										edges={this.state.kittyEdges}
										nodes={this.state.kittyNodes}
									/>
								) : (
									''
								)}
							</main>
						</Card>
						<Stepper
							activeStep={this.state.activeStep}
							alternativeLabel
							style={{ marginTop: '10px' }}
						>
							<Step>
								<StepLabel>Submit KittyId</StepLabel>
							</Step>
							<Step>
								<StepLabel>Scan Ancestor Kitties</StepLabel>
							</Step>
							<Step>
								<StepLabel>Create Graph Elements</StepLabel>
							</Step>
							<Step>
								<StepLabel>View Graph</StepLabel>
							</Step>
						</Stepper>
					</Container>
					<footer>
						<a href="https://flannyan.argent.xyz/">
							eth donations: 0xb41919C5700779c45116377657Ce56B4E3508eb3
						</a>
					</footer>
				</Box>
			</ThemeProvider>
		);
	}
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
