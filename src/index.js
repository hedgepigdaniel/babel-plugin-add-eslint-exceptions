import { CLIEngine } from 'eslint';

export default () => ({
  pre(state) {
    const cli = new CLIEngine();
    console.log(cli.executeOnText(state.code));
  },
  post() {
  },
});
