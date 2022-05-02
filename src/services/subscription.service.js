import FCSCSubscription from '../models/subscription.fcsc.model';
import RSVPSubscription from '../models/subscription.rsvp.model';

/**
 * Create fcsc subscription in db
 * @param req
 * @returns {Promise<Document<any>>}
 */

const subscribeFCSC = async (req) => {
  const { email } = req.body;
  const subscription = new FCSCSubscription({
    email,
  });
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
    email,
  });
  return subscription.save();
};

export default {
  subscribeFCSC,
  subscribeRSVP,
};
