const _ = require('lodash');
const chalk = require('chalk');
const util = require('util');

const renderError = ({ output, err }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        result: 'error',
        message: err.message.replace(/^(Error:\.)/, "").trimStart(),
      }));
      break;
    default:
      console.error(chalk.bold.red('Error: ') + chalk.red(err.message.replace(/^(Error:\.)/, "").trimStart()));
  }

  return true;
};

const render = (args) => {
  console.debug('error:');
  console.debug(util.inspect(args.err, {
    colors: true,
    depth: 4,
  }));

  renderError(args);
};

module.exports = {
  render,
};
