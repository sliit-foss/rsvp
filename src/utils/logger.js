import winston from 'winston';

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
    new winston.transports.Console({
      format: winston.format.combine(
        stacktrace(),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
})

export default logger;

