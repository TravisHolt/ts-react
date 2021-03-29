"use strict";
exports.__esModule = true;
var react_1 = require("react");
function saveLayout(a) { throw new Error('this should post layout to db'); }
;
var LayoutWidget = function () {
    var _a = react_1.useState({ id: 1, test: '' }), layout = _a[0], setLayout = _a[1];
    return (<button onClick={function () { return saveLayout(layout); }}> Submit </button>);
};
