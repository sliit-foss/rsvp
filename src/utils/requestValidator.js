import { ERROR_RESPONSE } from './errorResponse';

/**
 * @function validateAdminRequest validates whether the request is coming from an Admin
 */
const validateAdminRequest = (req) => {
  if (req.user.role != 'Admin') {
    throw { message: ERROR_RESPONSE.UNAUTHORIZED };
  }
};

/**
 * @function validateRequest validates whether the request is coming from an Admin or from a member of the club to which the event which is requested to be modified belongs to (For RSVP functionalities)
 */
const validateRequest = (event, user, errorMessage) => {
  if (event.createdBy != user.faculty && user.role != 'Admin') {
    throw {
      message: errorMessage,
    };
  }
};

/**
 * @function validateFCSCRequest validates whether the request is coming from an Admin or FCSC member (For FCSC web functionalities)
 */
const validateFCSCRequest = (req) => {
  if (req.user.role != 'Admin' && req.user.faculty != 'FCSC') {
    throw { message: ERROR_RESPONSE.UNAUTHORIZED };
  }
};

export { validateAdminRequest, validateRequest, validateFCSCRequest };
