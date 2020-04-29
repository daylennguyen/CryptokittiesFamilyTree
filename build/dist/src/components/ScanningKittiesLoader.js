import * as React from 'react';
import { CircularProgress, Box, Typography } from '@material-ui/core';
//
export default function (props) {
    return (React.createElement(Box, { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        React.createElement(CircularProgress, { style: { marginBottom: 10 } }),
        React.createElement(Typography, { variant: "h6" },
            props.count,
            ' ',
            props.activeStep === 1
                ? 'Kitties Scanned'
                : 'Kitties Converted to Graph Elements')));
}
