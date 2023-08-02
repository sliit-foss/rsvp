import ClientConst from '../constants/mail.constants';
import asyncHandler from '../middleware/async';
import MailService from '../services/mail.service';
import { makeResponse } from '../utils/response';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Email Response
 */

const sendMail = asyncHandler(async (req, res) => {
  const { name, email, subject, text, receiver } = req.body;
  const mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: receiver,
    subject: subject,
    text: `Sender email - ${email}
Sender name - ${name}

Message - ${text}`
  };

  await MailService.sendMail(mailOptions);
  return makeResponse({ res, message: 'Message Sent Successfully' });
});

const checkAvailability = asyncHandler(async (req, res) => {
  await MailService.checkAvailability();
  return makeResponse({ res, message: 'Server is ready to take your messages' });
});

export default {
  sendMail,
  checkAvailability
};
