import { CLIEngine } from 'eslint';

export default () => ({
  pre(state) {
    console.log(arguments);
    const opts = {
      ...state.opts,
    };
    console.log(opts);
    const cli = new CLIEngine(opts.eslintOpts);
    const { results: [result] } = cli.executeOnText(state.code);
    console.log(result);
  },
  visitor: {
    StringLiteral(path, state) {
      console.log(state.opts);
    },
  },
  post() {
  },
});
