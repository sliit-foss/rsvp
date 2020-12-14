import express from 'express';
import { default as connect } from './utils/database';

const app = express();
connect();

export default app;
