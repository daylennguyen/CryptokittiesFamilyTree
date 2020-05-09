import * as React from 'react';
import { Network } from '@lifeomic/react-vis-network';
import { fetchKittyGenetics } from './util/fetchCKBoxData';
interface NetProps {
	className: string;
	isDark: boolean;
	edges: any[];
	nodes: any[];
	setSelectedKitty: any;
	setCattributes: any;
	cattributes: any;
}

async function getKitty(kittyId, callback) {
	var response = await fetch('https://api.cryptokitties.co/kitties/' + kittyId);
	var json = await response.json();
	// console.log(json);
	callback(json);
}

// Use VisJS network graph to display the family tree. In style 😎
export class StructureNetwork extends React.Component<NetProps, {}> {
	private networkComponent: any = React.createRef();
	// constructor(props: any){
	// 	super(props);
	// }
	componentDidMount() {
	// when the graph is clicked
		this.networkComponent.current.network.on('click', (event: any) => {
			// console.log('clicked', event.nodes);
			if (event.nodes.length !== 0){
				getKitty(event['nodes'][0], this.props.setSelectedKitty);
				console.log(event['nodes'][0]);
				fetchKittyGenetics(event['nodes'][0],this.props.cattributes);
			}
			// console.log()
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log(
			nextProps,
			nextState,
			this.props.edges.length === nextProps.edges.length
		);
		if (this.props.isDark !== nextProps.isDark) return true;
		if (this.props.edges.length === nextProps.edges.length) {
			return false;
		} else {
			return true;
		}
	}

	render() {
		// const {isDark,nodes,edges} = props
		const result = (
			<Network
				style={{
					background: this.props.isDark === false ? 'white' : '#424242',
					border:
						this.props.isDark === false
							? '1px solid rgba(0, 0, 0, 0.12)'
							: '1px solid rgba(255, 255, 255, 0.12)',
					borderRadius: '10px',
					marginTop: 25,
					marginBottom: 25,
				}}
				options={{
					physics: true,
					interaction: {
						hover: true,
						// hideEdgesOnDrag: true,
						// navigationButtons: true,
						selectConnectedEdges: false,

						tooltipDelay: 0,
					},
					autoResize: true,
					layout: {
						hierarchical: {
							direction: 'UD',
							sortMethod: 'directed',
							// shakeTowards: 'leaves',
						},
					},
					nodes: {
						shadow: true,
						font: {
							size: 10,
							color: this.props.isDark === false ? 'black' : 'white',
						},
					},
					edges: {
						color: { hover: '#ff0000' },
						smooth: { type: 'cubicBezier' },
						arrows: 'from',
					},
				}}
				ref={this.networkComponent}
			>
				{this.props.nodes === []
					? null
					: this.props.nodes.map((singleNode) => {
							return singleNode;
					  })}
				{this.props.edges === []
					? null
					: this.props.edges.map((singleEdge) => {
							return singleEdge;
					  })}
			</Network>
		) as React.ReactNode;

		return result;
	}
}
