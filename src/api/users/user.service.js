import User from './user.model';
import MailService from '../mails/mail.service';
import ClientConst from '../mails/mail.constants';
import { validateAdminRequest } from '../../utils/requestValidator';

/**
 * Create user in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const createUser = async (req) => {
  validateAdminRequest(req);
  const { username, email, role, faculty } = req.body;
  const password = Math.random().toString(36).slice(-8);

  const user = new User({
    username,
    email,
    role,
    faculty,
  });

  const createdUser = await User.register(user, password);

  var mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: email,
    subject: 'RSVP Login Access',
    text: `Hi ${username}!

You have been assigned as ${
      role == 'Admin' ? 'an' : 'a'
    } ${role} to the RSVP management panel. Please use the following password to login to the website - ${password} 
You may reset this password by visiting your account info section of the management panel

Regards,
SLIIT FOSS.
    `,
  };

  const result = await MailService.sendMail(mailOptions);
  if (result) {
    return createdUser;
  } else {
    await User.findByIdAndDelete(createdUser._id);
  }
};

/**
 *
 * @param req
 * @returns {Promise<void>}
 */
const getAllUsers = (req) => {
  validateAdminRequest(req);
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
  validateAdminRequest(req);
  if (req.user._id == req.params.id) {
    throw { message: 'You cannot delete your own account' };
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
