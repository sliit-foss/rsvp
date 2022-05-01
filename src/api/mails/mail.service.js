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
  service: 'gmail',
  host: ClientConst.CREDENTIALS.HOST,
  auth: {
    user: ClientConst.CREDENTIALS.USER,
    pass: ClientConst.CREDENTIALS.PASSWORD,
  },
});

const sendMail = async (mailOptions) => {
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) reject(error);
        resolve(true);
      });
    });
};

const checkAvailability = async () => {
    return new Promise((resolve) => {
      transport.verify(async function (error) {
        if (error) reject(error)
        resolve(true);
      });
    });
};

export default {
  sendMail,
  checkAvailability,
};
