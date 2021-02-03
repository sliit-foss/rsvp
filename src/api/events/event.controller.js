import EventService from './event.service';
import {HTTP_STATUS} from "../../utils/http";
import logger from "../../utils/logger";

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createEvent = async (req, res) => {
    logger.info('event.controller.js createEvent(): ' + JSON.parse(req.body));
    try {
        const event = await EventService.createEvent(req.body);
        return res.status(HTTP_STATUS.CREATED).json(event);
    } catch (err) {
        logger.error('event.controller.js createEvent(): ' + err.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: err.message
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
            error: err.message
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
   try {
        const events = await EventService.getAllEvents(req.query.perpage, req.query.page);
        return res.status(HTTP_STATUS.OK).json(events);
   } catch (err) {
       return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
           error: err.message
       });
   }
};

export default {
    createEvent,
    getEventById,
    getAllEvents
};
