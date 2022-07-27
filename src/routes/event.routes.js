import { Router } from 'express';
import EventController from '../controllers/event.controller';
import passport from 'passport';

const router = Router();

router.get('/admineventlist/:club', EventController.getAdminEventList);
router.get('/allevents/:club', EventController.getAllEvents);
router.get('/latest/:club', EventController.getLatestEvents);
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
