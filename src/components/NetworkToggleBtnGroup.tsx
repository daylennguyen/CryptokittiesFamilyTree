import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'; // Component containing the form in which the user will input and submit the kitty id
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
function NetworkToggleBtnGroup(props) {
	return (
		<ToggleButtonGroup style={{"display":'flex'}}>
			<ToggleButton value="left">
				<KeyboardArrowDownRoundedIcon />
			</ToggleButton>

			<ToggleButton value="center">
				<KeyboardArrowLeftRoundedIcon />
			</ToggleButton>

			<ToggleButton value="center">
				<KeyboardArrowRightRoundedIcon />
			</ToggleButton>
			<ToggleButton value="right">
				<KeyboardArrowUpRoundedIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	);
} 

export default NetworkToggleBtnGroup;
