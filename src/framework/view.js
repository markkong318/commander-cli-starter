const _ = require('lodash');
const fs = require('fs');

const envStore = require('./storage/env-store');

module.exports = new Proxy(this, {
  get: function (target, prop, receiver) {
    const name = _.kebabCase(prop);

    let path;
    if (fs.existsSync(`${__dirname}/view/${name}.js`)) {
      path = `./view/${name}`;
    } else {
      path = `../view/${name}`;
    }
    console.debug(`view: ${path}`);

    const obj = require(path);

    return new Proxy(this, {
      get: function (target, prop, receiver) {
        const fn = obj[prop];

        const output = envStore.get('output');

        name !== 'logger' && console.debug(`output: ${output || 'not assigned'}`);

        return function () {
          const args = [...arguments];

          args[0] = {
            output,
            ...args[0],
          };

          return fn(...args);
        }
      },
    });
  },
});
