const program = require('../framework/cmd/program');
const wrapper = require('../framework/cmd/wrapper');
const api = require('../framework/api');
const view = require('../framework/view');
const configStore = require('../framework/storage/config-store');

const action = async (options, logger) => {
  configStore.set('refreshToken', '');

  await api.foo();

  view.foo.render();
};

program
  .command('foo')
  .description('foo command')
  .action(wrapper(action));
