var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// good example kitty small tree 922339
// medium tree - 1812122
import React from 'react';
import { Node, Edge } from '@lifeomic/react-vis-network';
// ex. kitty url
// https://www.cryptokitties.co/kitty/1828056
var FETCH_INTERVAL = 700, // how often we make a fetch to the api
STEP_CONVERT_TO_ELEMENTS = 2, apiURL = 'https://api.cryptokitties.co/kitties/', kittyAnchor = '/kitty/', invalidKittyAlert = function (kittyid) {
    return "Invalid Kitty - Kitty Not Found!\n\nNo Kitty Found at:\nhttps://api.cryptokitties.co/kitties/" + kittyid + "\n\nPlease enter a valid kitty id";
};
export function checkForFullKittyAddress(address) {
    var result = false;
    if (address.includes(kittyAnchor)) {
        result = true;
    }
    return result;
}
export function fullAddressToShortID(address) {
    var result = address.slice(address.lastIndexOf(kittyAnchor) + kittyAnchor.length);
    return result;
}
function makeEdgeComponent(json) {
    return React.createElement(Edge, { key: json.id, id: json.id, from: json.from, to: json.to });
}
// create the kitty node to be inserted into the graph
function makeNodeComponent(json) {
    return (React.createElement(Node, { id: "" + json.id, key: "" + json.key, label: "(Gen" + json.gen + ") (" + (json.name !== null ? json.name : '#' + json.id) + ")", shape: "image", size: 50, image: json.img }));
}
// removes unnecessary data from kitty json given by api
var ExtractNode = function (jsonKitty) {
    return {
        id: jsonKitty.id,
        key: jsonKitty.id,
        img: jsonKitty.image_url_cdn,
        gen: jsonKitty.generation,
        name: jsonKitty.name,
    };
};
// pass the child, it will return an object containing the JSON that will be converted to edges
var ExtractEdge = function (jsonKitty, edgeid) {
    return {
        matron: {
            from: jsonKitty.id,
            to: jsonKitty.matron.id,
            id: edgeid + 1,
        },
        sire: { from: jsonKitty.id, to: jsonKitty.sire.id, id: edgeid + 2 },
    };
};
// perform breadth first search to retrieve the ancestors of our kitties
export function asyncGetKittyJSON(kittyid, callback, setCount, setActiveStep) {
    return __awaiter(this, void 0, void 0, function () {
        var NodeArray, 
        // contains the edges for the graph (JSON OBJ)
        EdgeArray, 
        // holds the response, from fetching the matron and sire of each kitty.
        // the calls will end when this queue/array is empty.
        Kittyqueue, currentKitty, response, jsonForm, edgeIdCount, fetchingCKOnInterval;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    NodeArray = [], EdgeArray = [], Kittyqueue = [];
                    return [4 /*yield*/, fetch(apiURL + kittyid)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    jsonForm = _a.sent();
                    try {
                        jsonForm = JSON.parse(jsonForm);
                    }
                    catch (error) {
                        // jsonForm = null;
                        if (jsonForm === 'Not Found' || jsonForm === 'Bad Request') {
                            alert(invalidKittyAlert);
                            jsonForm = null;
                        }
                        setActiveStep(0);
                    }
                    if (jsonForm !== null) {
                        // kitty queue is initialized with the ck corresponding to the user input
                        Kittyqueue.push(jsonForm);
                        edgeIdCount = 420;
                        fetchingCKOnInterval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var curredge, response_1, jsonForm_1, err_1, response_2, jsonForm_2, err_2, KittyNodeComponents, KittyEdgeComponents, nodeJson, edgeJson;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(Kittyqueue.length > 0)) return [3 /*break*/, 10];
                                        currentKitty = Kittyqueue.shift();
                                        NodeArray.push(ExtractNode(currentKitty));
                                        if (!(currentKitty.generation > 0)) return [3 /*break*/, 9];
                                        curredge = ExtractEdge(currentKitty, edgeIdCount);
                                        edgeIdCount += 2;
                                        EdgeArray.push(curredge['matron']);
                                        EdgeArray.push(curredge['sire']);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, fetch(apiURL + curredge['matron'].to)];
                                    case 2:
                                        response_1 = _a.sent();
                                        return [4 /*yield*/, response_1.json()];
                                    case 3:
                                        jsonForm_1 = _a.sent();
                                        Kittyqueue.push(jsonForm_1);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_1 = _a.sent();
                                        console.error('Error while fetching matron', err_1);
                                        return [3 /*break*/, 5];
                                    case 5:
                                        _a.trys.push([5, 8, , 9]);
                                        return [4 /*yield*/, fetch(apiURL + curredge['sire'].to)];
                                    case 6:
                                        response_2 = _a.sent();
                                        return [4 /*yield*/, response_2.json()];
                                    case 7:
                                        jsonForm_2 = _a.sent();
                                        Kittyqueue.push(jsonForm_2);
                                        return [3 /*break*/, 9];
                                    case 8:
                                        err_2 = _a.sent();
                                        console.error('Error while fetching sire', err_2);
                                        return [3 /*break*/, 9];
                                    case 9:
                                        setCount(NodeArray.length);
                                        return [3 /*break*/, 11];
                                    case 10:
                                        clearInterval(fetchingCKOnInterval);
                                        setActiveStep(STEP_CONVERT_TO_ELEMENTS);
                                        KittyNodeComponents = [], KittyEdgeComponents = [];
                                        // STEP_CONVERT_TO_ELEMENTS
                                        for (nodeJson in NodeArray) {
                                            KittyNodeComponents.push(makeNodeComponent(NodeArray[nodeJson]));
                                            setCount(nodeJson);
                                        }
                                        for (edgeJson in EdgeArray) {
                                            KittyEdgeComponents.push(makeEdgeComponent(EdgeArray[edgeJson]));
                                            setCount(edgeJson);
                                        }
                                        callback(KittyNodeComponents, KittyEdgeComponents);
                                        setActiveStep(4);
                                        _a.label = 11;
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); }, FETCH_INTERVAL);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
