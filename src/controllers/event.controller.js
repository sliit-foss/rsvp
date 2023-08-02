import asyncHandler from '../middleware/async';
import EventService from '../services/event.service';
import { HTTP_STATUS } from '../utils/http';
import { makeResponse } from '../utils/response';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createEvent = asyncHandler(async (req, res) => {
  const event = await EventService.createEvent(req.body, req.user);
  return makeResponse({ res, message: 'Event added successfully', data: event });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getEventById = asyncHandler(async (req, res) => {
  const event = await EventService.getEventById(req.params.id);
  if (!event)
    return makeResponse({
      res,
      success: false,
      message: `Event not found with id:${req.params.id}`,
      status: HTTP_STATUS.BAD_REQUEST
    });
  return makeResponse({ res, message: 'Data retrieval successful', data: event });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await EventService.getAllEvents(req.query.perpage, req.query.page, req.params.club, req.user);
  return makeResponse({ res, message: 'Data retrieval successful', data: events || [] });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getLatestEvents = asyncHandler(async (req, res) => {
  const events = await EventService.getLatestEvents(req.params.club);
  return makeResponse({ res, message: 'Data retrieval successful', data: events || [] });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateEventByID = asyncHandler(async (req, res) => {
  const updatedEvent = await EventService.updateEventByID(req.params.id, req.body, req.user);
  if (!updatedEvent)
    return makeResponse({
      res,
      success: false,
      message: `Event not found with id:${req.params.id}`,
      status: HTTP_STATUS.BAD_REQUEST
    });
  return makeResponse({ res, message: `Sucessfully updated event with id:${req.params.id}` });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteEventById = asyncHandler(async (req, res) => {
  const event = await EventService.deleteEventById(req.params.id, req.user);
  if (!event)
    return makeResponse({
      res,
      success: false,
      message: `Event not found with id:${req.params.id}`,
      status: HTTP_STATUS.BAD_REQUEST
    });
  return makeResponse({ res, message: `Sucessfully deleted event with id:${req.params.id}` });
});

export default {
  createEvent,
  getEventById,
  getAllEvents,
  getLatestEvents,
  updateEventByID,
  deleteEventById
};
