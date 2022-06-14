const { program } = require('commander');

const commands = {};

const doSubCommand = (target, name) => {
  const subNames = name.split(' ').filter(subName =>
    subName[0] !== '[' && subName[0] !== '<'
  );

  const args = name.split(' ').slice(subNames.length);

  if (subNames.length < 2) {
    return target.command(name);
  }

  let path = '';
  let current = target;

  for (let i = 0; i < subNames.length; i++) {
    const subName = subNames[i];

    path += `${subName}.`;
    if (!commands[path]) {
      if (i === subNames.length - 1) {
        commands[path] = current.command(`${subName} ${args}`);
      } else {
        commands[path] = current.command(subName);
      }
    }
    current = commands[path];
  }
  return current;
}

const doAction = (target, ...arguments) => {
  return target
    .option('-v, --verbose', 'Verbose mode: will also output debug messages')
    .action(...arguments);
}

const proxy = (target) => new Proxy(target, {
  get: function (target, prop, receiver) {
    return function () {
      let command;

      switch (prop) {
        case 'subCommand':
          command = doSubCommand(target, ...arguments);
          break;
        case 'action':
          command = doAction(target, ...arguments);
          break;
        default:
          command = target[prop](...arguments);
      }
      return proxy(command);
    }
  }
});

module.exports = proxy(program);
