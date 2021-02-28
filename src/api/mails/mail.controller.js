import { HTTP_STATUS } from "../../utils/http";
import logger from "../../utils/logger";
import nodemailer from "nodemailer";
import ClientConst from "./mail.constants";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return Email Response
 */

// Initialize SMTP Instance
var transport = nodemailer.createTransport({
  host: ClientConst.CREDENTIALS.HOST,
  port: ClientConst.CREDENTIALS.PORT,
  auth: {
    user: ClientConst.CREDENTIALS.USER,
    pass: ClientConst.CREDENTIALS.PASSWORD,
  },
});

const sendMail = async (req, res, next) => {
  var mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: req.body.recivers,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  };

  logger.info("mail.controller.js sendMail(): " + req.body);

  try {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error("mail.controller.js ExecuteMail(): " + error.message);
        return res
          .status(HTTP_STATUS.OK)
          .json({ success: false, messageid: "", error: error.message });
      } else {
        logger.info("Message sent: ", info.messageId);
        return res
          .status(HTTP_STATUS.OK)
          .json({ success: true, messageid: info.messageId, error: "" });
      }
    });
  } catch (err) {
    logger.error("mail.controller.js sendMail(): " + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

const checkAvailability = async (req, res, next) => {
  try {
    transport.verify(function (error, success) {
      if (error) {
        return res
          .status(HTTP_STATUS.OK)
          .json({ available: false, message: "Server is not ready" });
      } else {
        return res.status(HTTP_STATUS.OK).json({
          available: true,
          message: "Server is ready to take our messages",
        });
      }
    });
  } catch (error) {
    logger.error("mail.controller.js checkAvailability(): " + error.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  sendMail,
  checkAvailability,
};
