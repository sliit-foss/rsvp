import { Router } from 'express';
import EventController from '../controllers/event.controller';
import passport from 'passport';
import { isLogin } from '../middleware/requestValidator';

const router = Router();
// router.get('/allevents/:club', EventController.getAllEvents);
router.get('/latest/:club', EventController.getLatestEvents);
router.get('/:id', EventController.getEventById);
router.get(
  '/allevents/:club',
  (req, res, next) => {
    isLogin(req, res, next)
  },
  EventController.getAllEvents
);
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
