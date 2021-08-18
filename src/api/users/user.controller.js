import UserService from './user.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req);
    return res.status(HTTP_STATUS.CREATED).json(user);
  } catch (err) {
    logger.error('user.controller.js createUser(): ' + err.message);
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
const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers(req);
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (err) {
    logger.error('user.controller.js getAllUsers(): ' + err.message);
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
const getMyUserData = async (req, res) => {
  try {
    const user = await UserService.getMyUserData(req);
    return res.status(HTTP_STATUS.OK).json(user);
  } catch (err) {
    logger.error('user.controller.js getMyUserData(): ' + err.message);
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
const deleteUserById = async (req, res) => {
  try {
    const user = await UserService.deleteUserById(req);
    if (!user) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `User not found with id:${req.params.id}` });
    }

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: `Sucessfully deleted user with id:${req.params.id}` });
  } catch (err) {
    logger.error('user.controller.js deleteUserById(): ' + err.message);
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
const changeUserPassword = async (req, res) => {
  try {
    const user = await UserService.changeUserPassword(req);
    if (!user) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: `User not found with id:${req.user.id}` });
    }
    return res.status(HTTP_STATUS.OK).json({
      message: `Your password has been updated successfully`,
    });
  } catch (err) {
    logger.error('user.controller.js changeUserPassword(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  createUser,
  getAllUsers,
  getMyUserData,
  deleteUserById,
  changeUserPassword,
};
