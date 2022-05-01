import SubscriptionService from './subscription.service';
import { HTTP_STATUS } from '../../utils/http';
import asyncHandler from '../../middleware/async';
import { errorResponse, successResponse } from '../../utils/response';

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const subscribeFCSC = asyncHandler(async (req, res) => {
  const subscription = await SubscriptionService.subscribeFCSC(req);
  if (!subscription) return errorResponse(res, `Couldn't subscribe to FCSC Notices`, HTTP_STATUS.BAD_REQUEST);
  return successResponse(res, `Subscribed to FCSC successfully`);
});

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const subscribeRSVP = asyncHandler(async (req, res) => {
  const subscription = await SubscriptionService.subscribeRSVP(req);
  if (!subscription) return errorResponse(res, `Couldn't subscribe to RSVP`, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  return successResponse(res, `Subscribed to RSVP successfully`);
});

export default {
  subscribeFCSC,
  subscribeRSVP,
};
