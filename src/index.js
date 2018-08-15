import { CLIEngine } from 'eslint';

export default () => ({
  pre() {
    // check that prettier passes?
  },
  visitor: {
    File: {
      enter(path, state) {
        const opts = {
          ...state.opts,
        };
        const eslintOpts = {
          ...opts.eslintOpts,
        };
        const cli = new CLIEngine(eslintOpts);
        console.log(path, state);
        const { results: [result] } = cli.executeOnText(state.code);
        console.log(result);
      },
    },
  },
  post() {
    // Run prettier to fix formatting?
  },
});
