import { CLIEngine } from "eslint";

export default () => {
  let remainingMessages;
  return {
    pre() {
      // check that prettier passes?
    },
    visitor: {
      Program: {
        enter(path, state) {
          const opts = {
            ...state.opts
          };
          const eslintOpts = {
            ...opts.eslintOpts
          };
          const cli = new CLIEngine(eslintOpts);
          const {
            results: [{ messages }]
          } = cli.executeOnText(state.file.code);
          remainingMessages = messages;
          if (opts.ignoreRules) {
            remainingMessages = remainingMessages.filter(
              message => opts.ignoreRules.indexOf(message.ruleId) === -1
            );
          }
        }
      }
    },
    post(state) {
      const brokenRules = Array.from(
        new Set(remainingMessages.map(message => message.ruleId)).values()
      );
      const comment = `/* eslint-disable ${brokenRules.join(",")} */`;
      console.log(state);
      console.log(brokenRules);
      console.log(comment);
    }
  };
};
