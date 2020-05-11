import * as React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'; // Component containing the form in which the user will input and submit the kitty id
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { Tooltip } from '@material-ui/core';
function NetworkToggleBtnGroup(props) {
	const [layout, setLayout] = React.useState('UD');
	const [selected, setSelected] = React.useState(true);

	const handleChange = (event, newAlignment) => {
		if (newAlignment !== null) {
			setLayout(newAlignment);
			props.HandleLayoutChange(newAlignment);
		}
	};
	return (
		<span style={{ display: 'flex', justifyContent: 'space-around' }}>
			<ToggleButtonGroup
				// style={{ display: 'flex' }}
				value={layout}
				onChange={handleChange}
				exclusive
			>
				<ToggleButton value="UD" key={1}>
					<Tooltip title="UpDown Layout" aria-label="UpDown Graph Layout">
						<KeyboardArrowDownRoundedIcon />
					</Tooltip>
				</ToggleButton>
				<ToggleButton value="RL" key={2}>
					<Tooltip title="RightLeft Layout" aria-label="RightLeft Graph Layout">
						<KeyboardArrowLeftRoundedIcon />
					</Tooltip>
				</ToggleButton>
				<ToggleButton value="LR" key={3}>
					<Tooltip title="LeftRight Layout" aria-label="LeftRight Graph Layout">
						<KeyboardArrowRightRoundedIcon />
					</Tooltip>
				</ToggleButton>
				<ToggleButton value="DU" key={4}>
					<Tooltip title="DownUp Layout" aria-label="DownUp Graph Layout">
						<KeyboardArrowUpRoundedIcon />
					</Tooltip>
				</ToggleButton>
				<ToggleButton value="UNLOCK" key={5}>
					<Tooltip title="Unlocked Layout" aria-label="Unlocked Graph Layout">
						<ControlCameraIcon />
					</Tooltip>
				</ToggleButton>
			</ToggleButtonGroup>
			<ToggleButton
				value="PHYSICS"
				key={6}
				selected={selected}
				onChange={() => {
					setSelected(!selected);
					props.physics(!selected);
				}}
			>
				<Tooltip title="Physics Toggle" aria-label="Physics Toggle">
					<FitnessCenterIcon />
				</Tooltip>
			</ToggleButton>
		</span>
	);
}

export default NetworkToggleBtnGroup;
