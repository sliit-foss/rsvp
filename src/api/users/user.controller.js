import UserService from './user.service';
import { HTTP_STATUS } from '../../utils/http';
import { makeResponse } from '../../utils/response';
import asyncHandler from '../../middleware/async';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createUser = asyncHandler(async (req, res) => {
  const result = await UserService.createUser(req);
  if (!result.success) return makeResponse({ res, success: false, message: result.error });
  return makeResponse({ res, message: 'User added successfully', data: result.data });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers(req);
  return makeResponse({ res, message: 'Data retrieval successful', data: users || [] });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getMyUserData = asyncHandler(async (req, res) => {
  const user = await UserService.getMyUserData(req);
  return makeResponse({ res, message: 'Data retrieval successful', data: user });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await UserService.deleteUserById(req);
  if (!user) makeResponse({ res, success: false, message: `User not found with id:${req.params.id}`, status: HTTP_STATUS.BAD_REQUEST });
  return makeResponse({ res, message: `Sucessfully deleted user with id:${req.params.id}` });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const changeUserPassword = asyncHandler(async (req, res) => {
  const user = await UserService.changeUserPassword(req);
  if (!user) return makeResponse({ res, success: false, message: `User not found with id:${req.user.id}`, status: HTTP_STATUS.BAD_REQUEST });
  return makeResponse({ res, message: `Your password has been updated successfully` });
});

export default {
  createUser,
  getAllUsers,
  getMyUserData,
  deleteUserById,
  changeUserPassword,
};
