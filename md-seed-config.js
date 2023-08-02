import mongoose from 'mongoose';
import { default as mongoConnect } from './src/utils/database';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () => mongoConnect();
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
