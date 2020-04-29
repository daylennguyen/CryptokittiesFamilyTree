import React, { Component } from "react";
import { Network } from "@lifeomic/react-vis-network";

// Use VisJS network graph to display the family tree. In style 😎
export class StructureNetwork extends Component {
	private networkComponent = React.createRef();
	componentDidMount() {
		console.log(this.networkComponent);
		this.networkComponent.current.network.on("click", (event) => {
			console.log("clicked", event);
		});
	}

	render(props) {
		return (
			<Network
				style={{
					background: this.props.isDark === false ? "white" : "black",
					border: "black solid 1px",
				}}
				options={{
					autoResize: true,
					layout: {
						hierarchical: {
							direction: "DU",
							sortMethod: "directed",
						},
					},
					nodes: {
						font: {
							size: 32,
							color: this.props.isDark === false ? "black" : "white",
						},
					},
					edges: {
						arrows: "from",
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
		);
	}
}
