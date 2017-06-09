"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
require("./app.scss");
var React = require("react");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var SplitPane = require("react-split-pane");
var actions_1 = require("../actions");
var data_pane_1 = require("./data-pane");
var encoding_pane_1 = require("./encoding-pane");
var header_1 = require("./header");
var view_pane_1 = require("./view-pane");
var AppBase = (function (_super) {
    __extends(AppBase, _super);
    function AppBase(props) {
        return _super.call(this, props) || this;
    }
    AppBase.prototype.componentWillUpdate = function (nextProps) {
        this.update(nextProps);
    };
    AppBase.prototype.componentWillMount = function () {
        this.update(this.props);
    };
    AppBase.prototype.render = function () {
        return (React.createElement("div", { className: "voyager" },
            React.createElement(header_1.Header, null),
            React.createElement(SplitPane, { split: "vertical", defaultSize: 200 },
                React.createElement(data_pane_1.DataPane, null),
                React.createElement(SplitPane, { split: "vertical", defaultSize: 235 },
                    React.createElement(encoding_pane_1.EncodingPane, null),
                    React.createElement(view_pane_1.ViewPane, null)))));
    };
    AppBase.prototype.update = function (props) {
        var data = props.data, config = props.config, dispatch = props.dispatch;
        if (data) {
            this.setData(data);
        }
        if (config) {
            this.setConfig(config);
        }
    };
    AppBase.prototype.setData = function (data) {
        this.props.dispatch(actions_1.datasetLoad("Custom Data", data));
    };
    AppBase.prototype.setConfig = function (config) {
        this.props.dispatch({
            type: actions_1.SET_CONFIG,
            payload: {
                config: config,
            }
        });
    };
    return AppBase;
}(React.PureComponent));
exports.App = react_dnd_1.DragDropContext(react_dnd_html5_backend_1.default)(AppBase);