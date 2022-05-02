import passport from 'passport';
import AuthService from '../services/auth.service';
import { HTTP_STATUS } from '../utils/http';
import { makeResponse } from '../utils/response';
import asyncHandler from '../middleware/async';

const userLogin = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return makeResponse({ res, success: false, message: err });
    if (!user) return makeResponse({ res, success: false, message: 'Invalid username or password', status: HTTP_STATUS.UNAUTHORIZED });
    const tokenObject = AuthService.issueJWT(user);
    return makeResponse({
      res, message: 'Login successful', data: {
        message: 'Authentication successful',
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        userRole: user.role,
        faculty: user.faculty
      }
    });
  })(req, res, next);
});

const userLogout = async (req) => {
  req.logout();
};

export default {
  userLogin,
  userLogout,
};
