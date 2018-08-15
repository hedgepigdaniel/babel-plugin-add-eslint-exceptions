import { CLIEngine } from 'eslint';

export default () => ({
  pre(state) {
    const opts = {
      ...state.opts,
    };
    console.log(opts);
    const cli = new CLIEngine(opts.eslintOpts);
    const { results } = cli.executeOnText(state.code)
    const { results: [result] } = cli.executeOnText(state.code);
    console.log(result);
  },
  post() {
  },
});
