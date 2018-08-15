"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eslint = require("eslint");

var _babelTraverse = _interopRequireDefault(require("babel-traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default() {
  var remainingMessages;

  var enterPath = function enterPath(path) {
    console.log(path.node.type);
  };

  return {
    pre: function pre() {// check that prettier passes?
    },
    visitor: {
      Program: {
        enter: function enter(path, state) {
          var opts = _objectSpread({}, state.opts);

          var eslintOpts = _objectSpread({}, opts.eslintOpts);

          var cli = new _eslint.CLIEngine(eslintOpts);

          var _cli$executeOnText = cli.executeOnText(state.file.code),
              _cli$executeOnText$re = _slicedToArray(_cli$executeOnText.results, 1),
              messages = _cli$executeOnText$re[0].messages;

          remainingMessages = messages;

          if (opts.ignoreRules) {
            remainingMessages = remainingMessages.filter(function (message) {
              return opts.ignoreRules.indexOf(message.ruleId) === -1;
            });
          }

          (0, _babelTraverse.default)(state.file.ast, {
            enter: enterPath
          });
        },
        exit: function exit() {
          if (remainingMessages.length) {
            // eslint-disable-next-line no-console
            console.error('Failed to add exceptions for the following errors:', remainingMessages);
            throw new Error("Could not add all exceptions");
          }
        }
      }
    },
    post: function post() {// Run prettier to fix formatting?
    }
  };
};

exports.default = _default;