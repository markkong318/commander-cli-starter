const api = require('../../src/api/foo');

describe('api foo', function () {
  it('has valid request', async function () {
    const result = await api({});
    expect({}).toEqual(result);
  });
});
