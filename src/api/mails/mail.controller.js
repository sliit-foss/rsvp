import MailService from './mail.service';
import { HTTP_STATUS } from '../../utils/http';
import ClientConst from './mail.constants';
import asyncHandler from '../../middleware/async';
import { errorResponse, successResponse } from '../../utils/response';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Email Response
 */

const sendMail = asyncHandler(async (req, res, next) => {
  const { name, email, subject, text, receiver } = req.body;
  switch (undefined) {
    case name:
      throw {
        message: 'Please specify your name',
      };
    case email:
      throw {
        message: 'Please specify your email',
      };
    case subject:
      throw {
        message: 'Please specify a subject',
      };
    case text:
      throw {
        message: 'Please specify a message body',
      };
  }
  var mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: receiver,
    subject: subject,
    text: `Sender email - ${email}
Sender name - ${name}

Message - ${text}`,
  };

  try {
    await MailService.sendMail(mailOptions)
    return successResponse(res, 'Message Sent Successfully');
  } catch (err) {
    return errorResponse(res, err, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

});

const checkAvailability = asyncHandler(async (req, res, next) => {
  try {
    await MailService.checkAvailability();
    return successResponse(res, 'Server is ready to take your messages');
  } catch (err) {
    return errorResponse(res, 'Server is not ready to take your messages', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});

export default {
  sendMail,
  checkAvailability,
};
