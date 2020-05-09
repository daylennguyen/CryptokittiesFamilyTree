import * as React from 'react';
import Brightness5Icon from '@material-ui/icons/Brightness5Outlined';
import Brightness4Icon from '@material-ui/icons/Brightness4Outlined';
import Fab from '@material-ui/core/Fab';

// Floating Action Button used to toggle on/off the dark theme
export default function (props: {
	isDark: boolean;
	onClick:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined;
}) {
	var icon = props.isDark === true ? <Brightness5Icon /> : <Brightness4Icon />;
	return (
		<Fab
			color={props.isDark === false ? 'primary' : 'secondary'}
			aria-label="Dark Mode Toggle"
			style={{ position: 'fixed', right: '25px', bottom: '75px' }}
			onClick={props.onClick}
		>
			{icon}
		</Fab>
	);
}
