import * as React from "react";
import { TextField, Button } from "@material-ui/core";
// Component containing the form in which the user will input and submit the kitty id
function KittySubmit(props) {
	return (
		<form
			onSubmit={(event) => {
				event.persist();
				event.preventDefault();
				// get the text-field value
				let input = document.querySelector("#kitty-id-field")["value"];
				props.onKittySubmit(input);
			}}
			style={{
				display: "flex",
				flexFlow: "row",
				alignItems: "center",
			}}
		>
			<TextField
				required
				fullWidth
				name="kitty-id-field"
				id="kitty-id-field"
				variant="outlined"
				label="Kitty id or Full Kitty Url"
			/>
			<label htmlFor="submit-kitty-id-button">
				<Button
					style={{ marginLeft: "25px" }}
					color="primary"
					variant="contained"
					type="submit"
				>
					Submit
				</Button>
			</label>
		</form>
	);
}

export default KittySubmit;
