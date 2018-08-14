"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eslint = require("eslint");

var _default = function _default() {
  return {
    pre: function pre(state) {
      var cli = new _eslint.CLIEngine();
      console.log(cli.executeOnText(state.code));
    },
    post: function post() {}
  };
};

exports.default = _default;