import AuthService from './auth.service';
import { HTTP_STATUS } from '../../utils/http';
import passport from 'passport';
import { errorResponse, successResponse } from '../../utils/response';
import asyncHandler from '../../middleware/async';

const userLogin = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', function (err, user) {
    if (err) return errorResponse(res, err, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    if (!user) return errorResponse(res, 'Invalid username or password', HTTP_STATUS.UNAUTHORIZED);
    const tokenObject = AuthService.issueJWT(user);
    return successResponse(res, 'Login successful', {
      message: 'Authentication successful',
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      userRole: user.role,
      faculty: user.faculty
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
