import { Router } from 'express';
import NoticeController from './notice.controller';
import passport from 'passport';

const router = Router();

router.get('/', NoticeController.getNotices);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  NoticeController.addNotice
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  NoticeController.editNotice
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  NoticeController.deleteNotice
);

export default router;
