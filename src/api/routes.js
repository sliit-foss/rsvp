import { Router } from 'express';
import eventsRouter from './events/routes';
import authRouter from './auth/routes';
import { handleHealthRequest } from './health';

const router = Router();

router.get('/health', handleHealthRequest);
router.use('/events', eventsRouter);
router.use('/', authRouter);

export default router;