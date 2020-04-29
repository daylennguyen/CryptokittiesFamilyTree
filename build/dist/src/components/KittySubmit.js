import * as React from "react";
import { TextField, Button } from "@material-ui/core";
// Component containing the form in which the user will input and submit the kitty id
function KittySubmit(props) {
    return (React.createElement("form", { onSubmit: function (event) {
            event.persist();
            event.preventDefault();
            // get the text-field value
            var input = document.querySelector("#kitty-id-field")["value"];
            props.onKittySubmit(input);
        }, style: {
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
        } },
        React.createElement(TextField, { required: true, fullWidth: true, name: "kitty-id-field", id: "kitty-id-field", variant: "outlined", label: "Kitty id or Full Kitty Url" }),
        React.createElement("label", { htmlFor: "submit-kitty-id-button" },
            React.createElement(Button, { style: { marginLeft: "25px" }, color: "primary", variant: "contained", type: "submit" }, "Submit"))));
}
export default KittySubmit;
