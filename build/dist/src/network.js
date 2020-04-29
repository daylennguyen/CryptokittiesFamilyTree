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
import React, { Component } from "react";
import { Network } from "@lifeomic/react-vis-network";
// Use VisJS network graph to display the family tree. In style 😎
var StructureNetwork = /** @class */ (function (_super) {
    __extends(StructureNetwork, _super);
    function StructureNetwork() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.networkComponent = React.createRef();
        return _this;
    }
    StructureNetwork.prototype.componentDidMount = function () {
        console.log(this.networkComponent);
        this.networkComponent.current.network.on("click", function (event) {
            console.log("clicked", event);
        });
    };
    StructureNetwork.prototype.render = function (props) {
        return (React.createElement(Network, { style: {
                background: this.props.isDark === false ? "white" : "black",
                border: "black solid 1px",
            }, options: {
                autoResize: true,
                layout: {
                    hierarchical: {
                        direction: "DU",
                        sortMethod: "directed",
                    },
                },
                nodes: {
                    font: {
                        size: 32,
                        color: this.props.isDark === false ? "black" : "white",
                    },
                },
                edges: {
                    arrows: "from",
                },
            }, ref: this.networkComponent },
            this.props.nodes === []
                ? null
                : this.props.nodes.map(function (singleNode) {
                    return singleNode;
                }),
            this.props.edges === []
                ? null
                : this.props.edges.map(function (singleEdge) {
                    return singleEdge;
                })));
    };
    return StructureNetwork;
}(Component));
export { StructureNetwork };
