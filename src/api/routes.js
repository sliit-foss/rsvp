import { Router } from 'express';
import { handleHealthRequest } from './health';
import attendeeRouter from "./attendees/routes";
import eventsRouter from './events/routes';
import mailRouter  from './mails/routes';
import authRouter from './auth/routes';

const router = Router();

router.get('/health', handleHealthRequest);
router.use("/user", attendeeRouter);
router.use('/events', eventsRouter);
router.use('/mail', mailRouter);
router.use('/', authRouter);

export default router;
