import { CLIEngine } from 'eslint';

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
            ...state.opts,
          };
          const eslintOpts = {
            ...opts.eslintOpts,
          };
          const cli = new CLIEngine(eslintOpts);
          const { results: [ { messages }] } = cli.executeOnText(state.file.code);
          remainingMessages = messages;
        },
        exit() {
          if (remainingMessages.length) {
            // eslint-disable-next-line no-console
            console.error(
              'Failed to add exceptions for the following errors:',
              remainingMessages,
            );
            throw new Error("Could not add all exceptions");
          }
        }
      },
    },
    post() {
      // Run prettier to fix formatting?
    },
  };
};
