import nodemailer from 'nodemailer';
import ClientConst from './mail.constants';

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

const sendMail = async (mailOptions) => {
  try {
    return new Promise((resolve) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

const checkAvailability = async () => {
  try {
    return new Promise((resolve) => {
      transport.verify(async function (error) {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

export default {
  sendMail,
  checkAvailability,
};
