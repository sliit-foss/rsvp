import SubscriptionService from './subscription.service';
import { HTTP_STATUS } from '../../utils/http';
import asyncHandler from '../../middleware/async';
import { makeResponse } from '../../utils/response';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const subscribeFCSC = asyncHandler(async (req, res) => {
  const subscription = await SubscriptionService.subscribeFCSC(req);
  if (!subscription) return makeResponse({ res, success: false, message: `Couldn't subscribe to FCSC Notices`, status: HTTP_STATUS.BAD_REQUEST });
  return makeResponse({ res, message: `Subscribed to FCSC successfully` });
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const subscribeRSVP = asyncHandler(async (req, res) => {
  const subscription = await SubscriptionService.subscribeRSVP(req);
  if (!subscription) return makeResponse({ res, success: false, message: `Couldn't subscribe to RSVP` });
  return makeResponse({ res, message: `Subscribed to RSVP successfully` });
});

export default {
  subscribeFCSC,
  subscribeRSVP,
};
