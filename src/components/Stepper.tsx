import { StepLabel, Stepper, Step } from '@material-ui/core';
import React from 'react';

export default function (props) {
	return (
		<Stepper
			activeStep={props.activeStep}
			alternativeLabel
            style={{ marginTop: '10px' }}
            {...props}
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
            {/* {...children} */}
		</Stepper>
	);
}
