const os = require('os');
const mock = require('mock-fs');

let configStore;

const keys = [
  'secret',
  'refreshToken',
];

describe('config-store', function () {
  beforeAll(function () {
    delete require.cache[require.resolve('../../src/framework/storage/config-store')];

    configStore = require('../../src/framework/storage/config-store');

    const path = `${os.homedir()}/.config/`;

    mock({
      [path]: {},
    });
  });

  afterAll(function () {
    mock.restore();
  });

  it('gets default key', async function () {
    for (const key of keys) {
      const val = configStore.get(key);
      expect(val).toEqual(undefined);
    }
  });

  it('sets key value', async function () {
    for (const key of keys) {
      configStore.set(key, 'foo');
      const val = configStore.get(key);

      expect(val).toEqual('foo');
    }
  });

  it('rejects to set the invalid key', async function () {
    let val = undefined;

    try {
      configStore.set('invalid_key', 'bar');
    } catch (err) {
      val = err;
    }

    expect(val).not.toEqual(undefined);
  });
});
