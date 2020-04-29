var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Box, Card, Container, CssBaseline, Step, StepLabel, Stepper, ThemeProvider, } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { render } from 'react-dom';
import DarkModeToggleButton from './components/DarkModeToggleButton';
import Description from './components/Description';
import KittySubmit from './components/KittySubmit';
import ScanningKittiesLoader from './components/ScanningKittiesLoader';
import Title from './components/Title';
import { StructureNetwork } from './network';
import './styles/styles.css';
import { asyncGetKittyJSON, checkForFullKittyAddress, fullAddressToShortID, } from './util/fetchKitty';
// Material UI theme objects passed to theme provide, primarily used to toggle dark theme
var darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});
var lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
});
// Root Application Component
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            // Node components given to visjs graph; updated by fetchkitty.js
            kittyNodes: [],
            // Edge compoenents given to visjs graph
            kittyEdges: [],
            // Stepper progress
            activeStep: 0,
            // Count of kitties fetched through api
            scannedKitties: 0,
            theme: {
                isDark: false,
            },
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (React.createElement(ThemeProvider, { theme: this.state.theme.isDark === false ? lightTheme : darkTheme },
            React.createElement(CssBaseline, null),
            React.createElement(DarkModeToggleButton, { isDark: this.state.theme.isDark, onClick: function () {
                    _this.setState({
                        theme: {
                            isDark: _this.state.theme.isDark === true ? false : true,
                        },
                    });
                } }),
            React.createElement(Box, { className: "App" },
                React.createElement(Title, null),
                React.createElement(Container, null,
                    React.createElement(Description, null),
                    React.createElement(Card, { variant: "outlined", style: { padding: '100px' } },
                        this.state.activeStep === 0 ? (React.createElement(KittySubmit, { onKittySubmit: function (input) {
                                if (checkForFullKittyAddress(input)) {
                                    //parse the id from the url
                                    input = fullAddressToShortID(input);
                                }
                                // check for invalid input and parse int NaN==NotANumber
                                if (!isNaN(Number.parseInt(input, 10)) && input !== '0') {
                                    input = Number.parseInt(input, 10);
                                    _this.setState({ activeStep: 1 });
                                    asyncGetKittyJSON(input, function (Nodes, Edges) {
                                        _this.setState({
                                            kittyNodes: Nodes,
                                            kittyEdges: Edges,
                                        });
                                    }, function (ScannedCount) {
                                        _this.setState({ scannedKitties: ScannedCount });
                                    }, function (step) {
                                        _this.setState({ activeStep: step });
                                    });
                                }
                            } })) : (''),
                        this.state.activeStep === 1 || this.state.activeStep === 2 ? (React.createElement(ScanningKittiesLoader, { activeStep: this.state.activeStep, count: this.state.scannedKitties })) : (''),
                        React.createElement("main", null, this.state.activeStep === 4 ? (React.createElement(StructureNetwork, { className: 'network', isDark: this.state.theme.isDark, edges: this.state.kittyEdges, nodes: this.state.kittyNodes })) : (''))),
                    React.createElement(Stepper, { activeStep: this.state.activeStep, alternativeLabel: true, style: { marginTop: '10px' } },
                        React.createElement(Step, null,
                            React.createElement(StepLabel, null, "Submit KittyId")),
                        React.createElement(Step, null,
                            React.createElement(StepLabel, null, "Scan Ancestor Kitties")),
                        React.createElement(Step, null,
                            React.createElement(StepLabel, null, "Create Graph Elements")),
                        React.createElement(Step, null,
                            React.createElement(StepLabel, null, "View Graph")))),
                React.createElement("footer", null,
                    React.createElement("a", { href: "https://flannyan.argent.xyz/" }, "eth donations: 0xb41919C5700779c45116377657Ce56B4E3508eb3")))));
    };
    return App;
}(React.Component));
var rootElement = document.getElementById('root');
render(React.createElement(App, null), rootElement);
