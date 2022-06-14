const configStore = require('./config-store');

let data = {};

const get = (key, defaultValue) => {
  let value = undefined;

  value = data[key];
  if (value !== undefined) {
    return value
  }

  value = configStore.get(key);
  if (value !== undefined) {
    return value;
  }

  value = defaultValue;
  if (value !== undefined) {
    return value;
  }

  return value;
};

const getAll = () => {
  return data;
};

const set = (key, value) => {
  data[key] = value;
};

const setAll = (obj) => {
  data = {
    ...data,
    ...obj,
  }
};

module.exports = {
  get,
  getAll,
  set,
  setAll,
};
