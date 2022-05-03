import fs from 'fs';
import User from '../models/user.model';
import MailService from './mail.service';
import ClientConst from '../constants/mail.constants';
import { validateAdminRequest } from '../middleware/requestValidator';
import handlebars from 'handlebars';

/**
 * Create user in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const createUser = async (req) => {
  // validateAdminRequest(req);
  const { username, email, role, faculty } = req.body;
  const password = Math.random().toString(36).slice(-8);

  const user = new User({
    username,
    email,
    role,
    faculty,
  });

  const createdUser = await User.register(user, password);

  const html = fs.readFileSync(__basedir + '/html/emailTemplate.html', 'utf8');

  var template = handlebars.compile(html);
  var replacements = {
    title: 'WELCOME',
    username: username,
    text: `You have been assigned as ${
      role == 'Admin' ? 'an ' : 'a '
    } ${role} to the RSVP management panel. Please use the following password to login to the website. 
    You may reset this password by visiting your account info section of the management panel`,
    boxText: password,
    buttonURL: 'https://rsvp.sliitfoss.org/login',
    buttonText: 'Login',
  };
  var htmlToSend = template(replacements);

  const mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: email,
    subject: 'RSVP Login Access',
    html: htmlToSend,
  };
  try {
    await MailService.sendMail(mailOptions);
    return {
      success: true,
      data: createdUser,
    };
  } catch (err) {
    await User.findByIdAndDelete(createdUser._id);
    return {
      success: false,
      error: err,
    };
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
