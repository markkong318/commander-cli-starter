const chalk = require('chalk');
const stripColor = require('strip-color');
const wcwidth = require('wcwidth');

class CliTable {
  constructor({ header, width = [], style = [] }) {
    this.header = header;
    this.width = width;
    this.style = style;

    this.separator = '-----';

    this.rows = [];

    for (let i = 0; i < this.header.length; i++) {
      this.style[i] = this.style[i] ? this.style[i] : (s) => s;
    }
  }

  push(...args) {
    let hasArray = false;
    let maxArrayLength = 0;

    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        hasArray = true;
        maxArrayLength = Math.max(maxArrayLength, args[i].length);
      }
    }

    if (hasArray) {
      for (let i = 0; i < maxArrayLength; i++) {
        const row = [];

        for (let j = 0; j < args.length; j++) {
          if (!Array.isArray(args[j])) {
            if (i === 0) {
              row.push(args[j]);
            } else {
              row.push('');
            }
            continue;
          }

          if (i >= args[j].length) {
            row.push('');
          }

          row.push(args[j][i]);
        }

        this.rows.push([...row]);
      }
      return;
    }


    this.rows.push([...args]);
  }

  draw() {
    let line;

    for (let i = 0; i < this.header.length; i++) {
      let max = Math.max(this.header[i].length, this.header[i] ? this.separator.length : 0);

      for (let j = 0; j < this.rows.length; j++) {
        max = Math.max(max, wcwidth(stripColor(`${this.rows[j][i]}` || '')));
      }

      if (this.width[i]) {
        if (this.width[i] <= max) {
          this.width[i] = max;

          if (i !== this.header.length - 1) {
            this.width[i] += 1;
          }
        }
      } else {
        this.width[i] = max;

        if (i !== this.header.length - 1) {
          this.width[i] += 1;
        }
      }
    }

    line = '';
    for (let i = 0; i < this.header.length; i++) {
      line += this.header[i].padEnd(this.width[i]);
    }

    console.log(chalk.bold(line));

    line = '';
    for (let i = 0; i < this.header.length; i++) {
      if (!this.header[i]) {
        line += ''.padEnd(this.width[i]);
        continue;
      }

      line += this.separator.padEnd(this.width[i]);
    }
    console.log(line);

    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];

      line = '';
      for (let j = 0; j < row.length; j++) {
        let colorText = this.style[j](`${row[j]}` || '');
        line += colorText.padEnd(this.width[j] + (colorText.length - wcwidth(stripColor(colorText))));
      }

      console.log(line);
    }
  }
}

const create = (options) => new CliTable(options);

module.exports = {
  create,
};
