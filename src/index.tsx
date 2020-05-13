import {
	Box,
	Card,
	Container,
	CssBaseline,
	ThemeProvider,
	Typography,
	Collapse,
	Button,
} from '@material-ui/core';
import Stepper from './components/Stepper';
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { render } from 'react-dom';
import DarkModeToggleButton from './components/DarkModeToggleButton';
import Description from './components/Description';
import KittySubmit from './components/KittySubmit';
import ScanningKittiesLoader from './components/ScanningKittiesLoader';
import Title from './components/Title';
import { fetchCattributes } from './util/fetchCKBoxData';

import { StructureNetwork } from './network';
import './styles/styles.css';
import {
	asyncGetKittyJSON,
	checkForFullKittyAddress,
	fullAddressToShortID,
} from './util/fetchKitty';
import KittyInfoCard from './components/KittyInfoCard';
import GeneTable from './components/GeneTable';

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
	selectedKitty: any;
	cattributes: any;
	trait_data: any;
}
const DonationFooter = (
	<footer>
		<a
			id="eth-donate"
			href="https://flannyan.argent.xyz/"
			style={{ margin: '10px' }}
		>
			<Typography variant="body1" color="textPrimary">
				eth donations: 0xb41919C5700779c45116377657Ce56B4E3508eb3
			</Typography>
		</a>
	</footer>
);

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
				isDark: true,
			},
			checked: true,
			selectedKitty: {},
			trait_data: [],
			cattributes: {},
		};
	}

	componentDidMount() {
		fetchCattributes((response) => {
			this.setState({ cattributes: response });
		});
	}

	render() {
		// console.log(this.state);
		return (
			<ThemeProvider
				theme={this.state.theme.isDark === false ? lightTheme : darkTheme}
			>
				<CssBaseline />
				<DarkModeToggleButton
					isDark={this.state.theme.isDark}
					onClick={this.setStateThemeIsDark()}
				/>
				<Box className="App">
					<Title />
					<Container>
						<Description />
						<Collapse in={this.state.checked}>
							{/* Card content will be hot-swapped */}
							<Card variant="outlined" style={{ padding: '80px' }}>
								{this.state.activeStep === 0 ? (
									<KittySubmit onKittySubmit={this.handleKittySubmit()} />
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
									{/* Kitty Family Tree Visualization Graph */}
									{this.state.activeStep === 4 ? (
										<span>
											<KittyInfoCard SelectedKitty={this.state.selectedKitty} />
											<StructureNetwork
												setCattributes={(data) => {
													this.setState({ cattributes: data });
												}}
												cattributes={this.state.cattributes}
												className="network"
												isDark={this.state.theme.isDark}
												edges={this.state.kittyEdges}
												nodes={this.state.kittyNodes}
												setSelectedKitty={(kitty) => {
													if (kitty !== this.state.selectedKitty)
														this.setState({ selectedKitty: kitty });
												}}
												setTraitData={(data) => {
													this.setState({ trait_data: data });
												}}
											/>
											<GeneTable traits={this.state.trait_data} />
											<Button
												variant="contained"
												color="secondary"
												onClick={this.reInitializeState()}
											>
												Scan Another Kitty!
											</Button>
										</span>
									) : (
										''
									)}
								</main>
							</Card>
						</Collapse>
						<Stepper activeStep={this.state.activeStep} />
					</Container>
					{DonationFooter}
				</Box>
			</ThemeProvider>
		);
	}

	private setStateThemeIsDark():
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined {
		return () => {
			this.setState({
				theme: {
					isDark: this.state.theme.isDark === true ? false : true,
				},
			});
		};
	}

	private reInitializeState():
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined {
		return () => {
			this.setState({ checked: false });
			this.setState({
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
				checked: true,
				selectedKitty: {},
				trait_data: [],
				// cattributes: {},
			});
			setTimeout(() => this.setState({ checked: true }), 500);
		};
	}

	private handleKittySubmit(): (arg0: any) => void {
		return (input) => {
			this.setState({ checked: false });
			if (checkForFullKittyAddress(input)) {
				//parse the id from the url
				input = fullAddressToShortID(input);
			}
			// check for invalid input and parse int NaN==NotANumber
			let ParsedInt = Number.parseInt(input, 10);
			if (!isNaN(ParsedInt) && input !== '0' && ParsedInt > 0) {
				input = ParsedInt;
				// toggle transition for displaying graph
				this.setState({ activeStep: 1 });
				setTimeout(() => this.setState({ checked: true }), 500);
				// fetchkitty.js
				asyncGetKittyJSON(
					input,
					(Nodes: any, Edges: any, inputKitty: string) => {
						this.setState({
							kittyNodes: Nodes,
							kittyEdges: Edges,
							selectedKitty: inputKitty,
						});
					},
					(ScannedCount: any) => {
						this.setState({ scannedKitties: ScannedCount });
					},
					(step: any) => {
						this.setState({ activeStep: step, checked: false });
						this.setState({ checked: true });
					}
				);
			}
			this.setState({ checked: true });
		};
	}
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
