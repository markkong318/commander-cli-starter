const fs = require('fs');
const os = require('os');
const mkdirp = require('mkdirp');

const packageJson = require('../../../package.json');

const configDir = `${os.homedir()}/.config/${packageJson.name}`;
const configName = 'config.json';

const configPath = `${configDir}/${configName}`;

let data = {};
let isInit = false;

const allowKeys = [
  'secret',
  'refreshToken',
];

const get = (key, defaultValue) => {
  if (!isInit) {
    load();

    isInit = true;
  }

  if (!key) {
    return data;
  }

  if (!(key in data)) {
    return defaultValue;
  }

  return data[key];
};

const set = (key, value) => {
  if (!isInit) {
    load();

    isInit = true;
  }

  if (allowKeys.indexOf(key) === -1) {
    throw new Error(`Not a valid config key '${key}'`);
  }

  data[key] = value;

  save();
};

const load = () => {
  try {
    data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    data = {};
  }
};

const save = () => {
  mkdirp.sync(configDir);
  fs.writeFileSync(configPath, JSON.stringify(data, null, 4));
};


module.exports = {
  get,
  set,
};
