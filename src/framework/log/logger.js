const { createLogger, transports, format } = require("winston");
const stripColor = require("strip-color");

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.message}`),
      ),
    }),
    new transports.File({
      filename: `${__dirname}/../../../.log`,
      format: format.combine(
        format.printf((info) => `${stripColor(info.message)}`),
      ),
      options: { flags: 'w' },
      level: 'debug',
    })
  ],
});

module.exports = logger;
