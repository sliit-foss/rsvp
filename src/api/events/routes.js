import { Router } from 'express';
import EventController from './event.controller';
import passport from 'passport';

const router = Router();

router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  EventController.createEvent
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  EventController.updateEventByID
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  EventController.deleteEventById
);

export default router;
