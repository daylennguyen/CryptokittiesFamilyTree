import * as React from "react";

export default function(props: { activeStep: React.ReactText; children: { [x: string]: any; }; }) {
	console.log(props.activeStep);
	console.log(props.children[props.activeStep]);
	return props.children[props.activeStep];
}
 