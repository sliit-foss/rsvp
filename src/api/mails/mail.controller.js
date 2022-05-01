import MailService from './mail.service';
import ClientConst from './mail.constants';
import asyncHandler from '../../middleware/async';
import { successResponse } from '../../utils/response';

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

  await MailService.sendMail(mailOptions);
  return successResponse(res, 'Message Sent Successfully');
});

const checkAvailability = asyncHandler(async (req, res, next) => {
  await MailService.checkAvailability();
  return successResponse(res, 'Server is ready to take your messages');
});

export default {
  sendMail,
  checkAvailability,
};
