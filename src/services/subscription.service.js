import fs from 'fs';
import handlebars from 'handlebars';
import ClientConst from '../constants/mail.constants';
import FCSCSubscription from '../models/subscription.fcsc.model';
import RSVPSubscription from '../models/subscription.rsvp.model';
import MailService from './mail.service';

/**
 * Create fcsc subscription in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const subscribeFCSC = async (req) => {
  const { email } = req.body;
  const subscription = new FCSCSubscription({
    email
  });
  await sendSubscriptionSuccessMail('FCSC', email);
  return subscription.save();
};

/**
 * Create rsvp subscription in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const subscribeRSVP = async (req) => {
  const { email } = req.body;
  const subscription = new RSVPSubscription({
    email
  });
  await sendSubscriptionSuccessMail('RSVP', email);
  return subscription.save();
};

const sendSubscriptionSuccessMail = (entity, email) => {
  const html = fs.readFileSync(`${global.__basedir}/html/emailTemplate.html`, 'utf8');
  const template = handlebars.compile(html);
  const replacements = {
    title: 'SUBSCRIPTION SUCCESSFUL',
    username: '',
    text: `Thank you for subscribing to ${entity}.`,
    boxText: 'Stay tuned for more updates!',
    buttonURL: entity === 'FCSC' ? 'https://fcsc-web.web.app' : 'https://rsvp.sliitfoss.org',
    buttonText: 'Visit Website'
  };
  const htmlToSend = template(replacements);
  const mailOptions = {
    from: ClientConst.CREDENTIALS.USER,
    to: email,
    subject: `${entity} Subscription Successful`,
    html: htmlToSend
  };
  return MailService.sendMail(mailOptions);
};

export default {
  subscribeFCSC,
  subscribeRSVP
};
