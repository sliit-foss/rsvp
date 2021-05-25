import { Router } from 'express';
import EventController from './event.controller';
const router = Router();

router.get('/:id', EventController.getEventById);
router.post('/', EventController.createEvent);
router.get('/', EventController.getAllEvents);

export default router;