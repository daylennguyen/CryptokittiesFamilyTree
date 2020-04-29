import * as React from "react";
import Brightness5Icon from "@material-ui/icons/Brightness5Outlined";
import Brightness4Icon from "@material-ui/icons/Brightness4Outlined";
import Fab from "@material-ui/core/Fab";

// Floating Action Button used to toggle on/off the dark theme
export default function(props) {
	var icon = props.isDark === true ? <Brightness4Icon /> : <Brightness5Icon />;
	return (
		<Fab
			color={props.isDark === true ? "primary" : "secondary"}
			aria-label="Dark Mode Toggle"
			style={{ position: "fixed", right: "25px", bottom: "75px" }}
			onClick={props.onClick}
		>
			{icon}
		</Fab>
	);
}
