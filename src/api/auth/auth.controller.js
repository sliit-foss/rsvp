import AuthService from './auth.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';
import passport from 'passport';

const adminRegister = async (req, res) => {
  try {
    const admin = await AuthService.createAdmin(req.body);
    return res.status(HTTP_STATUS.CREATED).json(admin);
  } catch (err) {
    logger.error('auth.controller.js createAdmin(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

const adminLogin = async (req, res, next) => {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: err.message,
      });
    }
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: 'Invalid username or password',
      });
    }
    const tokenObject = AuthService.issueJWT(user);
    return res.status(HTTP_STATUS.OK).json({
      message: 'Authentication successful',
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  })(req, res, next);
};

const adminLogout = async (req) => {
  req.logout();
};

export default {
  adminRegister,
  adminLogin,
  adminLogout,
};
