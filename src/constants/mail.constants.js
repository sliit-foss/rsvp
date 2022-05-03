import * as config from '../config';

const CREDENTIALS = {
  HOST: config.MAIL.HOST,
  PORT: config.MAIL.PORT,
  USER: config.MAIL.USER,
  PASSWORD: config.MAIL.PASSWORD,
};

export default {
  CREDENTIALS,
};
