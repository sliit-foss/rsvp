import express from 'express';
import { default as connect } from './utils/database';
import router from './api/routes';

const app = express();
app.use('/', router);

connect();

export default app;
