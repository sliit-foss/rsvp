import SubscriptionService from './subscription.service';
import { HTTP_STATUS } from '../../utils/http';
import logger from '../../utils/logger';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const subscribeFCSC = async (req, res) => {
  try {
    const subscription = await SubscriptionService.subscribeFCSC(req);
    if (!subscription) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: `Couldn't subscribe to FCSC Notices` });
    }
    return res.status(HTTP_STATUS.OK).json({
      message: `Subscribed to FCSC successfully`,
    });
  } catch (err) {
    logger.error('subscription.controller.js subscribeFCSC(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const subscribeRSVP = async (req, res) => {
  try {
    const subscription = await SubscriptionService.subscribeRSVP(req);
    if (!subscription) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: `Couldn't subscribe to RSVP` });
    }
    return res.status(HTTP_STATUS.OK).json({
      message: `Subscribed to RSVP successfully`,
    });
  } catch (err) {
    logger.error('subscription.controller.js subscribeRSVP(): ' + err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export default {
  subscribeFCSC,
  subscribeRSVP,
};
