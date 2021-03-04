import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import { default as connect } from './utils/database';
import router from './api/routes';

const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cors({ origin: true, credentials: true }));
app.use('/', router);

connect();

export default app;
