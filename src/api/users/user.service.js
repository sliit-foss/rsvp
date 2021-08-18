import User from './user.model';

/**
 * Create user in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const createUser = (req) => {
  if (req.user.role != 'Admin') {
    throw { message: 'You are not authorized to access this endpoint' };
  }
  const { username, email, password, role, faculty } = req.body;
  const user = new User({
    username,
    email,
    role,
    faculty,
  });

  return User.register(user, password);
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const getAllUsers = (req) => {
  if (req.user.role != 'Admin') {
    throw { message: 'You are not authorized to access this endpoint' };
  }
  return User.find().sort({ role: -1 });
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const getMyUserData = (req) => {
  return User.findById(req.user.id);
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const deleteUserById = (req) => {
  if (req.user.role != 'Admin') {
    throw { message: 'You are not authorized to access this endpoint' };
  }
  return User.findByIdAndDelete(req.params.id);
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const changeUserPassword = async (req) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    throw {
      message: 'Please specify a new user password',
    };
  }

  const user = await User.findById(req.user.id);
  const updatedUser = await user.setPassword(newPassword);
  await user.save();
  return updatedUser;
};

export default {
  createUser,
  getAllUsers,
  getMyUserData,
  deleteUserById,
  changeUserPassword,
};
