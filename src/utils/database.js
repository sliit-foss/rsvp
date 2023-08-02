import mongoose from 'mongoose';
import { DB_CONNECTION_STRING, DB_HOST } from '../config';
import logger from '../utils/logger';

/**
 * Connect to database
 * @returns {Promise} database connection
 */
const connect = () =>
  mongoose
    .connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => logger.info(`Connected to database on ${DB_HOST}.`))
    .catch((err) => {
      logger.error(err.message);
      process.exit(0);
    });

/**
 * @module utils/database
 */
export default connect;
