import UserService from './user.service';
import { HTTP_STATUS } from '../../utils/http';
import { errorResponse, successResponse } from '../../utils/response';
import asyncHandler from '../../middleware/async';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createUser = asyncHandler(async (req, res) => {
  const result = await UserService.createUser(req);
  if (!result.success)
    return errorResponse(res, result.error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  return successResponse(res, 'User added successfully', result.data);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers(req);
  return successResponse(res, 'Data retrieval successful', users);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getMyUserData = asyncHandler(async (req, res) => {
  const user = await UserService.getMyUserData(req);
  return res.status(HTTP_STATUS.OK).json(user);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await UserService.deleteUserById(req);
  if (!user) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: `User not found with id:${req.params.id}` });
  }
  return successResponse(res, `Sucessfully deleted user with id:${req.params.id}`);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const changeUserPassword = asyncHandler(async (req, res) => {
  const user = await UserService.changeUserPassword(req);
  if (!user) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: `User not found with id:${req.user.id}` });
  }
  return successResponse(res, `Your password has been updated successfully`);
});

export default {
  createUser,
  getAllUsers,
  getMyUserData,
  deleteUserById,
  changeUserPassword,
};
