require('dotenv').config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * @constant DB_CONNECTION_STRING database connection string
 * @example mongodb://localhost:27017/db_name
 */
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/rsvp';

/**
 * @constant DB_HOST hostname of database. Can be an IP or an URI.
 * @example localhost 
 */
export const DB_HOST = process.env.DB_HOST || 'localhost';