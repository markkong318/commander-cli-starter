const program = require('../../framework/cmd/program');
const configStore = require('../../framework/storage/config-store');
const wrapper = require('../../framework/cmd/wrapper');
const view = require('../../framework/view');

const action = async (key, options) => {
  const value = configStore.get(key);
  if (!value) {
    throw new Error('Key is not existed')
  }

  view.configGet.render({
    key,
    value,
  });
};

program
  .subCommand('config get')
  .description('Get config value from key')
  .argument('<key>', 'key')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));
