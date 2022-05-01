import EventService from './event.service';
import { HTTP_STATUS } from '../../utils/http';
import { errorResponse, successResponse } from '../../utils/response';
import asyncHandler from '../../middleware/async';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createEvent = asyncHandler(async (req, res) => {
  const event = await EventService.createEvent(req.body, req.user.faculty);
  return successResponse(res, 'Event added successfully', event);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getEventById = asyncHandler(async (req, res) => {
  const event = await EventService.getEventById(req.params.id);
  return successResponse(res, 'Data retrieval successful', event);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await EventService.getAllEvents(
    req.query.perpage,
    req.query.page,
    req.params.club,
  );
  return successResponse(res, 'Data retrieval successful', events || []);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getLatestEvents = asyncHandler(async (req, res) => {
  const events = await EventService.getLatestEvents(req.params.club);
  return successResponse(res, 'Data retrieval successful', events || []);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateEventByID = asyncHandler(async (req, res) => {
  const updatedEvent = await EventService.updateEventByID(
    req.params.id,
    req.body,
    req.user,
  );
  if (!updatedEvent) return errorResponse(res, `Event not found with id:${req.params.id}`, HTTP_STATUS.BAD_REQUEST);
  return successResponse(res, `Sucessfully updated event with id:${req.params.id}`);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteEventById = asyncHandler(async (req, res) => {
  const event = await EventService.deleteEventById(req.params.id, req.user);
  if (!event) return errorResponse(res, `Event not found with id:${req.params.id}`, HTTP_STATUS.BAD_REQUEST);
  return successResponse(res, `Sucessfully deleted event with id:${req.params.id}`);
});

export default {
  createEvent,
  getEventById,
  getAllEvents,
  getLatestEvents,
  updateEventByID,
  deleteEventById,
};
