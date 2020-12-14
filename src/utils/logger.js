import winston from 'winston';
import { NODE_ENV } from '../config';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: 'rsvp-api',
    transports: [
        new winston.transports.File({ fileName: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ fileName: 'logs/combined.log' })
    ]
});

if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;