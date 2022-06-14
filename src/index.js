#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const walkSync = require('walk-sync');
const program = require('./framework/cmd/program');

const packageJson = require('../package.json');

program.version(packageJson.version);

const paths = walkSync(`${__dirname}/cmd`, {
  directories: false,
  globs: ['**/*.js']
});

for (let i = 0; i < paths.length; i++) {
  require(`${__dirname}/cmd/${paths[i]}`);
}

program.parse(process.argv);

updateNotifier({ pkg: packageJson }).notify();
