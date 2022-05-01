import winston from 'winston';
import { NODE_ENV } from '../config';

const stacktrace = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    })
  }
  return info
})

const logger = winston.createLogger({
  format: winston.format.combine(stacktrace(), winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({
      filename: `logs/error/${new Date().toISOString().slice(0, 10)}.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `logs/combined/${new Date().toISOString().slice(0, 10)}.log`,
    }),
  ],
})

// Dev console logging
if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        stacktrace(),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  )
}

export default logger;

