import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button  from "@material-ui/core/Button";
// Component containing the form in which the user will input and submit the kitty id


function KittySubmit(props: { onKittySubmit: (arg0: any) => void; }) {
	return (
		<form 
			onSubmit={(event) => {
				event.persist();
				event.preventDefault();
				// get the text-field value
				let kittyIdField = document.querySelector("#kitty-id-field") as HTMLInputElement 
				let input: any = kittyIdField["value"];
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
