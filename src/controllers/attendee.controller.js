import asyncHandler from '../middleware/async';
import AttendeeService from '../services/attendee.service';
import { HTTP_STATUS } from '../utils/http';
import { makeResponse } from '../utils/response';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const attendEvent = asyncHandler(async (req, res) => {
  const event = await AttendeeService.attendEvent(req.params.id, req.body);
  if (!event)
    return makeResponse({
      res,
      success: false,
      message: `Event not found with id:${req.params.id}`,
      status: HTTP_STATUS.BAD_REQUEST
    });
  return makeResponse({ res, message: `Sucessfully registered to event with id:${req.params.id}` });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAttendees = asyncHandler(async (req, res) => {
  const attendees = await AttendeeService.getAttendees(req.params.id, req.user);
  return makeResponse({ res, message: 'Data retrieval successful', data: attendees || [] });
});

export default {
  attendEvent,
  getAttendees
};
