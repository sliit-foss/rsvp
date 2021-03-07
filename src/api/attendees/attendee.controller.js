import AttendeeService from './attendee.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from "../../utils/logger";

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */

const createAttendee = async (req, res) => {
  logger.info('attendee.controller.js createAttendee(): ' + JSON.parse(req.body));
  try {
    const attendee = await AttendeeService.createAttendee(req.body);
    return res.status(HTTP_STATUS.CREATED).json(attendee);
  } catch (err) {
    logger.error('attendee.controller.js createAttendee(): ' + err.message);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */

const getAttendeeById = async (req, res) => {
  logger.info('attendee.controller.js getAttendeeById(): id: ' + req.params.id);
  try {
    const attendee = await AttendeeService.getAttendeeById(
      req.params.id
    );
    return res.status(HTTP_STATUS.OK).json(attendee);
  } catch (err) {
    logger.error('attendee.controller.js getAttendeeById(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

const getAllAttendees = async (req, res) => {
  logger.info('attendee.controller.js getAllAttendees()');
  try {
    const attendees = await AttendeeService.getAllAttendees(req.query.perpage, req.query.page);
    return res.status(HTTP_STATUS.OK).json(attendees);
  } catch (err) {
    logger.error('attendee.controller.js getAllAttendee(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  createAttendee,
  getAllAttendees,
  getAttendeeById,
};
