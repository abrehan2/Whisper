// Imports:
import winston from 'winston';
import path from 'path';

export default function Logger(level: string, message: string) {
  return winston
    .createLogger({
      level,
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({
          filename: path.join(__dirname, '../../app', 'logs', 'error.log'),
        }),
      ],
    })
    .log({
      level,
      message,
    });
}
