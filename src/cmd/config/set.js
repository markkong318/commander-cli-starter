const program = require('../../framework/cmd/program');
const configStore = require('../../framework/storage/config-store');
const wrapper = require('../../framework/cmd/wrapper');
const view = require('../../framework/view');

const action = async (key, value, options) => {
  configStore.set(key, value);

  view.configSet.render({
    key,
    value,
  });
};


program
  .subCommand('config set')
  .description('Set key-value to config')
  .argument('<key>', 'key')
  .argument('[value]', 'value')
  .option('--output <output>', 'Output target')
  .action(wrapper(action));
