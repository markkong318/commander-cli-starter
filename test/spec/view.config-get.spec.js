const Ajv = require('ajv').default;
const sinon = require('sinon');

const view = require('../../src/view/config-get');

const ajv = new Ajv({ logger: console });

const schema = {
  "type": "object",
  "required": [
    "result",
    "key",
    "value"
  ],
  "properties": {
    "result": {
      "type": "string"
    },
    "key": {
      "type": "string"
    },
    "value": {
      "type": "string"
    }
  }
};

describe('view config-get', function () {
  it('render ok json', async function () {

    const stub = sinon.stub(console, 'log');

    view.render({
      output: 'json',
      key: 'foo',
      value: 'bar',
    });

    stub.restore();

    const json = JSON.parse(stub.getCall(0).args[0]);

    ajv.validate(schema, json);

    expect(ajv.errorsText()).toEqual('No errors');
  });
});
