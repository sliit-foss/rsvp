import { Router } from 'express';
import passport from 'passport';
import AttendeeController from '../controllers/attendee.controller';

const router = new Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), AttendeeController.getAttendees);
router.post('/:id', AttendeeController.attendEvent);

export default router;
