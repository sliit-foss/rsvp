import { Router } from 'express';
import AttendeeController from '../controllers/attendee.controller';
import passport from 'passport';

const router = new Router();

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  AttendeeController.getAttendees
);
router.post('/:id', AttendeeController.attendEvent);

export default router;
