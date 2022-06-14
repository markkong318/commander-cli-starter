const envStore = require('../storage/env-store');
const view = require('../view');
const logger = require('../log/logger');

module.exports = (fn) => {
  return async (...arguments) => {
    const args = arguments.slice(0, -2);
    const options = arguments[arguments.length - 2];

    envStore.setAll(options);

    if (options.verbose) {
      logger.level = 'debug';
    }

    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};

    console.log = view.logger.info({ logger });
    console.error = view.logger.error({ logger });
    console.debug = view.logger.debug({ logger });

    try {
      console.debug('args:');
      console.debug(args);
      console.debug('options:');
      console.debug(options);

      await fn(...args, options, logger);
    } catch (err) {
      view.error.render({ err });
      process.exitCode = 1;
    } finally {
      console.debug('done');
    }
  }
};
