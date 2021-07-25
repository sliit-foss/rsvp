import admin from "firebase-admin";
import { SERVICE_ACCOUNT, STORAGE_BUCKET } from "../config";
import logger from "../utils/logger";

const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT),
    storageBucket: STORAGE_BUCKET
  });
  logger.info(`Initialized firebase for project ${SERVICE_ACCOUNT.project_id}`);
};

export default initialize;
