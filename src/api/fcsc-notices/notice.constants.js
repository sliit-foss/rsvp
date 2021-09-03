import { ERROR_RESPONSE } from '../../utils/errorResponse';

/**
 * @function validateRequest validates whether the request is coming from an Admin or FCSC member
 */
const validateRequest = (req) => {
  if (req.user.role != 'Admin' && req.user.faculty != 'FCSC') {
    throw { message: ERROR_RESPONSE.UNAUTHORIZED };
  }
};

export { validateRequest };
