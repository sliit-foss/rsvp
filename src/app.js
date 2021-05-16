import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import {default as connect} from './utils/database';
import router from './api/routes';
import {SESSION_SECRET} from "./config";

const app = express();

app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ENABLING SESSION
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(cors({ origin: true, credentials: true }));
app.use('/', router);

connect();

export default app;
