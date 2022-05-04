export const MAIL = {
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER,
  PASSWORD: process.env.MAIL_PASSWORD,
};

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const VERSION = process.env.VERSION || '0.1.0';
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PRIV_KEY = process.env.PRIV_KEY;

/**
 * @constant DB_CONNECTION_STRING database connection string
 * @example mongodb://localhost:27017/db_name
 * 'mongodb://root:myfoss@localhost:27017/rsvp?authSource=admin'
 */
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING

/**
 * @constant DB_HOST hostname of database. Can be an IP or an URI.
 * @example localhost
 */
export const DB_HOST = process.env.DB_HOST || 'localhost';

export const SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT , 'base64').toString()) :  require("./serviceAccount.json");

export const STORAGE_BUCKET =
  process.env.FIREBASE_STORAGE_BUCKET;
