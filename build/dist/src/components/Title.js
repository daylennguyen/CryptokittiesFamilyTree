import * as React from 'react';
import { Typography } from '@material-ui/core';
export default function Title(props) {
    var _a = React.useState('🐱'), kittyEmoji = _a[0], setEmoji = _a[1];
    var Emotes = ['😼', '😹', '🙀', '😾', '😿', '😻', '😺', '😸', '😽'];
    return (React.createElement("header", null,
        React.createElement("a", { href: "/", style: { textDecoration: 'none' } },
            React.createElement(Typography, { variant: "h1", color: "textPrimary" },
                "CK-Tree",
                React.createElement("span", { role: "img", "aria-label": "kitty", onMouseOver: function () {
                        // set the kitty face to a random one from the array
                        var rand = Math.floor(Math.random() * 9) + 1;
                        setEmoji(Emotes[rand]);
                    }, onMouseLeave: function () {
                        // return the kitty face to default value
                        setEmoji('🐱');
                    } }, kittyEmoji),
                React.createElement("span", { role: "img", "aria-label": "tree" }, "\uD83C\uDF32")))));
}
