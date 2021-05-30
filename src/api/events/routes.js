import {Router} from 'express';
import EventController from './event.controller';
import passport from "passport";

const router = Router();

router.get('/:id', EventController.getEventById);
router.post('/', passport.authenticate('jwt', {session: false}), EventController.createEvent);
router.get('/', EventController.getAllEvents);

export default router;
