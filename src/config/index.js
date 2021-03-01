require('dotenv').config();

export const MAIL = {
    HOST: process.env.MAIL_HOST || "smtp.mailtrap.io",
    PORT: process.env.MAIL_PORT || "2525",
    USER: process.env.MAIL_USER || "c8cca3941aea9c",
    PASSWORD: process.env.MAIL_PASSWORD || "18763bafd470a9",
}
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const VERSION = process.env.VERSION || '0.1.0';

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