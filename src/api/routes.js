import { Router } from 'express';
import { handleHealthRequest } from './health';
import attendeeRouter from './attendees/routes';
import eventsRouter from './events/routes';
import mailRouter from './mails/routes';
import userRouter from './users/routes';
import authRouter from './auth/routes';

const router = Router();

router.get('/healthz', handleHealthRequest);
router.use('/attendees', attendeeRouter);
router.use('/events', eventsRouter);
router.use('/mail', mailRouter);
router.use('/users', userRouter);
router.use('/', authRouter);

export default router;
