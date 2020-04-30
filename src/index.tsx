import {
	Box,
	Card,
	Container,
	CssBaseline,
	Step,
	StepLabel,
	Stepper,
	ThemeProvider,
	Typography,
	Collapse,
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
// const UntypedComponent = StructureNetwork as any
// import PageStepper from './components/PageStepper';
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

interface Theme {
	isDark: boolean;
}
interface AppState {
	kittyNodes: Array<React.ReactNode>;
	kittyEdges: Array<React.ReactNode>;
	activeStep: number;
	scannedKitties: number;
	theme: Theme;
	checked: boolean;
}
// Root Application Component
class App extends React.Component<{}, AppState> {
	constructor(props: any) {
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
			checked:true
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
						<Collapse in={this.state.checked}>
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
											// toggle transition for displaying graph
											this.setState({checked:false})
											this.setState({ activeStep: 1 });
											this.setState({checked:true})

											asyncGetKittyJSON(
												input,
												(Nodes: any, Edges: any) => {
													this.setState({
														kittyNodes: Nodes,
														kittyEdges: Edges,
													});
												},
												(ScannedCount: any) => {
													this.setState({ scannedKitties: ScannedCount });
												},
												(step: any) => {
													// this.setState({checked:false})
													this.setState({ activeStep: step,checked:false });
													// setTimeout(()=>),100)
													this.setState({checked:true})

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
									<span>
										<StructureNetwork
											className="network"
											isDark={this.state.theme.isDark}
											edges={this.state.kittyEdges}
											nodes={this.state.kittyNodes}
										/>
									</span>
								) : (
									''
								)}
							</main>
						</Card>
						</Collapse>
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
						<a id="eth-donate" href="https://flannyan.argent.xyz/">
							<Typography variant="body1" color="textPrimary">
								eth donations: 0xb41919C5700779c45116377657Ce56B4E3508eb3
							</Typography>
						</a>
					</footer>
				</Box>
			</ThemeProvider>
		);
	}
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
