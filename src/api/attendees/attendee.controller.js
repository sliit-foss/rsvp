import AttendeeService from './attendee.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const attendEvent = async (req, res) => {
  logger.info('attendee.controller.js attendEvent(): id: ' + req.params.id);
  try {
    const event = await AttendeeService.attendEvent(req.params.id, req.body);
    if (!event) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `Event not found with id:${req.params.id}` });
    }
    return res.status(HTTP_STATUS.OK).json({
      message: `Sucessfully registered to event with id:${req.params.id}`,
    });
  } catch (err) {
    logger.error('attendee.controller.js attendEvent(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAttendees = async (req, res) => {
  logger.info('attendee.controller.js getAttendees(): id: ' + req.params.id);
  try {
    const attendees = await AttendeeService.getAttendees(req.params.id);
    return res.status(HTTP_STATUS.OK).json(attendees);
  } catch (err) {
    logger.error('attendee.controller.js getAttendees(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  attendEvent,
  getAttendees,
};
