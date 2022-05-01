import { HTTP_STATUS } from "./http";
import { NODE_ENV } from '../config';
import logger from "./logger";

/**
 * @constant ERROR_RESPONSE error messages for error responses
 */
export const ERROR_RESPONSE = {
  UNAUTHORIZED: 'You are not authorized to access this endpoint',
};

export const successResponse = (res, message, data = {}, status = HTTP_STATUS.OK) => {
  return res.status(status).json({ success: true, message, data })
}

export const errorResponse = (res, error, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
  logger.error(error);
  return res.status(status).json({ success: false, error: error.message || error, stack: NODE_ENV !== 'production' ? error.stack : null })
}
