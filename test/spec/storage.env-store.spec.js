const os = require('os');
const mock = require('mock-fs');

const packageJson = require('../../package.json');

let envStore;
let configStore;

const keys = [
  'secret',
  'refreshToken',
];

describe('env-store', function () {
  beforeAll(function () {
    delete require.cache[require.resolve('../../src/framework/storage/env-store')];
    delete require.cache[require.resolve('../../src/framework/storage/config-store')];

    envStore = require('../../src/framework/storage/env-store');
    configStore = require('../../src/framework/storage/config-store');

    const path = `${os.homedir()}/.config/${packageJson.name}`;

    mock({
      [path]: {
        'config.json': '{}'
      },
    });
  });

  afterAll(function () {
    mock.restore();
  });

  it('gets default key in config', async function () {
    for (const key of keys) {
      const val = configStore.get(key);
      expect(val).toEqual(undefined);
    }
  });

  it('gets default key in env', async function () {
    for (const key of keys) {
      const val = envStore.get(key);
      expect(val).toEqual(undefined);
    }
  });

  it('sets key to config', async function () {
    for (const key of keys) {
      let val;

      configStore.set(key, 'foo');

      val = envStore.get(key);
      expect(val).toEqual('foo');

      val = configStore.get(key);
      expect(val).toEqual('foo');
    }
  });

  it('overwrites key to env', async function () {
    for (const key of keys) {
      let val;

      envStore.set(key, 'bar');

      val = configStore.get(key);
      expect(val).toEqual('foo');

      val = envStore.get(key);
      expect(val).toEqual('bar');
    }
  });

  it('gets and sets all', async function () {
    let val;

    const obj = {};
    for (const key of keys) {
      obj[key] = 'foo';
    }

    envStore.setAll({
      ...obj,
    });

    for (const key of keys) {
      val = envStore.get(key);
      expect(val).toEqual('foo');
    }

    val = envStore.getAll();
    expect(val).toEqual({
      ...obj,
    });
  });
});
