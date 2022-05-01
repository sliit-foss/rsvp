import { HTTP_STATUS } from "./http";
import logger from "./logger";

/**
 * @constant ERROR_RESPONSE error messages for error responses
 */
export const ERROR_RESPONSE = {
  UNAUTHORIZED: 'You are not authorized to access this endpoint',
};

export const successResponse = (res, message, data = {}) => {
  return res.status(HTTP_STATUS.OK).json({ success: true, message, data })
}

export const errorResponse = (res, error, status) => {
  logger.error(error);
  return res.status(status).json({ success: false, error: error.message || error, stack: error.stack })
}
