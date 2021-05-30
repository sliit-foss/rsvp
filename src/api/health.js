import {HTTP_STATUS} from "../utils/http";
import {VERSION} from '../config';

/**
 * Handle Health Request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return body.version Version of API
 */
export const handleHealthRequest = (req, res, next) => {
    res.status(HTTP_STATUS.OK).json({data: 'rsvp up and running', version: VERSION});
};
