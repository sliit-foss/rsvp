import NoticeService from './notice.service';
import { HTTP_STATUS } from '../../utils/http';
import asyncHandler from '../../middleware/async';
import { errorResponse, successResponse } from '../../utils/response';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addNotice = asyncHandler(async (req, res) => {
  const notice = await NoticeService.addNotice(
    req,
    req.body.title,
    req.body.body,
    req.body.category,
    req.body.photo,
    req.body.createdAt
  );
  if (!notice) return errorResponse(res, 'Error adding notice', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  return successResponse(res, `Notice added successfully`, notice);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const editNotice = asyncHandler(async (req, res) => {
  const notice = await NoticeService.editNotice(req);
  if (!notice) return errorResponse(res, `Notice not found with id:${req.params.id}`, HTTP_STATUS.BAD_REQUEST);
  return successResponse(res, `Successfully edited notice with id ${req.params.id}`);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await NoticeService.deleteNotice(req);
  if (!notice) return errorResponse(res, `Notice not found with id:${req.params.id}`, HTTP_STATUS.BAD_REQUEST);
  return successResponse(res, `Sucessfully deleted notice with id:${req.params.id}`);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getNotices = asyncHandler(async (req, res) => {
  const notices = await NoticeService.getNotices();
  return successResponse(res, `Data retrieval successful`, notices || []);
});

export default {
  addNotice,
  editNotice,
  deleteNotice,
  getNotices,
};
