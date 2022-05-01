import MailService from './mail.service';
import ClientConst from './mail.constants';
import asyncHandler from '../../middleware/async';
import { makeResponse } from '../../utils/response';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Email Response
 */

const sendMail = asyncHandler(async (req, res, next) => {
  const { name, email, subject, text, receiver } = req.body;
  var mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: receiver,
    subject: subject,
    text: `Sender email - ${email}
Sender name - ${name}

Message - ${text}`,
  };

  await MailService.sendMail(mailOptions);
  return makeResponse({ res, message: 'Message Sent Successfully' });
});

const checkAvailability = asyncHandler(async (req, res, next) => {
  await MailService.checkAvailability();
  return makeResponse({ res, message: 'Server is ready to take your messages' });
});

export default {
  sendMail,
  checkAvailability,
};
