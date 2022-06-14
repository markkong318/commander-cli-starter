const Ajv = require('ajv').default;
const sinon = require('sinon');

const view = require('../../src/view/foo');

const ajv = new Ajv({ logger: console });

const schema = {
  "type": "object",
  "required": [
    "result"
  ],
  "properties": {
    "result": {
      "type": "string"
    }
  }
};

describe('view login', function () {
  it('render ok json', async function () {

    const stub = sinon.stub(console, 'log');

    view.render({
      output: 'json',
    });

    stub.restore();

    const json = JSON.parse(stub.getCall(0).args[0]);

    ajv.validate(schema, json);

    expect(ajv.errorsText()).toEqual('No errors');
  });
});
