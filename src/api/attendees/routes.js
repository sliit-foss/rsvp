import { Router } from 'express';
import AttendeeController from './attendee.controller';
const router = new Router();

router.get('/:id', AttendeeController.getAttendeeById);
router.get('/', AttendeeController.getAllAttendees);
router.post('/', AttendeeController.createAttendee);

export default router;
