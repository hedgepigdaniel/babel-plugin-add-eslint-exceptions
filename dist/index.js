"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eslint = require("eslint");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default() {
  return {
    pre: function pre(state) {
      var cli = new _eslint.CLIEngine();

      var _cli$executeOnText = cli.executeOnText(state.code),
          results = _cli$executeOnText.results;

      var _cli$executeOnText2 = cli.executeOnText(state.code),
          _cli$executeOnText2$r = _slicedToArray(_cli$executeOnText2.results, 1),
          result = _cli$executeOnText2$r[0];

      console.log(result);
    },
    post: function post() {}
  };
};

exports.default = _default;