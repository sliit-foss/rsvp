import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import {default as connect} from './utils/database';
import router from './api/routes';
import {VERSION} from "./config";

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

//ENABLING SESSION
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(cors({ origin: true, credentials: true }));
app.use('/', router);
app.get("/healthz", (req, res) => res.json({data: 'rsvp up and running', version: VERSION}));

connect();

export default app;
