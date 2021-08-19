import MailService from './mail.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';
import ClientConst from './mail.constants';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Email Response
 */

const sendMail = async (req, res, next) => {
  logger.info('mail.controller.js sendMail(): ' + req.body);
  try {
    const { name, email, subject, text } = req.body;
    if (!name) {
      throw {
        message: 'Please specify your name',
      };
    }
    if (!email) {
      throw {
        message: 'Please specify your email',
      };
    }
    if (!subject) {
      throw {
        message: 'Please specify a subject',
      };
    }
    if (!text) {
      throw {
        message: 'Please specify a message body',
      };
    }

    var mailOptions = {
      from: ClientConst.CREDENTIALS.USER,
      to: 'infosliitfoss@gmail.com',
      subject: subject,
      text: `Sender email - ${email}
Sender name - ${name}

Message - ${text}`,
    };

    const result = await MailService.sendMail(mailOptions);
    if (result) {
      logger.info('Message sent');
      return res.status(HTTP_STATUS.OK).json({ success: true });
    } else {
      logger.error('mail.controller.js ExecuteMail()');
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Message could not be sent',
      });
    }
  } catch (err) {
    logger.error('mail.controller.js sendMail(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

const checkAvailability = async (req, res, next) => {
  try {
    const result = await MailService.checkAvailability();
    if (result) {
      return res.status(HTTP_STATUS.OK).json({
        available: true,
        message: 'Server is ready to take your messages',
      });
    } else {
      return res.status(HTTP_STATUS.OK).json({
        available: false,
        message: `Server is not ready`,
      });
    }
  } catch (error) {
    logger.error('mail.controller.js checkAvailability(): ' + error.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      available: false,
      error: `Server is not ready - ${error.message}`,
    });
  }
};

export default {
  sendMail,
  checkAvailability,
};
