import express from 'express';
import bodyParser from 'body-parser';
import { default as connect } from './utils/database';
import router from './api/routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

connect();

export default app;
