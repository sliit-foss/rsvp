import AttendeeService from './attendee.service';
import { HTTP_STATUS } from '../../utils/http';
import { errorResponse, successResponse } from '../../utils/response';
import asyncHandler from '../../middleware/async';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const attendEvent = asyncHandler(async (req, res) => {
    const event = await AttendeeService.attendEvent(req.params.id, req.body);
    if (!event) return errorResponse(res, `Event not found with id:${req.params.id}`, HTTP_STATUS.BAD_REQUEST);
    return successResponse(res, `Sucessfully registered to event with id:${req.params.id}`);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getAttendees = asyncHandler(async (req, res) => {
    const attendees = await AttendeeService.getAttendees(
      req.params.id,
      req.user
    );
    return successResponse(res, 'Data retrieval successful', attendees || []);
});

export default {
  attendEvent,
  getAttendees,
};
