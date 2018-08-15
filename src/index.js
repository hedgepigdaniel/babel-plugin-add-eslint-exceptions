import { CLIEngine } from 'eslint';

export default () => ({
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
        console.log(state.code);
        const { results: [result] } = cli.executeOnText(state.code);
        console.log(result);
      },
    },
  },
  post() {
    // Run prettier to fix formatting?
  },
});
