import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import {default as connect} from './utils/database';
import router from './api/routes';
import {SESSION_SECRET} from "./config";
import User from "./api/auth/user.model";
import LocalStrategy from "passport-local";

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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors({ origin: true, credentials: true }));
app.use('/', router);

connect();

export default app;
