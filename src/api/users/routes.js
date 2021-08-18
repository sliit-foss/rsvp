import { Router } from 'express';
import UserController from './user.controller';
import passport from 'passport';

const router = Router();
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.createUser
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.getAllUsers
);
router.get(
    '/myUserData',
    passport.authenticate('jwt', { session: false }),
    UserController.getMyUserData
  );
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  UserController.deleteUserById
);

router.put(
  '/changePassword',
  passport.authenticate('jwt', { session: false }),
  UserController.changeUserPassword
);

export default router;
