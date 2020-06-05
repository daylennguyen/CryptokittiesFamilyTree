import React, { useState } from 'react';
import { Button } from '@storybook/react/demo';
import { createMuiTheme, Typography, Box, Container } from '@material-ui/core';
import DarkModeToggleButton from '../src/components/DarkModeToggleButton.tsx';
import Title from '../src/components/Title.tsx';
import Description from '../src/components/Description.tsx';
import GeneTable from '../src/components/GeneTable.tsx';
import '../src/styles/styles.css';
import { ThemeProvider } from 'styled-components';

export default { title: 'Material UI Based' };
// Material UI theme objects passed to theme provide, primarily used to toggle dark theme
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});
const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

window.theme = darkTheme;

export const DarkModeButton = (props) =>
{
    const [isDark, setIsDark] = useState(false);
    return (
        <Container>
            <Typography
                variant="h1"
                style={ { display: 'flex', width: '100%', justifyContent: 'center' } }
            >
                { isDark ? 'DARK' : 'LIGHT' }
            </Typography>
            <DarkModeToggleButton
                isDark={ isDark }
                onClick={ (ev) =>
                {
                    if (!isDark)
                    {
                        window.theme = darkTheme;
                        document.bgColor = window.theme.palette.background.default;
                    } else
                    {
                        console.log(window.theme.palette);
                        window.theme = lightTheme;
                        document.bgColor = window.theme.palette.background.default;
                    }
                    setIsDark(!isDark);
                } }
            />
        </Container>
    );
};

export const DropDownDescription = () =>
{
    return (
        <Container>
            <Description style={ { mixBlendMode: "difference", color: "unset" } } />
        </Container>
    );
};

export const title = () => (
    <Title />
);


const CKBoxTraitData = [
    [
        "sphynx",
        "munchkin",
        "sphynx",
        "sphynx"
    ],
    [
        "jaguar",
        "jaguar",
        "jaguar",
        "jaguar"
    ],
    [
        "sizzurp",
        "sizzurp",
        "topaz",
        "chestnut"
    ],
    [
        "simple",
        "simple",
        "crazy",
        "simple"
    ],
    [
        "orangesoda",
        "orangesoda",
        "orangesoda",
        "orangesoda"
    ],
    [
        "lemonade",
        "lemonade",
        "swampgreen",
        "chocolate"
    ],
    [
        "granitegrey",
        "granitegrey",
        "kittencream",
        "kittencream"
    ],
    [
        "WE05",
        "WE03",
        "WE05",
        "WE00"
    ],
    [
        "pouty",
        "pouty",
        "happygokitty",
        "pouty"
    ],
    [
        "EN14",
        "EN06",
        "EN09",
        "EN14"
    ],
    [
        "SE06",
        "SE07",
        "SE06",
        "SE06"
    ],
    [
        "PU11",
        "PU09",
        "PU11",
        "PU11"
    ]
];


export const CKBoxDataGeneTable = () =>
{
    // console.log(CKBoxTraitData)
    return (<Container><GeneTable traits={ CKBoxTraitData }>
    </GeneTable></Container>);

};
