import fs from 'fs';
import winston, { format, Logger } from 'winston';

const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger: Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    }),

    new winston.transports.File({
      filename: `${logDir}/results.log`,
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default logger;
