import * as React from 'react';
import { Network } from '@lifeomic/react-vis-network';
// declare module '@lifeomic/react-vis-network'
interface NetProps {
	className: string;
	isDark: boolean;
	edges: any[];
	nodes: any[];
}

// Use VisJS network graph to display the family tree. In style 😎
export class StructureNetwork extends React.Component<NetProps, {}> {
	private networkComponent: any = React.createRef();
	// constructor(props: any){
	// 	super(props);
	// }
	componentDidMount() {
		console.log(this.networkComponent);
		this.networkComponent.current.network.on('click', (event: any) => {
			console.log('clicked', event.nodes);
		});
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
				}}
				options={{
					// physics: false,
					interaction: {
						hideEdgesOnDrag: true,
						// tooltipDelay: 200
					},
					autoResize: true,
					layout: {
						// hierarchical: {
						// 	// direction: "DU",
						// 	sortMethod: "directed",
						// },
					},
					nodes: {
						font: {
							size: 10,
							color: this.props.isDark === false ? 'black' : 'white',
						},
					},
					edges: {
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
