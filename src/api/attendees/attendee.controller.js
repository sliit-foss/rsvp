import AttendeeService from "./attendee.service";
import { HTTP_STATUS } from "../../utils/http";

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */

const createAttendee = async (req, res) => {
  try {
    const attendee = await AttendeeService.createAttendee(req.body);
    return res.status(HTTP_STATUS.CREATED).json(attendee);
  } catch (err) {
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
  try {
    const attendee = await AttendeeService.getAttendeeById.getAttendeeById(
      req.params.id
    );
    return res.status(HTTP_STATUS.OK).json(attendee);
  } catch (err) {
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
  try {
    const attendees = AttendeeService.getAllAttendees();
    return res.status(HTTP_STATUS.OK).json({"fname":attendees[0]});
  } catch (err) {
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
