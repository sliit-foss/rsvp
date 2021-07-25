import EventService from './event.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createEvent = async (req, res) => {
  logger.info('event.controller.js createEvent()');
  try {
    const event = await EventService.createEvent(req.body, req.user.id);
    return res.status(HTTP_STATUS.CREATED).json(event);
  } catch (err) {
    logger.error('event.controller.js createEvent(): ' + err.message);
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
const getEventById = async (req, res) => {
  logger.info('event.controller.js getEventById(): id: ' + req.params.id);
  try {
    const event = await EventService.getEventById(req.params.id);
    return res.status(HTTP_STATUS.OK).json(event);
  } catch (err) {
    logger.error('event.controller.js getEventById(): ' + err.message);
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
const getAllEvents = async (req, res) => {
  logger.info('event.controller.js getAllEvents()');
  try {
    const events = await EventService.getAllEvents(
      req.query.perpage,
      req.query.page
    );
    return res.status(HTTP_STATUS.OK).json(events);
  } catch (err) {
    logger.error('event.controller.js getAllEvents(): ' + err.message);
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
const updateEventByID = async (req, res) => {
  logger.info('event.controller.js updateEventByID(): id: ' + req.params.id);
  try {
    const updatedEvent = await EventService.updateEventByID(
      req.params.id,
      req.body
    );
    if (!updatedEvent) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `Event not found with id:${req.params.id}` });
    }
    return res.status(HTTP_STATUS.OK).json(updatedEvent);
  } catch (err) {
    logger.error('event.controller.js updateEventByID(): ' + err.message);
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
const deleteEventById = async (req, res) => {
  logger.info('event.controller.js deleteEventById(): id: ' + req.params.id);
  try {
    const event = await EventService.deleteEventById(req.params.id);
    if (!event) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `Event not found with id:${req.params.id}` });
    }
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: `Sucessfully deleted event with id:${req.params.id}` });
  } catch (err) {
    logger.error('event.controller.js deleteEventById(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  createEvent,
  getEventById,
  getAllEvents,
  updateEventByID,
  deleteEventById,
};
