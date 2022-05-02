import { Router } from 'express';
import { handleHealthRequest } from '../controllers/health.controller';
import authRouter from './auth.routes';
import attendeeRouter from './attendees.routes';
import eventsRouter from './event.routes';
import mailRouter from './mail.routes';
import noticeRouter from './notice.routes';
import userRouter from './user.routes';
import subscriptionRouter from './subscription.routes';

const router = Router();

router.get('/healthz', handleHealthRequest);
router.use('/notices', noticeRouter);
router.use('/attendees', attendeeRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/events', eventsRouter);
router.use('/mail', mailRouter);
router.use('/users', userRouter);
router.use('/', authRouter);

export default router;

