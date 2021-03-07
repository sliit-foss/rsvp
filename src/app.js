import express from 'express';
import { default as connect } from './utils/database';
import router from './api/routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())
app.use('/', router);

connect();

export default app;
