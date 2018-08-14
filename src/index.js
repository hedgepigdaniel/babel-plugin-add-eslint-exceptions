import { CLIEngine } from 'eslint';

export default () => ({
  pre(state) {
    const cli = new CLIEngine();
    const { results } = cli.executeOnText(state.code)
    const { results: [result] } = cli.executeOnText(state.code);
    console.log(result);
  },
  post() {
  },
});
