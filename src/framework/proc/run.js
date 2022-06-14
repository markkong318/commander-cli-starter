const { spawn } = require('child_process');

const run = async (cmd) => {
  const deferred = {};
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  const [command, ...options] = cmd.split(' ');

  console.debug(`command: ${command}`);
  console.debug('options:');
  console.debug(options);

  const process = spawn(command, options);

  let output = '';

  process.stdout.on('data', (data) => {
    output += data;
    data.toString().split('\n').forEach(val => console.debug(`stdout: ${val}`));
  });

  process.stderr.on('data', (data) => {
    data.toString().split('\n').forEach(val => console.debug(`stderr: ${val}`));
  });

  process.on('close', (code) => {
    console.debug(`child process exited with code ${code}`);
    deferred.resolve({
      code,
      output,
    });
  });

  return promise;
}

module.exports = run;
