import { VERSION } from '../config';
import { HTTP_STATUS } from '../utils/http';

/**
 * Handle Health Request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return body.version Version of API
 */
export const handleHealthRequest = (_, res) => {
  res.status(HTTP_STATUS.OK).json({ data: 'rsvp up and running', version: VERSION });
};
