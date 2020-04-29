import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
var DescriptionText = function (props) { return (React.createElement(Typography, { color: "textSecondary", variant: "body2" },
    "CK-Tree is an open-source cryptokitty ancestor visualization tool.",
    React.createElement("br", null),
    "Enter a kitty id or full kitty id to scan a kittie's ancestors and display an awesome network-graph/family tree!")); };
// The expandable panel at the top of the page
export default function (props) {
    return (React.createElement(ExpansionPanel, { style: { marginBottom: '10px' } },
        React.createElement(ExpansionPanelSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
            React.createElement(Typography, { gutterBottom: true }, "Description")),
        React.createElement(ExpansionPanelDetails, { style: { justifyContent: 'center' } },
            ' ',
            React.createElement(DescriptionText, null))));
}
