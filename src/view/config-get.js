const render = ({ output, key, value }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        result: 'ok',
        key,
        value,
      }));
      break;
    default:
      console.log(value);
  }
};

module.exports = {
  render,
};
