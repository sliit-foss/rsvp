import NoticeService from './notice.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addNotice = async (req, res) => {
  try {
    const notice = await NoticeService.addNotice(
      req,
      req.body.title,
      req.body.body,
      req.body.category,
      req.body.photo
    );
    if (!notice) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error adding notice' });
    }
    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: `Notice added successfully` });
  } catch (err) {
    logger.error('notice.controller.js addNotice(): ' + err.message);
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
const editNotice = async (req, res) => {
  try {
    const notice = await NoticeService.editNotice(req);
    if (!notice) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error adding notice' });
    }
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: `Successfully edited notice with id ${req.params.id}` });
  } catch (err) {
    logger.error('notice.controller.js editNotice(): ' + err.message);
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
const deleteNotice = async (req, res) => {
  try {
    const notice = await NoticeService.deleteNotice(req);
    if (!notice) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `Notice not found with id:${req.params.id}` });
    }

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: `Sucessfully deleted notice with id:${req.params.id}` });
  } catch (err) {
    logger.error('notice.controller.js deleteNotice(): ' + err.message);
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
const getNotices = async (req, res) => {
  try {
    const notices = await NoticeService.getNotices();
    return res.status(HTTP_STATUS.OK).json(notices);
  } catch (err) {
    logger.error('notice.controller.js getNotices(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  addNotice,
  editNotice,
  deleteNotice,
  getNotices,
};
