import { Router } from 'express';
import SubscriptionController from '../controllers/subscription.controller';

const router = Router();

router.post('/subscribe/fcsc', SubscriptionController.subscribeFCSC);
router.post('/subscribe/rsvp', SubscriptionController.subscribeRSVP);

export default router;
