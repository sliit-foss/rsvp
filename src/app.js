import express from "express";
import bodyParser from "body-parser";
import { HealthcheckerSimpleCheck } from "nodejs-health-checker/dist/healthchecker/healthchecker";
//import cors from 'cors';
import { default as connect } from "./utils/database";
import router from "./api/routes";

const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cors({ origin: true, credentials: true }));
app.use("/", router);

app.get("/healthcheck", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

connect();

export default app;
