const render = ({ output }) => {
  switch (output) {
    case 'json':
      console.log(JSON.stringify({
        result: 'ok',
      }));
      break;
    default:
      console.log('bar');
  }
};

module.exports = {
  render,
};
