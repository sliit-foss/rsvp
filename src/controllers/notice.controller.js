import NoticeService from '../services/notice.service';
import asyncHandler from '../middleware/async';
import { HTTP_STATUS } from '../utils/http';
import { makeResponse } from '../utils/response';

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
  if (!notice) return makeResponse({ res, success: false, message: 'Error adding notice' });
  return makeResponse({ res, message: `Notice added successfully`, data: notice });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const editNotice = asyncHandler(async (req, res) => {
  const notice = await NoticeService.editNotice(req);
  if (!notice) return makeResponse({ res, success: false, message: `Notice not found with id:${req.params.id}`, status: HTTP_STATUS.BAD_REQUEST });
  return makeResponse({ res, message: `Successfully edited notice with id ${req.params.id}` });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await NoticeService.deleteNotice(req);
  if (!notice) return makeResponse({ res, success: false, message: `Notice not found with id:${req.params.id}`, status: HTTP_STATUS.BAD_REQUEST });
  return makeResponse({ res, message: `Sucessfully deleted notice with id:${req.params.id}` });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getNotices = asyncHandler(async (req, res) => {
  const notices = await NoticeService.getNotices();
  return makeResponse({ res, message: `Data retrieval successful`, data: notices || [] });
});

export default {
  addNotice,
  editNotice,
  deleteNotice,
  getNotices,
};
